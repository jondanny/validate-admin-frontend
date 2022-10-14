import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable/index';
import Title from '../../components/Title/index';
import { styled } from '@mui/material/styles';
import CreateTicketProviderModal from './CreateTicketProviderModal';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from 'react-query';
import {
  createTicketProviderService,
  deleteTicketProvider,
  getTicketProviders,
} from '../../services/app/ticket-provider-service';
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
}

const TicketProvider: FC<DashboardProps> = () => {
  const [openTicketProviderModal, setOpenTicketProviderModal] = useState<boolean>(false);
  const [ticketProviderValues, setTicketProviderValues] = useState<CreateTicketProviderProps>({
    name: '',
    email: '',
  });
  const [ticketProviders, setTickerProviders] = useState({
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
  const [deleteTicketProviderId, setDeleteTicketProviderId] = useState('');
  const [tableSize, setTableSize] = useState({
    default: 10,
    list: [5, 10, 25],
  });
  const [searchText, setSearchText] = useState('');

  const query = useQuery(
    ['ticket_providers', tableSize.default, currentCursor.value, searchText],
    () =>
      getTicketProviders({
        limit: tableSize.default,
        afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
        beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '',
        searchText: searchText,
      }),
    {
      onSuccess: (data) => {
        setTickerProviders(data);
      },
      refetchOnWindowFocus: true,
    },
  );
  const createMutation = useMutation((data: CreateTicketProviderProps) => createTicketProviderService(data), {
    onSuccess: (data) => {
      query.refetch();
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

  const deleteMutation = useMutation((data: string) => deleteTicketProvider(data), {
    onSuccess: (data) => {
      query.refetch();
    },
  });

  const openModal = () => {
    setOpenTicketProviderModal(true);
  };

  const closeModal = () => {
    setOpenTicketProviderModal(false);
  };

  const createTicketProviderFormValuesHandler = (field: string, value: string) => {
    if (field === 'name') {
      setTicketProviderValues({
        ...ticketProviderValues,
        name: value,
      });
    } else {
      setTicketProviderValues({
        ...ticketProviderValues,
        email: value,
      });
    }
  };

  const createTicketProvider = () => {
    if (ticketProviderValues['name'] === '' || ticketProviderValues['email'] === '') {
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
    createMutation.mutate(ticketProviderValues);
  };

  const openConfirmationModalHandler = (id: string) => {
    setOpenConfirmationModal(true);
    setDeleteTicketProviderId(id);
  };

  const closeConfirmationModalHandler = () => {
    setOpenConfirmationModal(false);
    setDeleteTicketProviderId('');
  };

  const deleteTicketProviderHandler = () => {
    if (deleteTicketProviderId !== '') {
      deleteMutation.mutate(deleteTicketProviderId);
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
    query.refetch();
  }, 1000);

  const pageSizeHandler = (pageSize: number) => {
    setTableSize({
      ...tableSize,
      default: pageSize,
    });
    query.refetch();
  };

  const changePageHandler = (changePage: string) => {
    const { cursor } = ticketProviders || {};
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
    query.refetch();
  };

  return (
    <>
      <PageContent>
        <Title title="Ticket Provider" />
      </PageContent>
      <DataTable
        data={ticketProviders?.data.length ? ticketProviders : []}
        deleteHandler={(id: string) => openConfirmationModalHandler(id)}
        columns={columns}
        createClickHandler={openModal}
        buttonText="Create"
        searchHandler={(value) => searchHandler(value)}
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        tableSize={tableSize}
        changePageHandler={changePageHandler}
      />
      <CreateTicketProviderModal
        title="Create Ticket Provider"
        openModal={openTicketProviderModal}
        closeModal={closeModal}
        submitForm={createTicketProvider}
        inputValueHandler={(field: string, value: string) => createTicketProviderFormValuesHandler(field, value)}
      />
      <ConfirmationModal
        title="Create Ticket Provider"
        text="Are you sure, You want to delete ticket provider"
        openModal={openConfirmationModal}
        closeModal={closeConfirmationModalHandler}
        submitForm={deleteTicketProviderHandler}
      />
      <ToastContainer />
    </>
  );
};

export default TicketProvider;
