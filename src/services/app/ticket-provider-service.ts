import network from "../../utils/network";

export interface createTicketProviderInterface {
  name: string,
  email: string
}

interface getTicketProviderParams {
  limit?: number,
  afterCursor?: string
  beforeCursor?: string
  searchText?: string
}

export const getTicketProviders = async ({ limit, afterCursor, beforeCursor, searchText }: getTicketProviderParams) => {
  const response = await network.get({path: `/ticket-providers`, options: {
    params: {
      limit,
      afterCursor,
      beforeCursor,
      searchText
    }
  }});
  return response?.data;
}

export const createTicketProviderService = async (data: createTicketProviderInterface) => {
  const response = await network.post(`/ticket-providers`, data);
  return response?.data
}

export const deleteTicketProvider = async (id: string) => {
  const response = await network.delete(`/ticket-providers/${id}`);
  return response?.data;
}