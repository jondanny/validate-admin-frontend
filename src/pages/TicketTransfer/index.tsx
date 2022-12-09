import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { styled } from '@mui/material/styles';
import DataTable from '../../components/DataTable/index';
import Title from '../../components/Title/index';
import { getTicketTranser, getTicketProviders } from '../../services/app/ticket-transfer-service';
import { errorHandler } from '../../utils/network/error-handler'
import { columns } from './table-columns';
import { AxiosError } from 'axios'

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

const TicketProviderApiToken: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ticketTransfer, setTicketTransfer] = useState({
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
  const [tableSize, setTableSize] = useState({
    default: 10,
    list: [5, 10, 25],
  });
  const [ticketProviders, setTicketProviders] = useState([]);
  const [ticketProvideFilterValue, setTicketProviderFilterValue] = useState('');

  const query = useQuery(
    ['ticket_providers', tableSize.default, currentCursor.value, ticketProvideFilterValue],
    () =>
      getTicketTranser({
        limit: tableSize.default,
        afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
        beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '',
        ticketProviderId: ticketProvideFilterValue,
        location
      }),
    {
      onSuccess: (data) => {
        setTicketTransfer(data);
      },
      onError: (err: AxiosError) => errorHandler(err, navigate),
      refetchOnWindowFocus: true,
    },
  );

  const pageSizeHandler = (pageSize: number) => {
    setTableSize({
      ...tableSize,
      default: pageSize,
    });
    query.refetch();
  };

  const changePageHandler = (changePage: string) => {
    const { cursor } = ticketTransfer || {};
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

  useQuery(['ticket_providers'], () => getTicketProviders({location}), {
    onSuccess: (data) => {
      let ticketProviders = [...data];
      ticketProviders.unshift({
        name: 'All',
        id: 0,
      });
      setTicketProviders(ticketProviders as any);
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
    refetchOnWindowFocus: true,
  });

  const ticketProviderChangeHandler = (ticketProviderId: string) => {
    setTicketProviderFilterValue(`${ticketProviderId}`);
  };

  return (
    <>
      <PageContent>
        <Title title="Ticket Transfer Log" />
      </PageContent>
      <DataTable
        data={ticketTransfer?.data.length ? ticketTransfer : []}
        columns={columns}
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        tableSize={tableSize}
        changePageHandler={changePageHandler}
        ticketProviders={ticketProviders}
        tickProviderHandler={ticketProviderChangeHandler}
      />
      <ToastContainer />
    </>
  );
};

export default TicketProviderApiToken;
