import React, { FC } from 'react';
import { Autocomplete, Box, Button, Grid, Modal, TextField } from '@mui/material';
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

interface ticketProviderOptionType {
  id: number;
  name: string;
}

interface CreateTicketModalProps {
  title: string;
  openModal: boolean;
  closeModal: () => any;
  submitForm: () => any;
  inputValueHandler: (field: string, value: string | number) => any;
  ticketProviders: any;
}

const CreateTicketModal: FC<CreateTicketModalProps> = ({
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
                id="ticketName"
                name="ticketName"
                label="Ticket Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => inputValueHandler('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={ticketProviders}
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
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="contractId"
                name="contractId"
                label="Contract ID"
                fullWidth
                autoComplete="given-contract-id"
                variant="standard"
                onChange={(e) => inputValueHandler('contractId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="tokenId"
                name="tokenId"
                label="Token Id"
                fullWidth
                autoComplete="given-token-id"
                variant="standard"
                onChange={(e) => inputValueHandler('tokenId', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="userId"
                name="userId"
                label="User ID"
                fullWidth
                autoComplete="given-user-id"
                variant="standard"
                onChange={(e) => inputValueHandler('userId', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="ipfsUri"
                name="ipfsUri"
                label="IPFS URI"
                fullWidth
                autoComplete="given-ipfs-uri"
                variant="standard"
                onChange={(e) => inputValueHandler('ipfsUri', e.target.value)}
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

export default CreateTicketModal;
