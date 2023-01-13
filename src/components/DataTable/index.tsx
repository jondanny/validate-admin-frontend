import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  Button,
  TextField,
  ButtonGroup,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import { styled } from '@mui/material/styles';
import Pagination from './pagination';

const TableFilters = styled('div')(({ theme }) => ({
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
}));

const Filters = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
}));

const TicketProviderFilter = styled('div')(({ theme }) => ({
  marginTop: '-1.5rem',
}));

const PaginationDiv = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'flex-end',
}));

interface PaginationProps {
  default: number;
  list: number[];
}

interface DataTableProps {
  data: any;
  columns: any;
  deleteHandler?: (id: string) => void;
  createClickHandler?: () => any;
  buttonText?: string;
  searchHandler?: (searchText: string) => void;
  pageSizeChangeHandler?: (pageSize: number) => void;
  tableSize?: PaginationProps;
  changePageHandler?: (changePage: string) => void;
  updateAble?: boolean;
  editRecordHandler?: (id: string) => void;
  tickProviderHandler?: (ticketProviderId: string) => void;
  eventsHandler?: (eventUuid: string) => void;
  ticketProviders?: any;
  ticketProvideFilterValue?: string;
  retryButtonClickHandler?: (data: any) => void;
  eventsFilterValue?: string;
  events?: any;
  rowClickHandler?: (row: any) => void;
  inputChangeHandler?: (field: string, marketType: any) => void;
  orderValues?: any
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  deleteHandler,
  columns,
  createClickHandler,
  buttonText,
  searchHandler,
  pageSizeChangeHandler,
  tableSize,
  changePageHandler,
  updateAble,
  editRecordHandler,
  tickProviderHandler,
  ticketProviders,
  ticketProvideFilterValue,
  retryButtonClickHandler,
  eventsHandler,
  eventsFilterValue,
  events,
  rowClickHandler,
  inputChangeHandler,
  orderValues
}) => {
  const [searchedValue, setSearchedValue] = useState('');
  const [buyerInputValue, setBuyerInputValue] = useState('');

  const rowClicked = (row: any) => {
    if(rowClickHandler){
      rowClickHandler(row);
    }
    return;
  }
  return (
    <>
      <TableFilters>
        <Filters>
          {searchHandler && (
            <TextField
              label="Name"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
              value={searchedValue}
              onChange={(e) => {
                setSearchedValue(e.target.value);
                searchHandler(e.target.value);
              }}
            />
          )}
          {inputChangeHandler && (
            <>
              <TextField
                label="Buyer Email/PhoneNumber"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                style={{width: '12rem'}}
                value={buyerInputValue}
                onChange={(e) => {
                  setBuyerInputValue(e.target.value);
                  inputChangeHandler('buyer_input_value', e.target.value);
                }}
              />
              <TextField
                label="Payment Id"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                style={{marginLeft: '1.5rem'}}
                value={searchedValue}
                onChange={(e) => {
                  setSearchedValue(e.target.value);
                  inputChangeHandler('payment_id', e.target.value);
                }}
              />
            </>
          )}
          {tickProviderHandler && ticketProviders && (
            <TicketProviderFilter>
              <InputLabel id="ticketProvider" style={{ marginLeft: '2rem' }}>
                Ticket Provider
              </InputLabel>
              <Select
                value={ticketProvideFilterValue}
                onChange={(e) => tickProviderHandler(e.target.value as string)}
                style={{ marginLeft: '2rem', width: '11rem' }}
                size="small"
                defaultValue="All"
                labelId="ticketProvider"
              >
                {ticketProviders?.map((provider: any) => {
                  return <MenuItem value={provider.id}>{provider.name}</MenuItem>;
                })}
              </Select>
            </TicketProviderFilter>
          )}
          {eventsHandler && events && (
            <TicketProviderFilter>
              <InputLabel id="events" style={{ marginLeft: '2rem' }}>
                Events
              </InputLabel>
              <Select
                value={eventsFilterValue}
                onChange={(e) => eventsHandler(e.target.value as string)}
                style={{ marginLeft: '2rem', width: '11rem' }}
                size="small"
                defaultValue="All"
                labelId="events"
              >
                {events?.map((event: any) => {
                  return <MenuItem value={event.uuid}>{event.name}</MenuItem>;
                })}
              </Select>
            </TicketProviderFilter>
          )}
          {
            inputChangeHandler && orderValues.marketType && (
              <TicketProviderFilter>
                <InputLabel id="events" style={{ marginLeft: '2rem' }}>
                  MarketType
                </InputLabel>
                <Select
                  value={eventsFilterValue}
                  onChange={(e) => inputChangeHandler('market_type', e.target.value as string)}
                  style={{ marginLeft: '2rem', width: '11rem' }}
                  size="small"
                  defaultValue="All"
                  labelId="events"
                >
                  {orderValues?.marketType?.map((market: any) => {
                    return <MenuItem value={market}>{market}</MenuItem>;
                  })}
                </Select>
              </TicketProviderFilter>
            )
          }
          {
            inputChangeHandler && orderValues.orderStatus && (
              <TicketProviderFilter>
                <InputLabel id="events" style={{ marginLeft: '2rem' }}>
                  Order Status
                </InputLabel>
                <Select
                  value={eventsFilterValue}
                  onChange={(e) => inputChangeHandler('order_status', e.target.value as string)}
                  style={{ marginLeft: '2rem', width: '11rem' }}
                  size="small"
                  defaultValue="All"
                  labelId="events"
                >
                  {orderValues?.orderStatus?.map((status: any) => {
                    return <MenuItem value={status}>{status}</MenuItem>;
                  })}
                </Select>
              </TicketProviderFilter>
            )
          }
          {
            inputChangeHandler && orderValues.paymentExternalStatus && (
              <TicketProviderFilter>
                <InputLabel id="events" style={{ marginLeft: '2rem' }}>
                  Payment Status
                </InputLabel>
                <Select
                  value={eventsFilterValue}
                  onChange={(e) => inputChangeHandler('payment_external_status', e.target.value as string)}
                  style={{ marginLeft: '2rem', width: '11rem' }}
                  size="small"
                  defaultValue="All"
                  labelId="events"
                >
                  {orderValues?.paymentExternalStatus?.map((paymentStatus: any) => {
                    return <MenuItem value={paymentStatus}>{paymentStatus}</MenuItem>;
                  })}
                </Select>
              </TicketProviderFilter>
            )
          }
        </Filters>
        {buttonText && (
          <Button variant="contained" color="primary" onClick={createClickHandler}>
            {buttonText}
          </Button>
        )}
      </TableFilters>
      <TableContainer sx={{ maxHeight: 1440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any, index: any) => (
                <TableCell
                  style={
                    index === columns.length - 1
                      ? { position: 'sticky', right: 0, backgroundColor: 'white' }
                      : { minWidth: column.minWidth }
                  }
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => rowClicked(row)}>
                  {columns.map((column: any) => {
                    let value = column?.name
                      ? row[column.id]?.name || row?.event?.name || row?.payment?.externalStatus || 'N/A'
                      : column.id === 'delete' || column.id === 'update' || column.id === 'delete/update'
                      ? column.id
                      : row[column.id] || 'N/A';
                    return (
                      <>
                        <TableCell
                          style={{ position: 'sticky', right: 0, backgroundColor: 'white' }}
                          key={column.id}
                          align={column.align}
                        >
                          {typeof value === 'string' && (value.includes('delete') || value.includes('update')) ? (
                            <ButtonGroup size="small">
                              {value.includes('delete') && (
                                <IconButton style={{ padding: '0.5rem' }} onClick={() => deleteHandler?.(row.id)}>
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton>
                              )}
                              {value.includes('update') && (
                                <IconButton style={{ padding: '0.5rem' }} onClick={() => editRecordHandler?.(row)}>
                                  <EditIcon fontSize="inherit" />
                                </IconButton>
                              )}
                              {row?.errorData && retryButtonClickHandler && (
                                <IconButton onClick={() => retryButtonClickHandler({userId: row?.userId, ticketId: row?.id, ticketProviderId: row?.ticketProviderId})}>
                                  <ReplayIcon fontSize="inherit"/>
                                </IconButton>
                              )}
                            </ButtonGroup>
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value || 'N/A'
                          )}
                        </TableCell>
                      </>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      { tableSize &&  <PaginationDiv>
        <Pagination
          pageSizeChangeHandler={(value: number) => pageSizeChangeHandler?.(value)}
          tableSize={tableSize}
          changePageHandler={(changePage: string) => changePageHandler?.(changePage)}
          cursors={data.cursor}
        />
      </PaginationDiv>}
    </>
  );
};

export default DataTable;
