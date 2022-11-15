/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from '../../utils/network';

export interface createTicketInterface {
  name: string;
  ticketProviderId: number;
  userId: number;
  imageUrl: string | null;
}

interface getTicketParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
  ticketProviderId?: string;
}

export const getTickets = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  ticketProviderId,
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

  const response = await network.get({
    path: `/tickets`,
    options: {
      params,
    },
  });
  return response.data;
};

export const createTicketService = async (data: createTicketInterface) => {
  const response = await network.post(`/tickets`, data);
  return response.data;
};

export const deleteTicket = async (id: string) => {
  const response = await network.delete(`/tickets/${id}`);
  return response.data;
};
