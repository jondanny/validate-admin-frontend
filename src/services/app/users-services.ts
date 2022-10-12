import network from "../../utils/network";

export interface createTicketProviderInterface {
  name: string,
  email: string,
  ticketProviderId: number
  phoneNumber: string
  status?: string
}

interface getTicketProviderParams {
  limit?: number,
  afterCursor?: string
  beforeCursor?: string
  searchText?: string
}

export const getUsers = async ({ limit, afterCursor, beforeCursor, searchText }: getTicketProviderParams) => {
  const response = await network.get({path: `/users`, options: {
    params: {
      limit,
      afterCursor,
      beforeCursor,
      searchText
    }
  }});
  return response.data;
}

export const createUser = async (data: createTicketProviderInterface) => {
  const response = await network.post(`/users`, data);
  return response.data
}

export const updateUser = async (data: createTicketProviderInterface, userId: string) => {
  const response = await network.patch(`/users/${userId}`, data);
  return response.data
}

export const deleteUser = async(id: string) => {
  const response = await network.delete(`/users/${id}`);
  return response.data;
}

export const getTicketProviders = async () => {
  const response = await network.get({path: `/ticket-providers/get-all`});
  return response.data;
}