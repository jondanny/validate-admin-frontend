import React, { useState } from 'react';
import { Autocomplete, Box, Button, Grid, Modal, TextField, Switch, FormControlLabel, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

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

const SwitchesDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end'
}))

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
  newUser: any;
  newUserChangeHandler: (field: string, value: string | number) => any;
  saleEnableChangeHandler: (field: string, value: string | number) => any;
  saleEnabled: any;
  saleEnabledHandler: (value: boolean) => any;
  ticketData: any
}

const UpdateTicketModal: React.FC<CreateTicketModalProps> = ({
  title,
  openModal,
  closeModal,
  submitForm,
  inputValueHandler,
  ticketProviders,
  users,
  newUserHandler,
  newUser,
  newUserChangeHandler,
  saleEnabled,
  saleEnabledHandler,
  saleEnableChangeHandler,
  ticketData,
}) => {
  const [dateStart, setDateStart] = useState<Dayjs | null>(dayjs(new Date()));
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(dayjs(new Date()));

  const [saleEnabledateStart, setSaleEnableDateStart] = useState<Dayjs | null>(dayjs(new Date()));
  const [saleEnabledateEnd, setSaleEnableDateEnd] = useState<Dayjs | null>(dayjs(new Date()));
  return (
    <>
      <Modal open={openModal} onClose={closeModal} aria-labelledby="modal-title">
        <Box sx={style}>
          <ModalTitle id="modal-title">{title}</ModalTitle>
          <SwitchesDiv>
            <FormControlLabel
              value="start"
              control={<Switch color="primary" onChange={(e) => saleEnabledHandler(e.target.checked)} />}
              label={<strong>Re-Sale Enable</strong>}
              labelPlacement="start"
              style={{ display: 'flex' }}
            />
          </SwitchesDiv>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="eventName"
                name="eventName"
                label="Event Name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => saleEnableChangeHandler('event_name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="ticketType"
                name="type"
                label={"Ticket Type"}
                fullWidth
                defaultValue={ticketData?.ticket_type?.name ? ticketData?.ticket_type?.name: ''}
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => saleEnableChangeHandler('ticket_type_name', e.target.value)}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disabled={ticketData?.user?.name}
                options={users}
                getOptionLabel={(option: optionType) => option.name}
                autoComplete
                includeInputInList
                onChange={(e: any, newValue: optionType | null) => {
                  inputValueHandler('userId', newValue ? newValue?.id : 0);
                }}
                renderInput={(params) => <TextField {...params} label={ticketData?.user?.name? ticketData?.user?.name : "User *"} fullWidth variant="standard" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={ticketProviders.filter((provider: any) => provider.id)}
                getOptionLabel={(option: optionType) => option.name}
                autoComplete
                includeInputInList
                disabled={ticketData?.ticketProvider?.name}
                onChange={(e: any, newValue: optionType | null) => {
                  inputValueHandler('ticketProviderId', newValue ? newValue?.id : 0);
                }}
                renderInput={(params) => (
                  <TextField {...params} label={ticketData?.ticketProvider?.name ? ticketData?.ticketProvider?.name : "Ticket Provider *"} fullWidth variant="standard" />
                )}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date*"
                  value={ticketData?.ticket_type?.ticketDateStart ? ticketData?.ticket_type?.ticketDateStart :dateStart}
                  onChange={(newValue: Dayjs | null) => {
                    setDateStart(newValue);
                    inputValueHandler('dateStart', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
                  }}
                  disabled={ticketData?.ticket_type?.ticketDateStart}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={ticketData?.ticket_type?.ticketDateEnd ? ticketData?.ticket_type?.ticketDateEnd :dateEnd}
                  onChange={(newValue: Dayjs | null) => {
                    setDateEnd(newValue);
                    inputValueHandler('dateEnd', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
                  }}
                  disabled={ticketData?.ticket_type?.ticketDateEnd}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="imageUrl"
                name="imageUrl"
                label={ticketData?.imageUrl ? ticketData?.imageUrl :"Image URL"}
                fullWidth
                disabled={ticketData?.imageUrl}
                autoComplete="given-image-url"
                variant="standard"
                onChange={(e) => inputValueHandler('imageUrl', e.target.value)}
              />
            </Grid>
          </Grid>


          <div style={{ display: saleEnabled.saleEnable ? 'block' : 'none' }}>
            <Divider />

            <ModalSubTitle>Re-Sale Enable Data</ModalSubTitle>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="reSaleMinAmountPrice"
                  name="saleAmountPrice"
                  label="Re-Sale Min Price"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  defaultValue={newUser?.userFieldsValues?.amount || ''}
                  onChange={(e) => saleEnableChangeHandler('min_amount', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="saleAmountPrice"
                  name="saleAmountPrice"
                  label="Re-Sale Max Price"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  defaultValue={newUser?.userFieldsValues?.amount || ''}
                  onChange={(e) => saleEnableChangeHandler('max_amount', e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={3}>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date*"
                  value={saleEnabledateStart}
                  onChange={(newValue: Dayjs | null) => {
                    setSaleEnableDateStart(newValue);
                    saleEnableChangeHandler('start_date', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date*"
                  value={saleEnabledateEnd}
                  onChange={(newValue: Dayjs | null) => {
                    setSaleEnableDateEnd(newValue);
                    saleEnableChangeHandler('end_date', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              </Grid>
            </Grid>
          </div>

          <ButtonDiv>
            <Button variant="contained" onClick={closeModal} sx={{ mt: 3, ml: 1 }} color="inherit">
              Close
            </Button>
            <Button variant="contained" onClick={submitForm} sx={{ mt: 3, ml: 1 }} color="primary">
              Update
            </Button>
          </ButtonDiv>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateTicketModal;
