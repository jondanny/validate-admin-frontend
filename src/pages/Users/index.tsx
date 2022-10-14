import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable/index';
import Title from '../../components/Title/index';
import { styled } from '@mui/material/styles';
import CreateUserModal from './CreateUserModal';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { getUsers, createUser, deleteUser, getTicketProviders, updateUser } from '../../services/app/users-services';
import { columns } from './table-columns';
import ConfirmationModal from '../../components/ConfirmationModal/index';
import { debounce } from 'lodash';

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

export interface DashboardProps {}
interface CreateTicketProviderProps {
  name: string;
  email: string;
  phoneNumber: string;
  ticketProviderId: number;
}

interface CreateUserProps {
  name: string;
  email: string;
  phoneNumber: string;
  ticketProviderId: number;
  status: 'creating' | 'active' | '';
}

const Users: FC<DashboardProps> = () => {
  const [openTicketProviderModal, setOpenTicketProviderModal] = useState<boolean>(false);
  const [users, setUsers] = useState({
    data: [],
    cursor: {
      afterCursor: '',
      beforeCursor: '',
    },
  });
  const [currentCursor, setCurrentCursor] = useState({
    name: '',
    value: '',
  });
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [tableSize, setTableSize] = useState({
    default: 10,
    list: [5, 10, 25],
  });
  const [searchText, setSearchText] = useState('');
  const [ticketProviders, setTicketProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    ticketProviderId: 0,
    status: '',
  });
  const [userIdForUpdation, setUserIdForUpdation] = useState('');
  const [shouldUpdateUser, setShouldUpdateUser] = useState(false);
  const [userStatus, setUserStatus] = useState({
    default: '',
    list: ['Creating', 'Active'],
  });
  const [ticketProvideFilterValue, setTicketProviderFilterValue] = useState('');
  const [userValues, setUserValues] = useState<CreateUserProps>({
    name: '',
    email: '',
    phoneNumber: '',
    ticketProviderId: 0,
    status: '',
  });

  const getUsersQuery = useQuery(
    ['users', tableSize.default, currentCursor.value, searchText, ticketProvideFilterValue],
    () =>
      getUsers({
        limit: tableSize.default,
        afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
        beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '',
        searchText: searchText,
        ticketProviderId: ticketProvideFilterValue,
      }),
    {
      onSuccess: (data) => {
        setUsers(data);
      },
      refetchOnWindowFocus: true,
    },
  );

  useQuery(['ticket_providers'], () => getTicketProviders(), {
    onSuccess: (data) => {
      let ticketProviders = [...data];
      ticketProviders.unshift({
        name: 'All',
        id: 0,
      });
      setTicketProviders(ticketProviders as any);
      setSelectedProviderId({
        ...selectedProviderId,
        ticketProviderId: parseInt(data[0].id),
      });
    },
    refetchOnWindowFocus: true,
  });

  const createMutation = useMutation((data: CreateUserProps) => createUser(data), {
    onSuccess: (data) => {
      getUsersQuery.refetch();
      closeModal();
    },
    onError: (err) => {
      const { response }: any = err || {};
      const { data } = response || {};
      const { message } = data || {};
      toast.error(`${message[0]}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
  });

  const deleteMutation = useMutation((data: string) => deleteUser(data), {
    onSuccess: (data) => {
      getUsersQuery.refetch();
    },
  });

  const updateMutation = useMutation(
    (data: CreateTicketProviderProps) =>
      updateUser({ ...selectedProviderId, status: userStatus?.default }, userIdForUpdation),
    {
      onSuccess: (data) => {
        getUsersQuery.refetch();
        closeModal();
      },
      onError: (err) => {
        const { response }: any = err || {};
        const { data } = response || {};
        const { message } = data || {};
        toast.error(`${message[0]}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      },
    },
  );

  const openModal = () => {
    setOpenTicketProviderModal(true);
  };

  const closeModal = () => {
    setOpenTicketProviderModal(false);
    setSelectedProviderId({
      name: '',
      email: '',
      phoneNumber: '',
      ticketProviderId: 0,
      status: '',
    });
    setShouldUpdateUser(false);
  };

  const createUserFormValuesHandler = (field: string, value: string | number, update?: boolean) => {
    setUserValues((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const createUserHandler = () => {
    if (
      userValues.name === '' ||
      userValues.email === '' ||
      userValues.phoneNumber === '' ||
      userValues.ticketProviderId === 0 ||
      userValues.status === ''
    ) {
      toast.error('Please Fill all the fields', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    createMutation.mutate(userValues);
  };

  const openConfirmationModalHandler = (id: string) => {
    setOpenConfirmationModal(true);
    setDeleteUserId(id);
  };

  const closeConfirmationModalHandler = () => {
    setOpenConfirmationModal(false);
    setDeleteUserId('');
  };

  const deleteTicketProviderHandler = () => {
    if (deleteUserId !== '') {
      deleteMutation.mutate(deleteUserId);
      setOpenConfirmationModal(false);
    } else {
      toast.error('No ticket Provider is selected', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const searchHandler = debounce((value: string) => {
    setSearchText(value);
    getUsersQuery.refetch();
  }, 1000);

  const pageSizeHandler = (pageSize: number) => {
    setTableSize({
      ...tableSize,
      default: pageSize,
    });
    getUsersQuery.refetch();
  };

  const changePageHandler = (changePage: string) => {
    const { cursor } = users || {};
    const { afterCursor, beforeCursor } = cursor || {};
    if (changePage === 'go_back' && beforeCursor !== '') {
      setCurrentCursor({
        name: 'previous',
        value: beforeCursor,
      });
    } else {
      if (afterCursor !== '') {
        setCurrentCursor({
          name: 'next',
          value: afterCursor,
        });
      }
    }
    getUsersQuery.refetch();
  };

  const editUserHandler = (userId: string) => {
    const user: any = users?.data?.find(({ id }: any) => id === userId);

    setSelectedProviderId({
      ...selectedProviderId,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      ticketProviderId: user.ticketProviderId,
    });
    setUserStatus({
      ...userStatus,
      default: user?.status,
    });
    setUserIdForUpdation(userId);
    setShouldUpdateUser(true);
    setOpenTicketProviderModal(true);
  };
  const tickProviderHandler = (ticketProviderId: string) => {
    setTicketProviderFilterValue(`${ticketProviderId}`);
  };
  return (
    <>
      <PageContent>
        <Title title="Users" />
      </PageContent>
      <DataTable
        data={users?.data?.length ? users : []}
        deleteHandler={(id: string) => openConfirmationModalHandler(id)}
        editRecordHandler={editUserHandler}
        columns={columns}
        createClickHandler={openModal}
        buttonText="Create"
        searchHandler={(value) => searchHandler(value)}
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        tableSize={tableSize}
        changePageHandler={changePageHandler}
        updateAble={true}
        tickProviderHandler={tickProviderHandler}
        ticketProviders={ticketProviders}
        ticketProvideFilterValue={ticketProvideFilterValue}
      />
      <CreateUserModal
        title="Create User"
        selectedProviderId={selectedProviderId}
        openModal={openTicketProviderModal}
        closeModal={closeModal}
        submitForm={createUserHandler}
        updateUser={() => updateMutation.mutate(selectedProviderId)}
        ticketProviders={ticketProviders}
        inputValueHandler={createUserFormValuesHandler}
        userObject={selectedProviderId}
        shouldUpdateUser={shouldUpdateUser}
        userStatus={userStatus}
      />
      <ConfirmationModal
        title="Create Ticket Provider"
        text="Are you sure, You want to delete User"
        openModal={openConfirmationModal}
        closeModal={closeConfirmationModalHandler}
        submitForm={deleteTicketProviderHandler}
      />
      <ToastContainer />
    </>
  );
};

export default Users;