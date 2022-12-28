import React, { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Title from '../../components/Title/index';
import DataTable from '../../components/DataTable/index';
import { useQuery } from 'react-query';
import { getEvents, getTicketProviders } from '../../services/app/events-service';
import { columns } from './table-columns'
import { errorHandler } from '../../utils/network/error-handler'
import { AxiosError } from 'axios'

export interface EventsInterface {};

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

  const tickProviderHandler = (ticketProviderId: string) => {
    setTicketProviderFilterValue(`${ticketProviderId}`);
  };


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
      />
    </>
    
  )
}

export default Events;