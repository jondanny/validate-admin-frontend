/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from '../../utils/network';

export interface createTicketProviderEncryptionKeyInterface {
  ticketProviderId: number;
  location ?: any
}

interface getTicketProviderEncryptionKeyParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
  ticketProviderId?: string;
  location ?: any
}

export const getTicketProviderEncryptionKey = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  ticketProviderId,
  location
}: getTicketProviderEncryptionKeyParams) => {
  let params: { [key: string]: any } = {};

  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  params.limit = limit;

  afterCursor ? (params.afterCursor = afterCursor) : '';
  beforeCursor ? (params.beforeCursor = beforeCursor) : '';
  searchText ? (params.searchText = searchText) : '';
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? (params.ticketProviderId = ticketProviderId) : '';

  const response = await network.get({
    path: `/${path}/ticket-provider-encryption-keys`,
    options: {
      params,
    },
  });
  return response?.data;
};

export const createTicketProviderEncryptionKey = async (data: createTicketProviderEncryptionKeyInterface) => {
  
  const { pathname } = data.location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.post(`/${path}/ticket-provider-encryption-keys`, data);
  return response?.data;
};
