import React from 'react';
import { Modal, Box } from '@mui/material';
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
  const { openModal, closeModal, title } = props;
  return (
    <>
      <Modal open={openModal} onClose={closeModal} aria-labelledby="modal-title">
        <Box sx={style}>
        <ModalTitle id="modal-title">{title}</ModalTitle>

        </Box>
      </Modal>
    </>
  )

}


export default OrderDetailsModal;