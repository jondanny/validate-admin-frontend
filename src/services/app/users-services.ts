/* eslint-disable @typescript-eslint/no-unused-expressions */
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
  ticketProviderId?: string
}

interface getParams {
  limit: any,
  afterCursor?: any,
  beforeCursor?: any,
  searchText?: any,
  ticketProviderId?: any
}

export const getUsers = async ({ limit, afterCursor, beforeCursor, searchText, ticketProviderId }: getTicketProviderParams) => {
  let params: {[key: string]: any} = {}

  params.limit = limit
  
  afterCursor ? params.afterCursor = afterCursor : ""
  beforeCursor ? params.beforeCursor = beforeCursor : ""
  searchText ? params.searchText = searchText : ""
  ticketProviderId ? params.ticketProviderId = ticketProviderId : "" 

  const response = await network.get({path: `/users`, options: {
    params
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