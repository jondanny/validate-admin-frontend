import React from 'react';
import { Modal, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ModalTitle = styled('h2')(({ theme }) => ({
  overflow: 'hidden',
  textAlign: 'center',
  marginTop: '0px',
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '38rem',
  bgcolor: 'background.paper',
  p: 4,
  pt: 3,
  pb: 1,
  borderRadius: 2,
};

const OrderDetailsModal = (props: any) => {
  const { openModal, closeModal, title, orderDetail } = props;
  return (
    <>
      <Modal open={openModal} onClose={closeModal} aria-labelledby="modal-title">
        <Box sx={style}>
          <ModalTitle id="modal-title">{title}</ModalTitle>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} lg={4}>
              <h3>Market Type</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={8}>
              <p>{orderDetail?.marketType}</p>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} lg={4}>
              <h3>Price</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={8}>
              <p>{orderDetail?.salePrice} $</p>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} lg={4}>
              <h3>Status</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={8}>
              <p>{orderDetail?.status}</p>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} lg={4}>
              <h3>Buyer</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={8}>
              <p>{orderDetail?.buyer?.name}</p>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} lg={4}>
              <h3>Seller</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={8}>
              <p>{orderDetail?.seller?.name}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} lg={4}>
              <h3>Payment Id</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={8}>
              <p>{orderDetail?.payment?.externalId}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} lg={4}>
              <h3>Payment Status</h3>
            </Grid>
            <Grid item xs={6} sm={6} lg={8}>
              <p>{orderDetail?.payment?.externalStatus}</p>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default OrderDetailsModal;
