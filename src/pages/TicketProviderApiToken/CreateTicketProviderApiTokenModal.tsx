import React from 'react';
import { Autocomplete, Modal, Box, TextField, Button, Grid } from '@mui/material';
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

interface optionType {
  id: number;
  name: string;
}

interface CreateTicketProviderModalProps {
  title: string;
  openModal: boolean;
  closeModal: () => any;
  submitForm: () => any;
  inputValueHandler: (field: string, value: string | number) => any;
  ticketProviders: any[];
}

const CreateTicketProviderApiTokenModal: React.FC<CreateTicketProviderModalProps> = ({
  title,
  openModal,
  closeModal,
  submitForm,
  inputValueHandler,
  ticketProviders,
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
              <Autocomplete
                options={ticketProviders.filter((provider: any) => provider.id)}
                getOptionLabel={(option: optionType) => option.name}
                autoComplete
                includeInputInList
                onChange={(e: any, newValue: optionType | null) => {
                  inputValueHandler('ticketProviderId', newValue ? newValue?.id : 0);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Ticket Provider *" fullWidth variant="standard" />
                )}
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

export default CreateTicketProviderApiTokenModal;
