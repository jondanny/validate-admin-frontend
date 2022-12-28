import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';
import DataTable from '../../components/DataTable/index';
import Title from '../../components/Title/index';
import CreateUserModal from './CreateUserModal';
import { getUsers, createUser, deleteUser, getTicketProviders, updateUser } from '../../services/app/users-services';
import { columns } from './table-columns';
import ConfirmationModal from '../../components/ConfirmationModal/index';
import { createUserInterface } from '../../services/app/users-services';
import { errorHandler } from '../../utils/network/error-handler';

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

const Users: React.FC<DashboardProps> = () => {
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
  const [userValues, setUserValues] = useState<createUserInterface>({
    name: '',
    email: '',
    photoUrl: '',
    phoneNumber: '',
    ticketProviderId: 0,
    status: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const getUsersQuery = useQuery(
    [location.pathname.split('/').includes('validate-backend') ? 'user' : 'users', tableSize.default, currentCursor.value, searchText, ticketProvideFilterValue],
    () =>
      getUsers({
        limit: tableSize.default,
        afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
        beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '',
        searchText: searchText,
        ticketProviderId: ticketProvideFilterValue,
        location
      }),
    {
      onSuccess: (data) => {
        setUsers(data);
      },
      onError: (err: AxiosError) => errorHandler(err, navigate),
      refetchOnWindowFocus: true,
    },
  );

  useQuery(['ticket_providers'], () => getTicketProviders(location), {
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
    onError: (err: AxiosError) => errorHandler(err, navigate),
    refetchOnWindowFocus: true,
  });

  const createMutation = useMutation((data: createUserInterface) => createUser(data, location), {
    onSuccess: (data) => {
      getUsersQuery.refetch();
      toast.success('User is created', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      closeModal();
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
  });

  const deleteMutation = useMutation((data: string) => deleteUser(data, location), {
    onSuccess: (data) => {
      getUsersQuery.refetch();
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
  });

  const updateMutation = useMutation(
    (data: CreateTicketProviderProps) =>
      updateUser({ ...selectedProviderId, photoUrl: '', status: '' }, userIdForUpdation, location),
    {
      onSuccess: (data) => {
        getUsersQuery.refetch();
        toast.success('User info is updated', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        closeModal();
      },
      onError: (err: AxiosError) => errorHandler(err, navigate),
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
      toast.success('User is deleted', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
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
