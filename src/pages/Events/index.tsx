import React, { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Title from '../../components/Title/index';
import DataTable from '../../components/DataTable/index';
import { useMutation, useQuery } from 'react-query';
import { createEventService, getEvents, getTicketProviders } from '../../services/app/events-service';
import { columns } from './table-columns'
import { errorHandler } from '../../utils/network/error-handler'
import { AxiosError } from 'axios'
import CreateEventModal from './CreateEventModal';
import { toast, ToastContainer } from 'react-toastify';

export interface EventsInterface {};

interface createEventValuesInterface {
  ticketProviderId: string | number;
  name: string | number;
  description: string | number;
  imageUrl: string | number;

}
interface createEventModalInterface {
  open: boolean;
  eventValues: createEventValuesInterface
}

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

const Events: FC<EventsInterface> = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const [ticketProviders, setTicketProviders] = useState([]);
  const [ticketProvideFilterValue, setTicketProviderFilterValue] = useState('');
  const [events, setEvents] = useState({
    data: [],
    cursor: {
      afterCursor: '',
      beforeCursor: '',
    },
  });

  const [ openCreateModal, setOpenCreateModal ] = useState<createEventModalInterface>({
    open: false,
    eventValues: {
      ticketProviderId: '',
      name: '',
      description: '',
      imageUrl: ''
    }
  })

  useQuery(['ticket_provider'], () => getTicketProviders({location}), {
    onSuccess: (data) => {
      let ticketProviders = [...data];
      setTicketProviderFilterValue(`${data[0]?.id}`);
      setTicketProviders(ticketProviders as any);
      getEventsQuery.refetch()
    },
    refetchOnWindowFocus: true,
  });

  const getEventsQuery = useQuery([location.pathname.split('/').includes('validate-backend') ? 'event' : 'events', ticketProvideFilterValue], async () => getEvents({limit: 10, ticketProviderId: ticketProvideFilterValue, location}),{
    onSuccess: (data) => {
      setEvents(data)
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
    refetchOnWindowFocus: true,
  })

  const createEventMutation = useMutation((data: any) => createEventService(data, location), {
    onSuccess: () => {
      setOpenCreateModal({
        open: false,
        eventValues: {
          ticketProviderId: '',
          name: '',
          description: '',
          imageUrl: '',
        }
      })
      getEventsQuery.refetch();
    },
    onError: (err: AxiosError) => errorHandler(err, navigate)
  });

  const tickProviderHandler = (ticketProviderId: string) => {
    setTicketProviderFilterValue(`${ticketProviderId}`);
  };

  const openModalHandler = () => {
    setOpenCreateModal({
      ...openCreateModal,
      open: true
    })
  }
  const closeModalHandler = () => {
    setOpenCreateModal({
      open: false,
      eventValues: {
        ticketProviderId: '',
        name: '',
        description: '',
        imageUrl: '',
      }
    })
  }

  const inputValueHandler = (field: string, value: string | number) => {
    const newValues = {...openCreateModal.eventValues};

    if(field === 'name'){
      newValues.name = value;
    }else if(field === 'description'){
      newValues.description = value;
    }else if(field === 'imageUrl'){
      newValues.imageUrl = value;
    }else {
      newValues.ticketProviderId = value;
    }

    setOpenCreateModal((prevState) => {
      return {
        ...prevState,
        eventValues: {
          ...prevState.eventValues,
          ...newValues
        }
      }
    })
  }

  const createEvent = () => {
    const { name, description, ticketProviderId } = openCreateModal.eventValues;
    if(!name || !description || !ticketProviderId){
      toast.error('Please Fill All the Fields', {
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
    createEventMutation.mutate(openCreateModal.eventValues);
  }



  return (
    <>
      <PageContent>
        <Title title='Events'/>
      </PageContent>
      <DataTable
        data={events?.data.length ? events : []}
        columns={columns}
        ticketProviders={ticketProviders}
        tickProviderHandler={tickProviderHandler}
        ticketProvideFilterValue={ticketProvideFilterValue}
        buttonText={location.pathname.split('/')[1] === 'validate-web-backend' ? '' : "Create"}
        createClickHandler={openModalHandler}
      />

      <CreateEventModal 
        title='Create Event'
        closeModal={closeModalHandler}
        openModal={openCreateModal.open}
        submitForm={createEvent}
        inputValueHandler={inputValueHandler}
        ticketProviders={ticketProviders}
      />
      <ToastContainer />
    </>
    
  )
}

export default Events;