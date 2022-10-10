import React, { FC } from 'react'
import {  Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TablePagination, TableContainer } from '@mui/material';
import { columns, Column } from '../../utils/constants/table-columns'

interface DataTableProps {
  data: any
}

const DataTable: FC<DataTableProps> = ({ data }: DataTableProps) => {

  const pageChangeHandler = () => {

  }
  const rowsChangeHandler = () => {}

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: Column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                    {columns.map((column: Column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={0}
        rowsPerPage={10}
        page={1}
        onPageChange={pageChangeHandler}
        onRowsPerPageChange={rowsChangeHandler}
      />
    </>
  )

}

export default DataTable;