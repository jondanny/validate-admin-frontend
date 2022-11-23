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
}

export const getUsers = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  ticketProviderId,
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

  const response = await network.get({
    path: `/users`,
    options: {
      params,
    },
  });
  return response?.data;
};

export const createUser = async (data: createUserInterface) => {
  const response = await network.post(`/users`, data);
  return response?.data;
};

export const updateUser = async (data: createUserInterface, userId: string) => {
  const response = await network.patch(`/users/${userId}`, data);
  return response?.data;
};

export const deleteUser = async (id: string) => {
  const response = await network.delete(`/users/${id}`);
  return response?.data;
};

export const getTicketProviders = async () => {
  const response = await network.get({
    path: `/ticket-providers/get-all`,
  });
  return response?.data;
};
