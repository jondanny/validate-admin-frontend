import React from 'react';
import { Autocomplete, Box, Button, Grid, Modal, TextField, Switch, FormControlLabel, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const ModalTitle = styled('h2')(({ theme }) => ({
  overflow: 'hidden',
  textAlign: 'center',
  marginTop: '0px',
}));

const ModalSubTitle = styled('h3')(({ theme }) => ({
  overflow: 'hidden',
  textAlign: 'center',
  marginTop: '2rem',
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

interface CreateTicketModalProps {
  title: string;
  openModal: boolean;
  closeModal: () => any;
  submitForm: () => any;
  inputValueHandler: (field: string, value: string | number) => any;
  newUserHandler: (value: boolean) => any;
  ticketProviders: any;
  users: any;
  newUser: any,
  newUserChangeHandler: (field: string, value: string | number) => any
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  title,
  openModal,
  closeModal,
  submitForm,
  inputValueHandler,
  ticketProviders,
  users,
  newUserHandler,
  newUser,
  newUserChangeHandler
}) => {
  return (
    <>
      <Modal open={openModal} onClose={closeModal} aria-labelledby="modal-title">
        <Box sx={style}>
          <ModalTitle id="modal-title">{title}</ModalTitle>
          <FormControlLabel
            value="start"
            control={<Switch color="primary" onChange={(e) => newUserHandler(e.target.checked)}/>}
            label={<strong>New User</strong>}
            labelPlacement="start"
            style={{display: 'flex'}}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="ticketName"
                name="ticketName"
                label="Ticket Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => inputValueHandler('name', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                  disabled={newUser?.newUserExists}
                  options={users}
                  getOptionLabel={(option: optionType) => option.name}
                  autoComplete
                  includeInputInList
                  onChange={(e: any, newValue: optionType | null) => {
                    inputValueHandler('userId', newValue ? newValue?.id : 0);
                  }}
                  renderInput={(params) => <TextField {...params} label="User *" fullWidth variant="standard" />}
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="imageUrl"
                name="imageUrl"
                label="Image URL"
                fullWidth
                autoComplete="given-image-url"
                variant="standard"
                onChange={(e) => inputValueHandler('imageUrl', e.target.value)}
              />
            </Grid>
          </Grid>

          <div style={{display: newUser.newUserExists ? 'block' : 'none'}}>
            <Divider />

            <ModalSubTitle>New User</ModalSubTitle>

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
                  defaultValue={newUser?.userFieldsValues?.name || ''}
                  onChange={(e) => newUserChangeHandler('name', e.target.value)}
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
                  defaultValue={newUser?.userFieldsValues?.email || ''}
                  onChange={(e) => newUserChangeHandler('email', e.target.value)}
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
                  defaultValue={newUser?.userFieldsValues?.phoneNumber || ''}
                  onChange={(e) => newUserChangeHandler('phoneNumber', e.target.value)}
                />
              </Grid>
            </Grid>
          </div> 

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

export default CreateTicketModal;
