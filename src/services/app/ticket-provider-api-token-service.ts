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
}

export const getTicketProviderApiToken = async ({
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

  const response = await network.get({
    path: `/ticket-provider-api-tokens`,
    options: {
      params,
    },
  });
  return response?.data;
};

export const createTicketProviderApiToken = async (data: createTicketProviderInterface) => {
  const response = await network.post(`/ticket-provider-api-tokens`, data);
  return response?.data;
};

export const updateTicketProviderApiToken = async (data: createTicketProviderInterface, userId: string) => {
  const response = await network.patch(`/users/${userId}`, data);
  return response?.data;
};

export const deleteTicketProviderApiToken = async (id: string) => {
  const response = await network.delete(`/ticket-provider-api-tokens/${id}`);
  return response?.data;
};
