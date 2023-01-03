import React, { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { styled } from '@mui/material/styles';
import Title from '../../components/Title/index';
import DataTable from '../../components/DataTable/index';
import { columns } from './table-columns';
import { getTicketTypes, createTicketTypeService, getCurrencies } from '../../services/app/ticket-type-service';
import { AxiosError } from 'axios';
import { errorHandler } from '../../utils/network/error-handler'
import { getEvents } from '../../services/app/events-service';
import CreateTicketTypeModal from './CreateTicketTypeModal';
import { toast, ToastContainer } from 'react-toastify';


export interface TicketTypeInterface {};

export interface CreateTicketTypeInterface {
  eventUuid: string;
  name: string;
  ticketDateStart: string;
  ticketDateEnd: string;
  saleEnabled?: number;
  saleAmount?: number,
  saleEnabledFromDate?: string,
  saleEnabledToDate?: string,
  resaleEnabled?: number;
  resaleMaxPrice?: number;
  resaleMinPrice?: number;
  resaleEnabledFromDate?: string;
  resaleEnabledToDate?: string;
  resaleCurrency?: string;
  saleCurrency?: string
}

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

const TicketType: FC<TicketTypeInterface> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [ ticketTypes, setTicketTypes ] = useState({
    data: [],
    cursor: {
      afterCursor: '',
      beforeCursor: '',
    },
  });
  const [events, setEvents] = useState([]);
  const [eventsFilterValue, setEventsFilterValue] = useState('');
  const [tableSize, setTableSize] = useState({
    default: 10,
    list: [5, 10, 25],
  });
  const [openTicketTypeModal, setOpenTicketTypeModal] = useState(false)
  const [saleEnabledState, setSaleEnabledState] = useState({
    saleEnabled: false,
    saleEnableValues: {
      saleAmount: '',
      saleEnabledFromDate: '',
      saleEnabledToDate: '',
      currency: '',
    }
  })
  
  const [resaleEnabledState, setResaleEnabledState] = useState({
    resaleEnabled: false,
    resaleEnableValues: {
      resaleMaxPrice: '',
      resaleMinPrice: '',
      resaleEnabledFromDate: '',
      resaleEnabledToDate: '',
      currency: ''
    }
  })

  const [ticketTypeValues, setTicketTypeValues] = useState<any>({
    eventId: '',
    name: '',
    ticketDateStart: '',
    ticketDateEnd: '',
  })

  const [currencies, setCurrencies] = useState([])

  useQuery(['events'], () => getEvents({location}), {
    onSuccess: (data) => {
      let events = [...data.data];

      events.unshift({
        name: 'All',
        uuid: 0,
      });
      setEventsFilterValue(data[0]?.uuid);
      setEvents(events as any);
      getTicketTypesQuery.refetch()
    },
    refetchOnWindowFocus: true,
  });

  useQuery(['currencies'], () => getCurrencies(location), {
    onSuccess: (data) => {
      let arr: any = [];
      Object.keys(data).forEach((key) => {
        let obj: any = {};
        obj['name'] = key;
        obj['uuid'] = key;
        arr.push(obj);
      })
      setCurrencies(arr);
    }
  })

  const getTicketTypesQuery = useQuery(['ticket-types', tableSize.default, eventsFilterValue], () => getTicketTypes({limit: tableSize.default, location, eventUuid: eventsFilterValue}), {
    onSuccess: (data) => {
      setTicketTypes(data)
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
    refetchOnWindowFocus: true
  })

  const createTicketTypeQuery = useMutation((data: CreateTicketTypeInterface) =>  createTicketTypeService(data, location), {
    onSuccess: (data) => {
      setResaleEnabledState({
        resaleEnabled: false,
        resaleEnableValues: {
          resaleMaxPrice: '',
          resaleMinPrice: '',
          resaleEnabledFromDate: '',
          resaleEnabledToDate: '',
          currency: ''
        }
      })

      setSaleEnabledState({
        saleEnabled: false,
        saleEnableValues: {
          saleAmount: '',
          saleEnabledFromDate: '',
          saleEnabledToDate: '',
          currency: '',
        }
      })

      setTicketTypeValues({
        eventId: '',
        name: '',
        ticketDateStart: '',
        ticketDateEnd: '',
      })
      closeModal();
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
  })

  const pageSizeHandler = (pageSize: number) => {
    setTableSize({
      ...tableSize,
      default: pageSize,
    });
    getTicketTypesQuery.refetch();
  };

  const eventsHandler = (eventUuid: string) => {
    setEventsFilterValue(eventUuid);
  }

  const openModal = () => {
    setOpenTicketTypeModal(true)
  }

  const closeModal = () => {
    setOpenTicketTypeModal(false)
  }

  const createTicketType = () => {
    const { eventId, name, ticketDateStart, ticketDateEnd} = ticketTypeValues;
    const {saleEnabled, saleEnableValues} = saleEnabledState;
    const { saleAmount, saleEnabledFromDate, saleEnabledToDate } = saleEnableValues;
    const {resaleEnabled, resaleEnableValues} = resaleEnabledState;
    const {resaleMinPrice, resaleMaxPrice, resaleEnabledFromDate, resaleEnabledToDate} = resaleEnableValues;
    
    if(!eventId || !name || !ticketDateStart || !ticketDateEnd){
      toast.error('Fill All the Fields', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return ;
    }

    let mutationParam: CreateTicketTypeInterface = {
      eventUuid: eventId,
      name,
      ticketDateStart,
      ticketDateEnd
    }
    if(saleEnabled){
      if(!saleAmount || !saleEnabledFromDate || !saleEnabledToDate){
        toast.error('Fill All Sale Fields', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return ;
      }
      mutationParam['saleEnabled'] = saleEnabled ? 1 : 0;
      mutationParam['saleAmount'] = parseInt(saleAmount);
      mutationParam['saleEnabledFromDate'] = saleEnabledFromDate
      mutationParam['saleEnabledToDate'] = saleEnabledToDate
      mutationParam['saleCurrency'] = saleEnableValues.currency
    }
    if(resaleEnabled){
      if(!resaleMinPrice || !resaleMaxPrice || !resaleEnabledFromDate || !resaleEnabledToDate){
        toast.error('Fill All Re-Sale Fields', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return ;
      }
      mutationParam['resaleEnabled'] = resaleEnabled ? 1 : 0;
      mutationParam['resaleMaxPrice'] = parseInt(resaleMaxPrice);
      mutationParam['resaleMinPrice'] = parseInt(resaleMinPrice);
      mutationParam['resaleEnabledFromDate'] = resaleEnabledFromDate;
      mutationParam['resaleEnabledToDate'] = resaleEnabledToDate
      mutationParam['resaleCurrency'] = resaleEnableValues.currency
    }

    createTicketTypeQuery.mutate(mutationParam);


  }

  const createTicketTypeFormValuesHandler = (field: string, value: string) => {
    let newValues = {...ticketTypeValues};

    switch(field){
      case 'eventId':
        newValues.eventId = value;
        break;
      case 'type': 
        newValues.name = value;
        break;
      case 'dateStart':
        newValues.ticketDateStart = value;
        break;
      default: 
        newValues.ticketDateEnd = value;
    }
    setTicketTypeValues(newValues);

  }

  const saleEnableChangeHandler = (field: string, value: string) => {
    let newValues = {...saleEnabledState.saleEnableValues}

    switch(field){
      case 'sale_amount':
        newValues.saleAmount = value;
        break
      case 'sale_start_date': 
        newValues.saleEnabledFromDate = value;
        break
      case 'sale_currency':
        newValues.currency = value
        break
      default: 
        newValues.saleEnabledToDate = value;
    }

    setSaleEnabledState({
      ...saleEnabledState, 
      saleEnableValues: newValues
    })

  }

  const resalesEnableChangeHandler = (field: string, value: string) => {
    let newValues = {...resaleEnabledState.resaleEnableValues}

    switch(field){
      case 'max_amount':
        newValues.resaleMaxPrice = value;
        break;
      case 'min_amount':
        newValues.resaleMinPrice = value
        break;
      case 'resale_start_date': 
        newValues.resaleEnabledFromDate = value;
        break;
      case 'resale_currency':
        newValues.currency = value
        break;
      default: 
        newValues.resaleEnabledToDate = value;
    }

    setResaleEnabledState({
      ...resaleEnabledState,
      resaleEnableValues: newValues
    })
  }


  return (
    <>
      <PageContent>
        <Title title='Ticket Types'/>
      </PageContent>
      <DataTable
        data={ticketTypes?.data.length ? ticketTypes : []}
        columns={columns}
        buttonText={location.pathname.split('/')[1] === 'validate-web-backend' ? '' : "Create"}
        tableSize={tableSize}
        pageSizeChangeHandler={pageSizeHandler}
        eventsHandler={eventsHandler}
        events={events}
        createClickHandler={openModal}
      />
      <CreateTicketTypeModal
        title="Create Ticket"
        openModal={openTicketTypeModal}
        closeModal={closeModal} 
        submitForm={createTicketType}
        inputValueHandler={(field: string, value: string) => createTicketTypeFormValuesHandler(field, value)}
        saleEnabled={saleEnabledState}
        reSaleEnabled={resaleEnabledState}
        events={events}
        saleEnabledHandler = {(value) => setSaleEnabledState({...saleEnabledState, saleEnabled: value})}
        saleEnableChangeHandler = {saleEnableChangeHandler}
        resaleEnableChangeHandler = {resalesEnableChangeHandler}
        resaleEnabledHandler={(value) => setResaleEnabledState({...resaleEnabledState, resaleEnabled: value})}
        currencies={currencies}
      />
      <ToastContainer />
    </>
  )

}

export default TicketType;