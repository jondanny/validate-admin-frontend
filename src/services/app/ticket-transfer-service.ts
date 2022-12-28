/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from "../../utils/network";

export interface createTicketTransferInterface {
  userId: string,
  ticketProviderId: string
  ticketId: number
  location?: any
}

interface getTickettransferParams {
  limit?: number,
  afterCursor?: string
  beforeCursor?: string
  ticketProviderId?: string
  location?: any
}

export const getTicketTranser = async ({ limit, afterCursor, beforeCursor, ticketProviderId, location }: getTickettransferParams) => {
  let params: {[key: string]: any} = {}
  let path = 'validate-web-backend';
  const { pathname } = location

  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  params.limit = limit
  
  afterCursor ? params.afterCursor = afterCursor : ""
  beforeCursor ? params.beforeCursor = beforeCursor : ""
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? params.ticketProviderId = ticketProviderId : ""


  const response = await network.get({path: `/${path}/ticket-transfers`, options: {
    params
  }});
  return response?.data;
}

export const createTicketTransfer = async (data: createTicketTransferInterface) => {
  const response = await network.post(`/ticket-transfers`, data);
  return response?.data
}

export const getTicketProviders = async ({location}: any) => {
  let path = 'validate-web-backend';
  const { pathname } = location

  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({path: `/${path}/ticket-providers/get-all`});
  return response?.data;
}