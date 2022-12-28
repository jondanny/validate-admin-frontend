/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from '../../utils/network';

export interface createTicketProviderInterface {
  token: string;
  ticketProviderId: number;
}

interface getTicketProviderParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
  ticketProviderId?: string;
  location?: any
}

export const getTicketProviderApiToken = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  ticketProviderId,
  location,
}: getTicketProviderParams) => {
  let params: { [key: string]: any } = {};

  params.limit = limit;

  afterCursor ? (params.afterCursor = afterCursor) : '';
  beforeCursor ? (params.beforeCursor = beforeCursor) : '';
  searchText ? (params.searchText = searchText) : '';
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? (params.ticketProviderId = ticketProviderId) : '';

  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({
    path: `/${path}/ticket-provider-api-tokens`,
    options: {
      params,
    },
  });
  return response?.data;
};

export const createTicketProviderApiToken = async (data: createTicketProviderInterface, location: any) => {
  
  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.post(`/${path}/ticket-provider-api-tokens`, data);
  return response?.data;
};

export const updateTicketProviderApiToken = async (data: createTicketProviderInterface, userId: string, location: any) => {
  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }
  
  const response = await network.patch(`/${path}/users/${userId}`, data);
  return response?.data;
};

export const deleteTicketProviderApiToken = async (id: string, location: any) => {
  
  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.delete(`/${path}/ticket-provider-api-tokens/${id}`);
  return response?.data;
};
