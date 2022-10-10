import network from "../../utils/network";

export interface getTicketProviderInterface {
  data?: any
}

export const getTicketProviders = async () => {
  const response = await network.get(`/ticket-providers`);
  return response.data;
}