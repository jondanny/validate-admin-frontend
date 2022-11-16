import network from "../../utils/network";

interface getEventsParams {
  limit?: number,
  ticketProviderId?: string

}

export const getEvents = async ( { limit, ticketProviderId }: getEventsParams ) => {
  let params: { [key: string]: any } = {};
  params.limit = limit;
  ticketProviderId && (params.ticketProviderId = ticketProviderId)

  const response = await network.get({
    path: `/events`,
    options: {
      params,
    },
  });
  return response.data;
}

export const getTicketProviders = async () => {
  const response = await network.get({
    path: `/ticket-providers/get-all`,
  });
  return response.data;
};