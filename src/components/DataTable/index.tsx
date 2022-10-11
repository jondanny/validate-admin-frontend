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
  ButtonGroup
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
  changePageHandler?: (changePage: string) => void,
  updateAble?: boolean
  editRecordHandler?: (id: string) => void
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
  editRecordHandler
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
      <TableContainer sx={{ maxHeight: 440 }} style={{width: '97vw'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any, index: any) => (
                <TableCell style={index === columns.length - 1 ? { position: "sticky", right: 0, backgroundColor: "white" } : { minWidth: column.minWidth }} key={column.id} align={column.align}>
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
                        <TableCell style={{ position: "sticky", right: 0, backgroundColor: "white" }} key={column.id} align={column.align}>
                          {(!value && value !== null) ? (
                            <ButtonGroup size='small'>
                              <IconButton style={{padding: '0.5rem'}} onClick={() => deleteHandler(row.id)}>
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                              {updateAble && <IconButton style={{padding: '0.5rem'}} onClick={() => editRecordHandler?.(row.id)}>
                                <EditIcon fontSize="inherit" />
                              </IconButton>}
                            </ButtonGroup>
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value || "N/A"
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
