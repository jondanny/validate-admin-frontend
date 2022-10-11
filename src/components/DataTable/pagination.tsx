import React, { FC, useState } from 'react'
import { IconButton, ButtonGroup, Typography, Select, MenuItem } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

const PaginationMain = styled('h2')(({ theme }) => ({
  display: "flex",
  marginTop: 0
}))
const PaginatedButtons = styled('div')(({ theme }) => ({
  textAlign: "center"
}))

const RowSelectionDiv = styled('div')(({ theme }) => ({
  display: 'flex',
}))

interface PaginationProps {
  pageSizeChangeHandler?: (value: number) => void
  tableSize: any
  changePageHandler: (changePage: string) => void
  cursors: {
    beforeCursor: string | null,
    afterCursor: string | null
  }
}

const Pagination: FC<PaginationProps> = ({ pageSizeChangeHandler, tableSize, changePageHandler, cursors }) => {

  return (
    <PaginationMain>
      <RowSelectionDiv>
        <Typography component="strong" style={{padding: '0.5rem 0.6rem 0 0 '}}>
          Rows per page:
        </Typography>
        <Select
          id="demo-select-small"
          value={tableSize.default}
          label="Age"
          onChange={(e) => pageSizeChangeHandler?.(e.target.value as number)}
          size="small"
        >
          {
            tableSize.list.map((size: number) => {
              return (
                <MenuItem value={size}>{size}</MenuItem>
              )
            })
          }

        </Select>
      </RowSelectionDiv>

      <PaginatedButtons>
        <ButtonGroup size='small'>
          <IconButton onClick={() => changePageHandler("go_back")} disabled={cursors?.beforeCursor == null || cursors?.beforeCursor == ""}>
            <ArrowBackIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={() => changePageHandler("go_forward")} disabled={(cursors?.afterCursor == null || cursors?.afterCursor == "")}>
            <ArrowForwardIcon fontSize='small' />
          </IconButton>
        </ButtonGroup>
      </PaginatedButtons>

    </PaginationMain>

  )

}

export default Pagination