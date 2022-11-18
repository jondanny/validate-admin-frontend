import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { styled } from '@mui/material/styles';
import DataTable from '../../components/DataTable/index';
import Title from '../../components/Title/index';
import CreateTicketProviderApiTokenModal from './CreateTicketProviderApiTokenModal';
import { ToastContainer, toast } from 'react-toastify';
import {
  getTicketProviderApiToken,
  createTicketProviderApiToken,
  deleteTicketProviderApiToken,
  createTicketProviderInterface,
} from '../../services/app/ticket-provider-api-token-service';
import { getTicketProviders } from '../../services/app/users-services';
import { columns } from './table-columns';
import ConfirmationModal from '../../components/ConfirmationModal/index';
import { errorHandler } from '../../utils/network/error-handler';

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

const TicketProviderApiToken: React.FC = () => {
  const [openTicketProviderApiTokenModal, setOpenTicketProviderApiTokenModal] = useState<boolean>(false);
  const [ticketProviderApiTokenValues, setTicketProviderApiTokenValues] = useState<createTicketProviderInterface>({
    token: '',
    ticketProviderId: 0,
  });
  const [ticketProviderApiToken, setTicketProviderApiToken] = useState({
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
  const [deleteTicketProviderApiTokenId, setDeleteTicketProviderApiTokenId] = useState('');
  const [ticketProviders, setTicketProviders] = useState([]);
  const [ticketProvideFilterValue, setTicketProviderFilterValue] = useState('');
  const [tableSize, setTableSize] = useState({
    default: 10,
    list: [5, 10, 25],
  });

  const navigate = useNavigate();

  const query = useQuery(
    ['ticket_providers', tableSize.default, currentCursor.value, ticketProvideFilterValue],
    () =>
      getTicketProviderApiToken({
        limit: tableSize.default,
        afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
        beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '',
        ticketProviderId: ticketProvideFilterValue,
      }),
    {
      onSuccess: (data) => {
        setTicketProviderApiToken(data);
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
    },
    refetchOnWindowFocus: true,
  });

  const createMutation = useMutation((data: createTicketProviderInterface) => createTicketProviderApiToken(data), {
    onSuccess: (data) => {
      query.refetch();
      toast.success('Ticket provider api token is created', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTicketProviderApiTokenValues({
        token: '',
        ticketProviderId: 0,
      });
      closeModal();
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
  });

  const deleteMutation = useMutation((data: string) => deleteTicketProviderApiToken(data), {
    onSuccess: (data) => {
      query.refetch();
      toast.success('Ticket provider api token deleted', {
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
    onError: (err: AxiosError) => errorHandler(err, navigate),
  });

  const openModal = () => {
    setOpenTicketProviderApiTokenModal(true);
  };

  const closeModal = () => {
    setOpenTicketProviderApiTokenModal(false);
  };

  const createTicketProviderApiTokenFormValuesHandler = (field: string, value: any) => {
    if (field === 'token') {
      setTicketProviderApiTokenValues({
        ...ticketProviderApiTokenValues,
        token: value,
      });
    } else {
      setTicketProviderApiTokenValues({
        ...ticketProviderApiTokenValues,
        ticketProviderId: value,
      });
    }
  };

  const createTicketProvider = () => {
    if (ticketProviderApiTokenValues['token'] === '' || ticketProviderApiTokenValues['ticketProviderId'] === 0) {
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
    createMutation.mutate(ticketProviderApiTokenValues);
  };

  const openConfirmationModalHandler = (id: string) => {
    setOpenConfirmationModal(true);
    setDeleteTicketProviderApiTokenId(id);
  };

  const closeConfirmationModalHandler = () => {
    setOpenConfirmationModal(false);
    setDeleteTicketProviderApiTokenId('');
  };

  const deleteTicketProviderHandler = () => {
    if (deleteTicketProviderApiTokenId !== '') {
      deleteMutation.mutate(deleteTicketProviderApiTokenId);
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

  const pageSizeHandler = (pageSize: number) => {
    setTableSize({
      ...tableSize,
      default: pageSize,
    });
    query.refetch();
  };

  const changePageHandler = (changePage: string) => {
    const { cursor } = ticketProviderApiToken || {};
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

  const ticketProviderChangeHandler = (ticketProviderId: string) => {
    setTicketProviderFilterValue(`${ticketProviderId}`);
  };

  return (
    <>
      <PageContent>
        <Title title="Ticket Provider Api Token" />
      </PageContent>
      <DataTable
        data={ticketProviderApiToken?.data.length ? ticketProviderApiToken : []}
        deleteHandler={(id: string) => openConfirmationModalHandler(id)}
        columns={columns}
        createClickHandler={openModal}
        buttonText="Create"
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        tableSize={tableSize}
        changePageHandler={changePageHandler}
        ticketProviders={ticketProviders}
        tickProviderHandler={ticketProviderChangeHandler}
      />
      <CreateTicketProviderApiTokenModal
        title="Create Ticket Provider Api Token"
        openModal={openTicketProviderApiTokenModal}
        closeModal={closeModal}
        submitForm={createTicketProvider}
        inputValueHandler={createTicketProviderApiTokenFormValuesHandler}
        ticketProviders={ticketProviders}
      />
      <ConfirmationModal
        title="Delete Ticket Provider Api Token"
        text="Are you sure, You want to delete ticket provider api token?"
        openModal={openConfirmationModal}
        closeModal={closeConfirmationModalHandler}
        submitForm={deleteTicketProviderHandler}
      />
      <ToastContainer />
    </>
  );
};

export default TicketProviderApiToken;
