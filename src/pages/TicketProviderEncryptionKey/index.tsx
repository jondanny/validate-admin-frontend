import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable/index';
import Title from '../../components/Title/index';
import { styled } from '@mui/material/styles';
import CreateTicketProviderEncryptionKeyModal from './CreateTicketProviderEncryptionKeyModal';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from 'react-query';
import {
  getTicketProviderEncryptionKey,
  createTicketProviderEncryptionKey,
  createTicketProviderEncryptionKeyInterface,
} from '../../services/app/ticket-provider-encryption-key-service';
import { getTicketProviders } from '../../services/app/users-services';
import { columns } from './table-columns';

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

const TicketProviderEncryptionKey: React.FC = () => {
  const [openTicketProviderEncryptionKeyModal, setOpenTicketProviderEncryptionKeyModal] = useState<boolean>(false);
  const [ticketProviderEncryptionKeyValues, setTicketProviderEncryptionKeyValues] =
    useState<createTicketProviderEncryptionKeyInterface>({ ticketProviderId: 0 });
  const [ticketProviderEncryptionKey, setTicketProviderEncryptionKey] = useState({
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
  const [ticketProviders, setTicketProviders] = useState([]);
  const [ticketProviderFilterValue, setTicketProviderFilterValue] = useState('');

  const [tableSize, setTableSize] = useState({
    default: 10,
    list: [5, 10, 25],
  });

  const query = useQuery(
    ['ticket_provider_encryption_keys', tableSize.default, currentCursor.value, ticketProviderFilterValue],
    () =>
      getTicketProviderEncryptionKey({
        limit: tableSize.default,
        afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
        beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '',
        ticketProviderId: ticketProviderFilterValue,
      }),
    {
      onSuccess: (data) => {
        setTicketProviderEncryptionKey(data);
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

  const createMutation = useMutation(
    (data: createTicketProviderEncryptionKeyInterface) => createTicketProviderEncryptionKey(data),
    {
      onSuccess: (data) => {
        query.refetch();
        setTicketProviderEncryptionKeyValues({ ticketProviderId: 0 });
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
    setOpenTicketProviderEncryptionKeyModal(true);
  };

  const closeModal = () => {
    setOpenTicketProviderEncryptionKeyModal(false);
  };

  const createTicketProviderEncryptionKeyFormValuesHandler = (field: string, value: string | number) => {
    setTicketProviderEncryptionKeyValues((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const createTicketProvider = () => {
    if (ticketProviderEncryptionKeyValues['ticketProviderId'] === 0) {
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
    createMutation.mutate(ticketProviderEncryptionKeyValues);
  };

  const pageSizeHandler = (pageSize: number) => {
    setTableSize({
      ...tableSize,
      default: pageSize,
    });
    query.refetch();
  };

  const changePageHandler = (changePage: string) => {
    const { cursor } = ticketProviderEncryptionKey || {};
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
        <Title title="Ticket Provider Encryption Key" />
      </PageContent>
      <DataTable
        data={ticketProviderEncryptionKey?.data.length ? ticketProviderEncryptionKey : []}
        columns={columns}
        createClickHandler={openModal}
        buttonText="Create"
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        tableSize={tableSize}
        changePageHandler={changePageHandler}
        ticketProviders={ticketProviders}
        tickProviderHandler={ticketProviderChangeHandler}
      />
      <CreateTicketProviderEncryptionKeyModal
        title="Create Ticket Provider Encryption Key"
        openModal={openTicketProviderEncryptionKeyModal}
        closeModal={closeModal}
        submitForm={createTicketProvider}
        inputValueHandler={createTicketProviderEncryptionKeyFormValuesHandler}
        ticketProviders={ticketProviders}
        ticketProviderEncryptionKeyValues={ticketProviderEncryptionKeyValues}
      />
      <ToastContainer />
    </>
  );
};

export default TicketProviderEncryptionKey;
