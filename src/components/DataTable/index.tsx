import React, { FC, useState } from 'react';
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
  ticketProviders?: any;
  ticketProvideFilterValue?: string;
}

const DataTable: FC<DataTableProps> = ({
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
}) => {
  const [searchedValue, setSearchedValue] = useState('');

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
                defaultValue={''}
                labelId="ticketProvider"
              >
                {ticketProviders?.map((provider: any) => {
                  return <MenuItem value={provider.id}>{provider.name}</MenuItem>;
                })}
              </Select>
            </TicketProviderFilter>
          )}
        </Filters>
        {buttonText && (
          <Button variant="contained" color="primary" onClick={createClickHandler}>
            {buttonText}
          </Button>
        )}
      </TableFilters>
      <TableContainer sx={{ maxHeight: 440 }} style={{ width: '97vw' }}>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column: any) => {
                    const value = column?.name ? row[column.id]?.name || 'N/A' : row[column.id] || 'N/A';
                    return (
                      <>
                        <TableCell
                          style={{ position: 'sticky', right: 0, backgroundColor: 'white' }}
                          key={column.id}
                          align={column.align}
                        >
                          {!value && value !== null ? (
                            <ButtonGroup size="small">
                              <IconButton style={{ padding: '0.5rem' }} onClick={() => deleteHandler?.(row.id)}>
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                              {updateAble && (
                                <IconButton style={{ padding: '0.5rem' }} onClick={() => editRecordHandler?.(row.id)}>
                                  <EditIcon fontSize="inherit" />
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
      <PaginationDiv>
        <Pagination
          pageSizeChangeHandler={(value: number) => pageSizeChangeHandler?.(value)}
          tableSize={tableSize}
          changePageHandler={(changePage: string) => changePageHandler?.(changePage)}
          cursors={data.cursor}
        />
      </PaginationDiv>
    </>
  );
};

export default DataTable;
