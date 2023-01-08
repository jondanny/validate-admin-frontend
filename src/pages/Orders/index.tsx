import React, { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import Title from '../../components/Title/index';
import DataTable from '../../components/DataTable/index';
import { columns } from './table-columns'
import { getOrders, getOrderByUuid } from '../../services/app/orders-service';
import { errorHandler } from '../../utils/network/error-handler';
import { AxiosError } from 'axios';
import OrderDetailsModal from './OrderDetailsModal'

interface OrdersPageProps {}

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

const OrdersPage: FC<OrdersPageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation()

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
    orderUuid: ''
  })

  const [orderDetail, setOrderDetail] = useState<any>('')


  const getOrderQuery = useQuery(['orders', tableSize.default], async () => getOrders({limit: tableSize.default, location}),{
    onSuccess: (data) => {
      setOrders(data)
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
    refetchOnWindowFocus: true,
  });

  const getOrderByUuidQuery = useQuery(['orderUuid', openOrderModal.value], () => getOrderByUuid(openOrderModal.orderUuid, location), {
    onSuccess: (data) => {
      console.log('this is the data: ', data);
      setOrderDetail(data);
    },
    onError: () => (err: AxiosError) => errorHandler(err, navigate),
    enabled: openOrderModal.orderUuid ? true :false
  })

  const orderModalHandler = (row: any) => {
    setOpenOrderModal(() => {
      return {
        value: true,
        orderUuid: row.uuid
      }
    })

  }


  return (
    <>
      <PageContent>
        <Title title='Orders'/>
      </PageContent>
      <DataTable
        data={orders?.data.length ? orders : []}
        columns={columns}
        buttonText={location.pathname.split('/')[1] === 'validate-web-backend' ? '' : "Create"}
        rowClickHandler={orderModalHandler}
      />
      <OrderDetailsModal 
        openModal={openOrderModal.value}
        closeModal={() => setOpenOrderModal({value: false, orderUuid: ''})}
        title="Order Detail"
      />
    </>
  )
}

export default OrdersPage;