import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable/index';
import Title from '../../components/Title/index';
import { styled } from '@mui/material/styles';
import CreateTicketModal from './CreateTicketModal';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from 'react-query';
import {
  createTicket,
  deleteTicket,
  getTickets,
} from '../../services/app/ticket-service';
import { columns } from './table-columns';
import ConfirmationModal from '../../components/ConfirmationModal/index';
import { createTicketInterface } from '../../services/app/ticket-service';

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

export interface DashboardProps { }
interface CreateTicketProps {
  name: string;
  email: string;
}

// export interface createTicketInterface {
//   ticket_provider_id: number,
//   name: string,
//   image_url: string,
//   contract_id: number,
//   token_id: number,
//   user_id: number
// }

const Ticket: FC<DashboardProps> = () => {
  const [openTicketModal, setOpenTicketModal] = useState<boolean>(false);
  const [ticketValues, setTicketValues] = useState<createTicketInterface>({
    ticket_provider_id: 0,
    name: '',
    image_url: '',
    contract_id: 0,
    token_id: 0, user_id: 0
  });
  const [tickets, setTickers] = useState({
    data: [],
    cursor: {},
  });
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [deleteTicketId, setDeleteTicketId] = useState('');

  const query = useQuery(['ticket_providers'], getTickets, {
    onSuccess: (data) => {
      setTickers(data);
    },
  });

  const createMutation = useMutation((data: createTicketInterface) => createTicket(data), {
    onSuccess: (data) => {
      query.refetch();
    },
  });

  const deleteMutation = useMutation((data: string) => deleteTicket(data), {
    onSuccess: (data) => {
      query.refetch();
    },
  });

  const openModal = () => {
    setOpenTicketModal(true);
  };
  const closeModal = () => {
    setOpenTicketModal(false);
  };

  const createTicketFormValuesHandler = (field: string, value: string) => {
    if (field === 'name') {
      setTicketValues({
        ...ticketValues,
        name: value,
      });
    } else {
      setTicketValues({
        ...ticketValues,
        email: value,
      });
    }
  };

  const createTicket = () => {
    if (ticketValues['name'] === '' || ticketValues['email'] === '') {
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
    closeModal();
  };

  const openConfirmationModalHandler = (id: string) => {
    setOpenConfirmationModal(true);
    setDeleteTicketId(id);
  };
  const closeConfirmationModalHandler = () => {
    setOpenConfirmationModal(false);
    setDeleteTicketId('');
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

  const searchHandler = (value: string) => { };

  return (
    <>
      <PageContent>
        <Title title="Ticket " />
      </PageContent>
      <DataTable
        data={tickets?.data.length ? tickets : []}
        deleteHandler={(id: string) => openConfirmationModalHandler(id)}
        columns={columns}
        createClickHandler={openModal}
        buttonText="Create"
        searchHandler={(value) => searchHandler(value)}
      />
      <CreateTicketModal
        title="Create Ticket "
        openModal={openTicketModal}
        closeModal={closeModal}
        submitForm={createTicket}
        inputValueHandler={(field: string, value: string) => createTicketFormValuesHandler(field, value)}
      />
      <ConfirmationModal
        title="Create Ticket "
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
