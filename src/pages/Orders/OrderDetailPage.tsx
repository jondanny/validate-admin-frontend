import React, { FC, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { errorHandler } from '../../utils/network/error-handler';
import { getOrderByUuid } from '../../services/app/orders-service';
import { styled } from '@mui/material/styles';
import Title from '../../components/Title/index';
import { Box, Grid } from '@mui/material';
import { isObject} from 'lodash';


interface OrderDetailPageProps {}

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

const BoxedContent = styled('div')(({ theme }) => ({
  top: '50%',
  left: '20%',
  position: 'relative',
  width: '60vw',
}))

const CenteredTypoGraphy = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginTop: '2rem'
}))

const LeftTypoGraphy = styled('div')(({ theme }) => ({
  paddingLeft: '1rem',
  marginTop: '2rem'
}))

const OrderDetailPage: FC<OrderDetailPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ orderUuid, setOrderUuid ] = useState('');
  const [ orderData, setOrderData ] = useState<any>({})
  const [ filteredKeys, setFilteredKeys ] = useState<any>()
  const [ buyer, setBuyer ] = useState<any>()
  const [ seller, setSeller ] = useState<any>()
  const [ payment, setPayment ] = useState<any>()
  const [ primaryPurchaseTickets, setPrimaryPurchaseTickets ] = useState<any>()

  useEffect(() => {
    const urlArray = location?.pathname?.split('/');
    const uuid = urlArray[urlArray.length - 1];

    uuid && setOrderUuid(uuid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useQuery(['orderDetails'], () => getOrderByUuid(orderUuid, location),{
    onSuccess: (data) => {
      const {buyer, seller, payment, primaryPurchases } = data;
      let keys = Object.keys(data);
      let nonObjectArr: any = [];
      let sellers: any = []
      let buyers: any = []
      let payments: any = []
      let primaryPurchaseTicket:any = [];


      keys.forEach((key) => {
        if(!isObject(data[`${key}`])){
          const result = key.replace(/([A-Z])/g, " $1");
          const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
          nonObjectArr.push({
            name: key,
            data: data[key],
            title: finalResult
          })
          return key
        }
      })

      setFilteredKeys(nonObjectArr)

       buyer && Object.keys(buyer)?.forEach((key) => {
          const result = key.replace(/([A-Z])/g, " $1");
          const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
          
          buyers.push({
            name: key,
            data: buyer[key],
            title: finalResult
          })
      })
      setBuyer(buyers)

      seller && Object.keys(seller)?.forEach((key) => {
          const result = key.replace(/([A-Z])/g, " $1");
          const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
          
          sellers.push({
            name: key,
            data: seller[key],
            title: finalResult
          })
      })

      setSeller(sellers)
      
      payment && Object.keys(payment)?.forEach((key) => {
          const result = key.replace(/([A-Z])/g, " $1");
          const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

          payments.push({
            name: key,
            data: payment[key],
            title: finalResult
          })
      })

      primaryPurchases?.length > 0 && primaryPurchases.forEach(({quantity, tickets: primaryTickets}: any) => {
        let obj: any = {
          quantity: '',
          tickets: []
        };
        obj.quantity = quantity;

        primaryTickets.forEach((ticket: any) => {
          Object.keys(ticket)?.forEach((key) => {
            const result = key.replace(/([A-Z])/g, " $1");
            const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

            obj?.tickets?.push({
              name: key,
              data: ticket[key],
              title: finalResult
            })
          })
        })
        primaryPurchaseTicket.push(obj)
      })

      setPrimaryPurchaseTickets(primaryPurchaseTicket)
      setPayment(payments)
      setOrderData(data);
    },
    onError: (err: AxiosError) => errorHandler(err, navigate),
    enabled: !orderUuid ? false : true
  })


  const returnTickets = (tickets: any) => {
    return tickets?.length > 0 && tickets?.map((ticket: any) => (
      <Grid container spacing={3}>
        <Grid item pl={20} xs={6} sm={6} lg={6}>
          <h3>{ticket.title}</h3>
        </Grid>
        <Grid item pl={20} xs={6} sm={6} lg={6}>
          <p>{ticket.data || "Null"}</p>
        </Grid>
      </Grid>
    ))
  }

  return (
    <>
      <PageContent>
        <Title title='Order Details'/>    
      </PageContent>

      <Box>
        <BoxedContent>
          <CenteredTypoGraphy>
            <h1>Order Details</h1>
          </CenteredTypoGraphy>
          {
            filteredKeys?.map((key: any) => {
              return (
                <Grid container spacing={3}>
                  <Grid item pl={20} xs={6} sm={6} lg={6}>
                    <h3>{key.title}</h3>
                  </Grid>
                  <Grid item pl={20} xs={6} sm={6} lg={6}>
                    <p>{key.data || "Null"}</p>
                  </Grid>
                </Grid>
              )
            })
          }
          <CenteredTypoGraphy>
            <h1>Buyer Details</h1>
          </CenteredTypoGraphy>
          
          {
            buyer?.map((buyerKey: any) => {
              const { buyer } = orderData || {}; 
              return buyer ? (
                <Grid container spacing={3}>
                  <Grid item pl={20} xs={6} sm={6} lg={6}>
                    <h3>{buyerKey.title}</h3>
                  </Grid>
                  <Grid item pl={20} xs={6} sm={6} lg={6}>
                    <p>{buyerKey.data || "Null"}</p>
                  </Grid>
                </Grid>
              ) : null
            })
          }

          {
            seller?.length && <CenteredTypoGraphy>
              <h1>Seller Details</h1>
            </CenteredTypoGraphy>
          }
          {
            seller?.map((sellerKey: any) => {
              const { seller } = orderData || {}; 
              return seller ? (
                <Grid container spacing={3}>
                  <Grid item pl={20} xs={6} sm={6} lg={6}>
                    <h3>{sellerKey.title}</h3>
                  </Grid>
                  <Grid item pl={20} xs={6} sm={6} lg={6}>
                    <p>{sellerKey.data || "Null"}</p>
                  </Grid>
                </Grid>
              ) : null
            })
          }

          <CenteredTypoGraphy>
            <h1>Payment Details</h1>
          </CenteredTypoGraphy>
          {
            payment?.map((paymentKey: any) => {
              const { payment } = orderData || {}; 
              return payment ? (
                <Grid container spacing={3}>
                  <Grid item pl={20} xs={6} sm={6} lg={6}>
                    <h3>{paymentKey.title}</h3>
                  </Grid>
                  <Grid item pl={20} xs={6} sm={6} lg={6}>
                    <p>{paymentKey.data || "Null"}</p>
                  </Grid>
                </Grid>
              ) : null
            })
          }

          <CenteredTypoGraphy>
            <h1>Primary Purchases</h1>
          </CenteredTypoGraphy>
          
          {
            primaryPurchaseTickets?.map(({quantity, tickets}: any) =>{
              return (
                <>
                  <Grid container spacing={3}>
                    <Grid item pl={20} xs={6} sm={6} lg={6}>
                      <h3>Quantity</h3>
                    </Grid>
                    <Grid item pl={20} xs={6} sm={6} lg={6}>
                      <p>{quantity || "Null"}</p>
                    </Grid>
                  </Grid>
                  <LeftTypoGraphy>
                    <h2>Tickets: </h2>
                  </LeftTypoGraphy>
                  {returnTickets(tickets)}
                </>
              )
            })
          }
        </BoxedContent>
      </Box>
    </>
  )
}

export default OrderDetailPage;