import React, { FC, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { debounce } from 'lodash';
import Title from '../../components/Title/index';
import DataTable from '../../components/DataTable/index';
import { columns } from './table-columns';
import { createTicketService, deleteTicket, getTickets } from '../../services/app/ticket-service';
import { getTicketProviders } from '../../services/app/ticket-provider-service';
import ConfirmationModal from '../../components/ConfirmationModal/index';
import CreateTicketModal from './CreateTicketModal';

export interface TicketInterface {}

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

interface CreateTicketProps {
  name: string;
  ticketProviderId: number;
  contractId: string;
  tokenId: number;
  userId: number;
  imageUrl: string;
  ipfsUri: string;
}

const Ticket: FC<TicketInterface> = () => {
  const [tickets, setTickets] = useState({
    data: [],
    cursor: {
      afterCursor: '',
      beforeCursor: '',
    },
  });
  const [ticketProviders, setTicketProviders] = useState([]);
  const [openTicketModal, setOpenTicketModal] = useState<boolean>(false);
  const [ticketValues, setTicketValues] = useState<CreateTicketProps>({
    name: '',
    ticketProviderId: 0,
    contractId: '',
    tokenId: 0,
    userId: 0,
    imageUrl: '',
    ipfsUri: '',
  });
  const [currentCursor, setCurrentCursor] = useState({
    name: '',
    value: '',
  });
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [deleteTicketId, setDeleteTicketId] = useState('');
  const [tableSize, setTableSize] = useState({
    default: 5,
    list: [5, 10, 25],
  });
  const [searchText, setSearchText] = useState('');

  useQuery(['ticket_provider'], () => getTicketProviders({}), {
    onSuccess: (data) => {
      setTicketProviders(data.data.map((item: any) => ({ id: item.id, name: item.name })));
    },
    refetchOnWindowFocus: true,
  });

  const query = useQuery(
    ['ticket', tableSize.default, currentCursor.value, searchText],
    () =>
      getTickets({
        limit: tableSize.default,
        afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
        beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '',
        searchText: searchText,
      }),
    {
      onSuccess: (data) => {
        setTickets(data);
      },
      refetchOnWindowFocus: true,
    },
  );

  const createMutation = useMutation((data: CreateTicketProps) => createTicketService(data), {
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

  const deleteMutation = useMutation((data: string) => deleteTicket(data), {
    onSuccess: (data) => {
      query.refetch();
    },
  });

  const closeModal = () => {
    setOpenTicketModal(false);
  };

  const openModal = () => {
    setOpenTicketModal(true);
  };

  const openConfirmationModalHandler = (id: string) => {
    setOpenConfirmationModal(true);
    setDeleteTicketId(id);
  };

  const closeConfirmationModalHandler = () => {
    setOpenConfirmationModal(false);
    setDeleteTicketId('');
  };

  const createTicketFormValuesHandler = (field: string, value: string | number) => {
    setTicketValues((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const deleteTicketHandler = () => {
    if (deleteTicketId !== '') {
      deleteMutation.mutate(deleteTicketId);
      setOpenConfirmationModal(false);
    } else {
      toast.error('No ticket is selected', {
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

  const createTicket = () => {
    if (ticketValues['name'] === '' || !ticketValues['ticketProviderId'] || !ticketValues['userId']) {
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
    createMutation.mutate(ticketValues);
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
    const { cursor } = tickets || {};
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
        <Title title="Ticket" />
      </PageContent>
      <DataTable
        data={tickets?.data.length ? tickets : []}
        deleteHandler={(id: string) => openConfirmationModalHandler(id)}
        columns={columns}
        createClickHandler={openModal}
        buttonText="Create"
        searchHandler={(value) => searchHandler(value)}
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        tableSize={tableSize}
        changePageHandler={changePageHandler}
      />
      <CreateTicketModal
        title="Create Ticket Provider"
        openModal={openTicketModal}
        closeModal={closeModal}
        submitForm={createTicket}
        inputValueHandler={(field: string, value: string | number) => createTicketFormValuesHandler(field, value)}
        ticketProviders={ticketProviders}
      />
      <ConfirmationModal
        title="Create Ticket Provider"
        text="Are you sure, You want to delete ticket provider"
        openModal={openConfirmationModal}
        closeModal={closeConfirmationModalHandler}
        submitForm={deleteTicketHandler}
      />
      <ToastContainer />
    </>
  );
};

export default Ticket;
