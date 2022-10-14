/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from '../../utils/network';

export interface createTicketProviderEncryptionKeyInterface {
  ticketProviderId: number;
  secretKey: string;
  version: number;
}

interface getTicketProviderEncryptionKeyParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
  ticketProviderId?: string;
}

export const getTicketProviderEncryptionKey = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  ticketProviderId,
}: getTicketProviderEncryptionKeyParams) => {
  let params: { [key: string]: any } = {};

  params.limit = limit;

  afterCursor ? (params.afterCursor = afterCursor) : '';
  beforeCursor ? (params.beforeCursor = beforeCursor) : '';
  searchText ? (params.searchText = searchText) : '';
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? (params.ticketProviderId = ticketProviderId) : '';

  const response = await network.get({
    path: `/ticket-provider-encryption-keys`,
    options: {
      params,
    },
  });
  return response.data;
};

export const createTicketProviderEncryptionKey = async (data: createTicketProviderEncryptionKeyInterface) => {
  const response = await network.post(`/ticket-provider-encryption-keys`, data);
  return response.data;
};
