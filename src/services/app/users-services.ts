/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from '../../utils/network';

export interface createUserInterface {
  name: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
  ticketProviderId: number;
  status: 'creating' | 'active' | '';
}

interface getTicketProviderParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
  ticketProviderId?: string;
  location?: any
}

export const getUsers = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  ticketProviderId,
  location
}: getTicketProviderParams) => {
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
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({
    path: `/${path}/users`,
    options: {
      params,
    },
  });
  return response?.data;
};

export const createUser = async (data: createUserInterface, location: any) => {

  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.post(`/${path}/users`, data);
  return response?.data;
};

export const updateUser = async (data: createUserInterface, userId: string, location: any) => {

  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.patch(`/${path}/users/${userId}`, data);
  return response?.data;
};

export const deleteUser = async (id: string, location: any) => {
  
  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.delete(`/${path}/users/${id}`);
  return response?.data;
};

export const getTicketProviders = async (location: any) => {

  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({
    path: `/${path}/ticket-providers/get-all`,
  });
  return response?.data;
};
