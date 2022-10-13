import network from '../../utils/network';

export interface createTicketInterface {
  name: string;
  ticketProviderId: number;
  contractId: string;
  tokenId: number;
  userId: number;
  imageUrl: string;
  ipfsUri: string;
}

interface getTicketParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
}

export const getTickets = async ({ limit, afterCursor, beforeCursor, searchText }: getTicketParams) => {
  const response = await network.get({
    path: `/tickets`,
    options: {
      params: {
        limit,
        afterCursor,
        beforeCursor,
        searchText,
      },
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
