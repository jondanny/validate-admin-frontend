import React, { FC } from 'react';
import { Modal, Box, TextField, Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';
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
  ticketProviders: any[]
  ticketProviderApiTokenValues: any
}

const CreateTicketProviderApiTokenModal: FC<CreateTicketProviderModalProps> = ({
  title,
  openModal,
  closeModal,
  submitForm,
  inputValueHandler,
  ticketProviders,
  ticketProviderApiTokenValues
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
                id="token"
                name="token"
                label="Token"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => inputValueHandler('token', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="ProviderId">Ticket Provider</InputLabel>
              <Select
                value={ ticketProviderApiTokenValues?.ticketProviderId }
                onChange={(e) => inputValueHandler('ticketProvider', e.target.value)}
                style={{ width: '100%' }}
                size="small"
                labelId="ProviderId"
              >
                {
                  ticketProviders?.map((provider: any) => {
                    return (
                      <MenuItem value={provider.id}>{provider.name}</MenuItem>
                    )
                  })
                }
              </Select>
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

export default CreateTicketProviderApiTokenModal;
