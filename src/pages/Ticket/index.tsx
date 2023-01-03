import React, { FC, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { debounce } from 'lodash';
import Title from '../../components/Title/index';
import DataTable from '../../components/DataTable/index';
import { columns } from './table-columns';
import {
  createTicketService,
  deleteTicket,
  getTickets,
  retryTicketMinting,
  retryMintingTicketInterface
} from '../../services/app/ticket-service';
import { getTicketProviders } from '../../services/app/users-services';
import ConfirmationModal from '../../components/ConfirmationModal/index';
import CreateTicketModal from './CreateTicketModal';
import { getUsers } from '../../services/app/users-services';
import { errorHandler } from '../../utils/network/error-handler';
import dayjs from 'dayjs';
import { getEvents } from '../../services/app/events-service';
import { getTicketTypes } from '../../services/app/ticket-type-service';

export interface TicketInterface {}

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

interface NewUserInterface {
  name?: string;
  email?: string;
  phoneNumber?: string;
  userId?: number | undefined;
}
interface TicketTypeInterface {
  amount: string;
  ticketDateStart: string | null;
  ticketDateEnd: string | null;

}
interface CreateTicketProps {
  ticketProviderId: number;
  eventId: number;
  ticketTypeId: string;
  userId?: number;
  imageUrl?: string | null;
  newUserName?: string;
  newUserEmail?: string;
  newUserPhoneNumber?: string;
  type: string;
  user?: NewUserInterface;
  dateStart: string | null;
  dateEnd?: string | null;
  ticketType?: TicketTypeInterface | undefined
}

const Ticket: FC<TicketInterface> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tickets, setTickets] = useState({
    data: [],
    cursor: {
      afterCursor: '',
      beforeCursor: '',
    },
  });
  const [ticketProviders, setTicketProviders] = useState([]);
  const [users, setUsers] = useState([]);
  const [openTicketModal, setOpenTicketModal] = useState<boolean>(false);
  const [ticketValues, setTicketValues] = useState<CreateTicketProps>({
    eventId: 0,
    ticketProviderId: 0,
    userId: 0,
    imageUrl: null,
    type: '',
    dateStart: dayjs(new Date()).format('YYYY-MM-DD'),
    ticketTypeId: '',
  });
  const [currentCursor, setCurrentCursor] = useState({
    name: '',
    value: '',
  });
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [deleteTicketId, setDeleteTicketId] = useState('');
  const [tableSize, setTableSize] = useState({
    default: 10,
    list: [5, 10, 25],
  });
  const [searchText, setSearchText] = useState('');
  const [ticketProvideFilterValue, setTicketProviderFilterValue] = useState('');
  const [selectedProviderId, setSelectedProviderId] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    ticketProviderId: 0,
    status: '',
  });

  const [newUser, setNewUser] = useState({
    userFieldsValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    newUserExists: false,
  });

  const [saleEnabled, setSaleEnabled] = useState({
    saleFieldsValues: {
      amount: '',
      ticketDateStart: '',
      ticketDateEnd: '',
    },
    saleEnable: false,
  });

  const [updateTicket, setUpdateTicket] = useState<any>({
    updateTicketEnabled: false,
    ticketData: {},
    reSaleValues: {
      resaleMinPrice: '',
      resaleMaxPrice: '',
      resaleStartDate: '',
      resaleEndDate: '',
      eventName: '',
      ticketTypeName: '',
    }
  })

  const [ events, setEvents ] = useState([])
  const [ ticketTypes, setTicketTypes ] = useState<any>([])

  useQuery(['ticket_provider'], () => getTicketProviders(location), {
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

  useQuery(['users'], () => getUsers({
    location
  }), {
    onSuccess: (data) => {
      setUsers(data.data.map((item: any) => ({ id: item.id, name: item.name })));
    },
  });

  useQuery(['events'], () => getEvents({location}), {
    onSuccess: (response) => {
      setEvents(response.data);
    }
  })

  useQuery(['ticket-types'], () => getTicketTypes({location}), {
    onSuccess: (response) => {
      setTicketTypes(response.data)
    }
  })

  const query = useQuery(
    [location.pathname.split('/').includes('validate-backend') ? 'tickets' : 'ticket', tableSize.default, currentCursor.value, searchText, ticketProvideFilterValue],
    () =>
    getTickets({
        limit: tableSize.default,
        afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
        beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '',
        searchText: searchText,
        ticketProviderId: ticketProvideFilterValue,
        location
      }),
    {
      onSuccess: (data) => {
        setTickets(data);
      },
      onError: (err: AxiosError) => errorHandler(err, navigate),
      refetchOnWindowFocus: true,
    },
  );

  const createMutation = useMutation((data: CreateTicketProps) => createTicketService(data, location, saleEnabled), {
    onSuccess: (data) => {
      query.refetch();
      toast.success('Ticket is created', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTicketValues({
        ticketTypeId: '',
        eventId: 0,
        ticketProviderId: 0,
        userId: 0,
        imageUrl: null,
        type: '',
        dateStart: dayjs(new Date()).format('YYYY-MM-DD'),
      });
      setNewUser({
        newUserExists: false,
        userFieldsValues: {
          name: '',
          email: '',
          phoneNumber: '',
        },
      });
      closeModal();
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
  });

  const retryMintingMutation = useMutation((data: retryMintingTicketInterface) => retryTicketMinting(data, location), {
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

  const deleteMutation = useMutation((data: string) => deleteTicket(data, location), {
    onSuccess: (data) => {
      query.refetch();
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
  });

  const closeModal = () => {
    setOpenTicketModal(false);      
      setSaleEnabled({
        saleFieldsValues: {
          amount: '',
          ticketDateStart: '',
          ticketDateEnd: '',
        },
        saleEnable: false,
      })
      setNewUser({
        userFieldsValues: {
          name: '',
          email: '',
          phoneNumber: '',
        },
        newUserExists: false,
      })
    
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

    if(field === 'ticketProviderId'){
      const updatedEvents = events.filter((event: any) => event.ticketProviderId === value)
      setEvents(updatedEvents);
    }else if(field === 'eventId'){
      const updatedTicketTypes = ticketTypes.filter((ticketType: any) => ticketType.eventId === value);
      setTicketTypes(updatedTicketTypes);
    }
  };

  const deleteTicketHandler = () => {
    if (deleteTicketId !== '') {
      deleteMutation.mutate(deleteTicketId);
      toast.success('Ticket is successfully deleted', {
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
    const { userFieldsValues } = newUser;
    const { name, email, phoneNumber } = userFieldsValues;
    if ( !ticketValues['ticketProviderId'] || ticketValues['dateStart'] === '') {
      toast.error('Please Fill all the required fields', {
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
    if (!ticketValues['userId']) {
      if (!name || !email || !phoneNumber) {
        toast.error('Please Fill all the new user fields', {
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
    }
    if (ticketValues.userId === 0) {
      let mutationParam: CreateTicketProps = {
        eventId: ticketValues.eventId,
        ticketTypeId: ticketValues.ticketTypeId,
        ticketProviderId: ticketValues.ticketProviderId,
        imageUrl: ticketValues.imageUrl,
        type: ticketValues.type,
        user: { name, email, phoneNumber },
        dateStart: ticketValues.dateStart,
      };
      if (ticketValues.dateEnd !== '') {
        mutationParam.dateEnd = ticketValues.dateEnd;
      }
      createMutation.mutate(mutationParam);
    } else {
      const mutationParam: CreateTicketProps = {
        eventId: ticketValues.eventId,
        ticketTypeId: ticketValues.ticketTypeId,
        ticketProviderId: ticketValues.ticketProviderId,
        imageUrl: ticketValues.imageUrl,
        type: ticketValues.type,
        dateStart: ticketValues.dateStart,
        user: {
          userId: ticketValues.userId,
        },
      };
      if (ticketValues.dateEnd !== '') {
        mutationParam.dateEnd = ticketValues.dateEnd;
      }
      createMutation.mutate(mutationParam);
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

  const tickProviderHandler = (ticketProviderId: string) => {
    setTicketProviderFilterValue(`${ticketProviderId}`);
  };
  const retryButtonHandler = (data: retryMintingTicketInterface) => {
    retryMintingMutation.mutate(data);
  };

  const newUserChangeHandler = (field: string, value: any, update?: boolean) => {
    const newValues = { ...newUser.userFieldsValues };
    if (field === 'name') {
      newValues.name = value;
    } else if (field === 'email') {
      newValues.email = value;
    } else {
      newValues.phoneNumber = value;
    }
    setNewUser((prevState) => {
      return {
        ...prevState,
        userFieldsValues: { ...newValues },
      };
    });
  };
  
  const saleEnableChangeHandler = (field: string, value: any, update?: boolean) => {
    const newValues = { ...saleEnabled.saleFieldsValues };
    if (field === 'amount') {
      newValues.amount = value;
    } else if (field === 'start_date') {
      newValues.ticketDateStart = value;
    } else {
      newValues.ticketDateEnd = value;
    }
    setSaleEnabled((prevState) => {
      return {
        ...prevState,
        saleFieldsValues: { ...newValues },
      };
    });
  };
  
  const editRecord = (rowData: any) => {
    setUpdateTicket({
      ...updateTicket,
      ticketData: rowData,
      updateTicketEnabled: true
    })
  }
  
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
        buttonText={location.pathname.split('/')[1] === 'validate-web-backend' ? '' : "Create"}
        searchHandler={(value) => searchHandler(value)}
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        tableSize={tableSize}
        changePageHandler={changePageHandler}
        tickProviderHandler={tickProviderHandler}
        ticketProviders={ticketProviders}
        ticketProvideFilterValue={ticketProvideFilterValue}
        retryButtonClickHandler={retryButtonHandler}
        editRecordHandler={(data) => editRecord(data)}
      />
      <CreateTicketModal
        title="Create Ticket"
        openModal={openTicketModal}
        closeModal={closeModal}
        submitForm={createTicket}
        inputValueHandler={(field: string, value: string | number) => createTicketFormValuesHandler(field, value)}
        ticketProviders={ticketProviders}
        users={users}
        newUserHandler={(value) => setNewUser({ ...newUser, newUserExists: value })}
        newUser={newUser}
        newUserChangeHandler={newUserChangeHandler}
        saleEnabled={saleEnabled}
        saleEnabledHandler = {(value) => setSaleEnabled({...saleEnabled, saleEnable: value})}
        saleEnableChangeHandler = {saleEnableChangeHandler}
        events={events}
        ticketTypes={ticketTypes}
      />
      <ConfirmationModal
        title="Create Ticket"
        text="Are you sure, You want to delete ticket"
        openModal={openConfirmationModal}
        closeModal={closeConfirmationModalHandler}
        submitForm={deleteTicketHandler}
      />
      <ToastContainer />
    </>
  );
};

export default Ticket;
