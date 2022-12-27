/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from '../../utils/network';

export interface createTicketInterface {
  name: string;
  ticketProviderId: number;
  userId?: number;
  imageUrl?: string | null;
  newUserName?: string;
  newUserEmail?: string;
  newUserPhoneNumber?: string;
}

interface getTicketParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
  ticketProviderId?: string;
  location?: any
}

export interface retryMintingTicketInterface {
  userId: number;
  ticketId: number;
  ticketProviderId: number
}

export const getTickets = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  ticketProviderId,
  location
}: getTicketParams) => {
  let params: { [key: string]: any } = {};

  params.limit = limit;

  afterCursor ? (params.afterCursor = afterCursor) : '';
  beforeCursor ? (params.beforeCursor = beforeCursor) : '';
  searchText ? (params.searchText = searchText) : '';
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? (params.ticketProviderId = ticketProviderId) : '';

  afterCursor ? (params.afterCursor = afterCursor) : '';
  beforeCursor ? (params.beforeCursor = beforeCursor) : '';
  searchText ? (params.searchText = searchText) : '';
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? (params.ticketProviderId = ticketProviderId) : '';

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.get({
    path: `/${path}/tickets`,
    options: {
      params,
    },
  });
  return response?.data;
};

export const createTicketService = async (data: createTicketInterface, location: any) => {

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.post(`/${path}/tickets`, data);
  return response?.data;
};

export const deleteTicket = async (id: string, location: any) => {

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.delete(`/${path}/tickets/${id}`);
  return response?.data;
};


export const retryTicketMinting = async (obj: retryMintingTicketInterface, location: any) => {

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.post(`/${path}tickets/retry-minting`, obj)
  return response?.data;
}