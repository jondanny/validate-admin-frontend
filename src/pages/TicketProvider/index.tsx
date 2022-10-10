import React, { FC } from 'react';
import { useQuery } from 'react-query'
import { getTicketProviders } from '../../services/app/ticket-provider-service'
import DataTable from '../../components/DataTable/index'
import Title from '../../components/Title/index'

export interface DashboardProps {}

const TicketProvider: FC<DashboardProps> = () => {

  const query = useQuery(['ticket_providers'], getTicketProviders)

  return (
    <>
      <Title
        title="Ticket Provider"
      />
      <DataTable 
        data={query.data ? query.data : []}      
      />
    </>
  );
};

export default TicketProvider;
