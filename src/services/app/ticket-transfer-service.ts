/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from "../../utils/network";

export interface createTicketTransferInterface {
  userId: string,
  ticketProviderId: string
  ticketId: number
}

interface getTickettransferParams {
  limit?: number,
  afterCursor?: string
  beforeCursor?: string
  ticketProviderId?: string
}

export const getTicketTranser = async ({ limit, afterCursor, beforeCursor, ticketProviderId }: getTickettransferParams) => {
  let params: {[key: string]: any} = {}

  params.limit = limit
  
  afterCursor ? params.afterCursor = afterCursor : ""
  beforeCursor ? params.beforeCursor = beforeCursor : ""
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? params.ticketProviderId = ticketProviderId : ""


  const response = await network.get({path: `/ticket-transfers`, options: {
    params
  }});
  return response.data;
}

export const createTicketTransfer = async (data: createTicketTransferInterface) => {
  const response = await network.post(`/ticket-transfers`, data);
  return response.data
}

export const getTicketProviders = async () => {
  const response = await network.get({path: `/ticket-providers/get-all`});
  return response.data;
}