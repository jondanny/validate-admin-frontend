import React, { FC } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const ModalTitle = styled('h2')(({ theme }) => ({
  overflow: 'hidden',
  marginTop: '0px',
}))

const ModalSubTitle = styled('h4')(({ theme }) => ({
  marginTop: '0px',
}))

const ButtonDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end'
}))

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
  borderRadius: 2
};

interface ConfirmationModalProps {
  title: string
  openModal: boolean
  text: string
  closeModal: () => any
  submitForm: () => any,
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ title, openModal, closeModal, submitForm, text }) => {
  return (
    <>
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-title"
    >
      <Box sx={style}>
        <ModalTitle id='modal-title'>{title}</ModalTitle>
        <ModalSubTitle>{text}</ModalSubTitle>
        <ButtonDiv>
        <Button
          variant="contained"
          onClick={closeModal}
          sx={{ mt: 3, ml: 1 }}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={submitForm}
          sx={{ mt: 3, ml: 1 }}
          color="primary"
          >
           Yes
        </Button>
        </ButtonDiv>
      </Box>
    </Modal>
    </>
  )
}

export default ConfirmationModal;