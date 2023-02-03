import React, { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import Title from '../../components/Title/index';
import DataTable from '../../components/DataTable/index';
import { columns } from './table-columns';
import { getOrders, getOrderByUuid } from '../../services/app/orders-service';
import { errorHandler } from '../../utils/network/error-handler';
import { AxiosError } from 'axios';
import OrderDetailsModal from './OrderDetailsModal';

interface OrdersPageProps {}

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

const OrdersPage: FC<OrdersPageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tableSize, setTableSize] = useState({
    default: 10,
    list: [5, 10, 25],
  });

  const [orders, setOrders] = useState({
    data: [],
    cursor: {
      afterCursor: '',
      beforeCursor: '',
    },
  });

  const [openOrderModal, setOpenOrderModal] = useState({
    value: false,
    orderUuid: '',
  });

  const [orderDetail, setOrderDetail] = useState<any>('');

  const [currentCursor, setCurrentCursor] = useState({
    name: '',
    value: '',
  });

  const [orderSearchedValues, setOrderSearchedValues] = useState<any>({
    marketType: '',
    status: '',
    externalStatus: '',
    buyerValues: '',
    paymentId: '',
  })

  const [ orderStatus, setOrdersStatus ] = useState<any>({
    marketType: [
      'All', 'primary', 'secondary'
    ],
    orderStatus: [
      'All', 'created', 'paid', 'canceled', 'completed'
    ],
    paymentExternalStatus: [ 'All', 'pending', 'error', 'completed', 'declined']
  })

  const getOrderQuery = useQuery(
    ['orders', tableSize.default, orderSearchedValues, currentCursor.value],
    async () => getOrders({ 
      limit: tableSize.default,
      location,
      orderSearchedParams: orderSearchedValues,
      afterCursor: currentCursor.name === 'next' ? currentCursor.value : '',
      beforeCursor: currentCursor.name === 'previuous' ? currentCursor.value : '', }),
    {
      onSuccess: (data) => {
        setOrders(data);
      },
      onError: (err: AxiosError) => errorHandler(err, navigate),
      refetchOnWindowFocus: true,
    },
  );

  const getOrderByUuidQuery = useQuery(
    ['orderUuid', openOrderModal.value],
    () => getOrderByUuid(openOrderModal.orderUuid, location),
    {
      onSuccess: (data) => {
        setOrderDetail(data[0]);
      },
      onError: () => (err: AxiosError) => errorHandler(err, navigate),
      enabled: openOrderModal.orderUuid ? true : false,
    },
  );

  const orderModalHandler = (row: any) => {
    setOpenOrderModal(() => {
      return {
        value: true,
        orderUuid: row.uuid,
      };
    });
    navigate(`/orders/${row.uuid}`)
  };

  const pageSizeHandler = (pageSize: number) => {
    setTableSize({
      ...tableSize,
      default: pageSize,
    });
    getOrderQuery.refetch();
  };

  const changePageHandler = (changePage: string) => {
    const { cursor } = orders || {};
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
    getOrderQuery.refetch();
  };

  const orderSearchHandler = (feild: string, value: any) => {

    switch(feild) {
      case 'market_type':
        setOrderSearchedValues({...orderSearchedValues, marketType: value})
        break;
      case 'order_status':
        setOrderSearchedValues({...orderSearchedValues, status: value})
        break;
      case 'payment_external_status':
        setOrderSearchedValues({...orderSearchedValues, externalStatus: value})
        break;
      case 'buyer_input_value':
        setOrderSearchedValues({...orderSearchedValues, buyerValues: value})
        break;
      case 'payment_id':
        setOrderSearchedValues({...orderSearchedValues, paymentId: value})
        break;
      default:
        break;
    }

  }

  return (
    <>
      <PageContent>
        <Title title="Orders" />
      </PageContent>
      <DataTable
        data={orders?.data.length ? orders : []}
        columns={columns}
        buttonText={location.pathname.split('/')[1] === 'validate-web-backend' ? '' : 'Create'}
        rowClickHandler={orderModalHandler}
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        changePageHandler={changePageHandler}
        tableSize={tableSize}
        inputChangeHandler={orderSearchHandler}
        orderValues={orderStatus}
      />
      <OrderDetailsModal
        openModal={openOrderModal.value}
        closeModal={() => setOpenOrderModal({ value: false, orderUuid: '' })}
        title="Order Detail"
        orderDetail={orderDetail}
      />
    </>
  );
};

export default OrdersPage;
