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
  uuid?: string;
}

interface CreateTicketModalProps {
  title: string;
  openModal: boolean;
  closeModal: () => any;
  submitForm: () => any;
  inputValueHandler: (field: string, value: string) => any;
  newUserHandler?: (value: boolean) => any;
  ticketProviders?: any;
  events?: any;
  newUser?: any;
  newUserChangeHandler?: (field: string, value: string | number) => any;
  saleEnableChangeHandler: (field: string, value: string) => any;
  resaleEnableChangeHandler: (field: string, value: string) => void
  saleEnabled?: any;
  reSaleEnabled?: any;
  saleEnabledHandler: (value: boolean) => any;
  resaleEnabledHandler: (value: boolean) => void;
  currencies?: any;
}

const CreateTicketTypeModal: React.FC<CreateTicketModalProps> = ({
  title,
  openModal,
  closeModal,
  submitForm,
  inputValueHandler,
  events,
  saleEnabled,
  reSaleEnabled,
  saleEnabledHandler,
  saleEnableChangeHandler,
  resaleEnabledHandler,
  resaleEnableChangeHandler,
  currencies
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
              control={<Switch color="primary" onChange={(e) => resaleEnabledHandler(e.target.checked)} />}
              label={<strong>Resale Enable</strong>}
              labelPlacement="start"
              style={{ display: 'flex' }}
            />
            <FormControlLabel
              value="start"
              control={<Switch color="primary" onChange={(e) => saleEnabledHandler(e.target.checked)} />}
              label={<strong>Sale Enable</strong>}
              labelPlacement="start"
              style={{ display: 'flex' }}
            />
          </SwitchesDiv>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={events}
                getOptionLabel={(option: optionType) => option.name}
                autoComplete
                includeInputInList
                onChange={(e: any, newValue: optionType | null) => {
                  inputValueHandler('eventId', newValue ? `${newValue?.uuid}` : '');
                }}
                renderInput={(params) => <TextField {...params} label="Event *" fullWidth variant="standard" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="ticketType"
                name="type"
                label="Ticket Type"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => inputValueHandler('type', e.target.value)}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ticket Start Date*"
                  value={dateStart}
                  onChange={(newValue: Dayjs | null) => {
                    setDateStart(newValue);
                    inputValueHandler('dateStart', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ticket End Date"
                  value={dateEnd}
                  onChange={(newValue: Dayjs | null) => {
                    setDateEnd(newValue);
                    inputValueHandler('dateEnd', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>


          <div style={{ display: saleEnabled.saleEnabled ? 'block' : 'none' }}>
            <Divider />

            <ModalSubTitle>Sale Enable Data</ModalSubTitle>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="saleAmountPrice"
                  name="saleAmountPrice"
                  label="Sale Amount"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(e) => saleEnableChangeHandler('sale_amount', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={currencies}
                  getOptionLabel={(option: optionType) => option.name}
                  autoComplete
                  includeInputInList
                  onChange={(e: any, newValue: optionType | null) => {
                    saleEnableChangeHandler('sale_currency', newValue ? `${newValue?.uuid}` : '');
                  }}
                  renderInput={(params) => <TextField {...params} label="Sale Currency *" fullWidth variant="standard" />}
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
                    saleEnableChangeHandler('sale_start_date', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
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


          <div style={{ display: reSaleEnabled.resaleEnabled ? 'block' : 'none' }}>
            <Divider />

            <ModalSubTitle>Re-Sale Enable Data</ModalSubTitle>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="resaleMaxAmount"
                  name="resaleMaxAmount"
                  label="Re-Sale Max Amount"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(e) => resaleEnableChangeHandler('max_amount', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="resaleMinAmount"
                  name="resaleMinAmount"
                  label="Re-Sale Min Amount"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(e) => resaleEnableChangeHandler('min_amount', e.target.value)}
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
                    resaleEnableChangeHandler('resale_start_date', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
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
                    resaleEnableChangeHandler('resale_end_date', newValue !== null ? newValue.format('YYYY-MM-DD') : '');
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={3} >
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={currencies}
                  getOptionLabel={(option: optionType) => option.name}
                  autoComplete
                  includeInputInList
                  onChange={(e: any, newValue: optionType | null) => {
                    resaleEnableChangeHandler('resale_currency', newValue ? `${newValue?.uuid}` : '');
                  }}
                  renderInput={(params) => <TextField {...params} label="Re-Sale Currency *" fullWidth variant="standard" />}
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

export default CreateTicketTypeModal;
