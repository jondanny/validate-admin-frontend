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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Pagination from './pagination';

const TableFilters = styled('div')(({ theme }) => ({
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
}));

const PaginationDiv = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'flex-end',
}));

interface PaginationProps {
  default: number,
  list: number[]
}

interface DataTableProps {
  data: any;
  columns: any;
  deleteHandler: (id: string) => void;
  createClickHandler?: () => any;
  buttonText?: string;
  searchHandler?: (searchText: string) => void;
  pageSizeChangeHandler?: (pageSize: number) => void,
  tableSize?: PaginationProps
  changePageHandler?: (changePage: string) => void
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
}) => {
  const [searchedValue, setSearchedValue] = useState('');

  return (
    <>
      <TableFilters>
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
        {buttonText && (
          <Button variant="contained" color="primary" onClick={createClickHandler}>
            {buttonText}
          </Button>
        )}
      </TableFilters>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
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
                    const value = row[column.id];
                    return (
                      <>
                        <TableCell key={column.id} align={column.align}>
                          {!value ? (
                            <IconButton onClick={() => deleteHandler(row.id)}>
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value
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
          cursors= {data.cursor}
        />
      </PaginationDiv>
    </>
  );
};

export default DataTable;
