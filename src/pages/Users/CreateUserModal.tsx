import React, { FC } from 'react';
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

const statusOptions = [
  { name: 'Creating', value: 'creating' },
  { name: 'Active', value: 'active' },
];

interface ticketProviderOptionType {
  id: number;
  name: string;
}

interface CreateTicketProviderModalProps {
  title: string;
  openModal: boolean;
  closeModal: () => any;
  submitForm: () => any;
  inputValueHandler: (field: string, value: string | number, update?: boolean) => any;
  ticketProviders: any[];
  selectedProviderId: any;
  userObject: any;
  updateUser: () => void;
  shouldUpdateUser: boolean;
  userStatus: any;
}

const CreateTicketProviderModal: FC<CreateTicketProviderModalProps> = ({
  title,
  openModal,
  closeModal,
  submitForm,
  inputValueHandler,
  ticketProviders,
  selectedProviderId,
  userObject,
  updateUser,
  shouldUpdateUser,
  userStatus,
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
                defaultValue={userObject?.name || ''}
                onChange={(e) => inputValueHandler('name', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="given-email"
                variant="standard"
                defaultValue={userObject?.email || ''}
                onChange={(e) => inputValueHandler('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phoneNumber"
                name="phoneNumber"
                label="Contact Number"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                defaultValue={userObject?.phoneNumber || ''}
                onChange={(e) => inputValueHandler('phoneNumber', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={ticketProviders.filter((provider: any) => provider.id)}
                getOptionLabel={(option: ticketProviderOptionType) => option.name}
                autoComplete
                includeInputInList
                onChange={(e: any, newValue: ticketProviderOptionType | null) => {
                  inputValueHandler('ticketProviderId', newValue ? newValue?.id : 0);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Ticket Provider *" fullWidth variant="standard" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={statusOptions}
                getOptionLabel={(option) => option.name}
                autoComplete
                includeInputInList
                onChange={(e: any, newValue: any) => {
                  inputValueHandler('status', newValue ? newValue?.value : '');
                }}
                renderInput={(params) => <TextField {...params} label="Status *" fullWidth variant="standard" />}
              />
            </Grid>
          </Grid>
          <ButtonDiv>
            <Button variant="contained" onClick={closeModal} sx={{ mt: 3, ml: 1 }} color="inherit">
              Close
            </Button>
            <Button
              variant="contained"
              onClick={shouldUpdateUser ? updateUser : submitForm}
              sx={{ mt: 3, ml: 1 }}
              color="primary"
            >
              {shouldUpdateUser ? 'Update' : 'Create'}
            </Button>
          </ButtonDiv>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTicketProviderModal;
