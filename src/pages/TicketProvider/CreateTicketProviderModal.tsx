import React, { FC } from 'react';
import { Modal, Box, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ModalTitle = styled('h2')(({ theme }) => ({
  overflow: 'hidden',
  textAlign: 'center',
  marginTop: '0px',
}));

const ButtonDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
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

interface CreateTicketProviderModalProps {
  title: string;
  openModal: boolean;
  closeModal: () => any;
  submitForm: () => any;
  inputValueHandler: (field: string, value: string) => any;
}

const CreateTicketProviderModal: FC<CreateTicketProviderModalProps> = ({
  title,
  openModal,
  closeModal,
  submitForm,
  inputValueHandler,
}) => {
  return (
    <>
      <Modal open={openModal} onClose={closeModal} aria-labelledby="modal-title">
        <Box sx={style}>
          <ModalTitle id="modal-title">{title}</ModalTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => inputValueHandler('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="given-email"
                variant="standard"
                onChange={(e) => inputValueHandler('email', e.target.value)}
              />
            </Grid>
          </Grid>
          <ButtonDiv>
            <Button variant="contained" onClick={closeModal} sx={{ mt: 3, ml: 1 }} color="inherit">
              Close
            </Button>
            <Button variant="contained" onClick={submitForm} sx={{ mt: 3, ml: 1 }} color="primary">
              Create
            </Button>
          </ButtonDiv>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTicketProviderModal;
