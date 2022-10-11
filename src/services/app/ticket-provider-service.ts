import network from "../../utils/network";

export interface createTicketProviderInterface {
  name: string,
  email: string
}

export const getTicketProviders = async () => {
  const response = await network.get(`/ticket-providers`);
  return response.data;
}

export const createTicketProviderService = async (data: createTicketProviderInterface) => {
  const response = await network.post(`/ticket-providers`, data);
  return response.data
}

export const deleteTicketProvider = async (id: string) => {
  const response = await network.delete(`/ticket-providers/${id}`);
  return response.data;
}