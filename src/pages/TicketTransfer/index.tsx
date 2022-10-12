import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable/index';
import Title from '../../components/Title/index';
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import {
  getTicketTranser,
} from '../../services/app/ticket-transfer-service'
import { columns } from './table-columns';

const PageContent = styled('div')(({ theme }) => ({
  marginBottom: '3rem',
}));

export interface DashboardProps {}

const TicketProviderApiToken: FC<DashboardProps> = () => {
  const [ticketTransfer, setTicketTransfer] = useState({
    data: [],
    cursor: {
      afterCursor: "",
      beforeCursor: ""
    },
  });
  const [currentCursor, setCurrentCursor] = useState({
    name: "",
    value: ""
  })
  
  const [tableSize, setTableSize] = useState({
    default: 5,
    list: [5, 10, 25]
  })

  const query = useQuery(['ticket_providers', tableSize.default, currentCursor.value], () => getTicketTranser({limit: tableSize.default, afterCursor: currentCursor.name === "next" ? currentCursor.value : "" , beforeCursor: currentCursor.name === "previuous" ? currentCursor.value : ""}), {
    onSuccess: (data) => {
        setTicketTransfer(data);
    },
    refetchOnWindowFocus: true
  });


  const pageSizeHandler = (pageSize: number) => {
    setTableSize({
      ...tableSize,
      default: pageSize
    })
    query.refetch()
  }

  const changePageHandler = (changePage: string) => {
    const { cursor } = ticketTransfer || {}
    const { afterCursor, beforeCursor } = cursor || {}
    if(changePage === "go_back" && beforeCursor !== ""){
      setCurrentCursor({
        name: "previous",
        value: beforeCursor
      })
    }else {
      if(afterCursor !== ""){
        setCurrentCursor({
          name: "next",
          value: afterCursor
        })
      }
    }
    query.refetch()
  }

  return (
    <>
      <PageContent>
        <Title title="Ticket Transfer" />
      </PageContent>
      <DataTable
        data={ticketTransfer?.data.length ? ticketTransfer : []}
        columns={columns}
        buttonText="Create"
        pageSizeChangeHandler={(pageSize: number) => pageSizeHandler(pageSize)}
        tableSize={tableSize}
        changePageHandler={changePageHandler}
      />
      <ToastContainer />
    </>
  );
};

export default TicketProviderApiToken;
