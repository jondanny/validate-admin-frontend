import network from '../../utils/network';

export interface createTicketProviderInterface {
  name: string;
  email: string;
}

interface getTicketProviderParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
  location?: any;
}

export const getTicketProviders = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  location,
}: getTicketProviderParams) => {
  const { pathname } = location;
  let path = 'validate-web-backend';
  if (pathname.split('/').includes('validate-backend')) {
    path = 'validate-admin-backend';
  }

  // const response = await network.get({path: `/${path}/ticket-providers`, options: {
  const response = await network.get({
    path: `/ticket-providers`,
    options: {
      params: {
        limit,
        afterCursor,
        beforeCursor,
        searchText,
      },
    },
  });
  return response?.data;
};

export const createTicketProviderService = async (data: createTicketProviderInterface, location: any) => {
  const { pathname } = location;
  let path = 'validate-web-backend';
  if (pathname.split('/').includes('validate-backend')) {
    path = 'validate-admin-backend';
  }

  // const response = await network.post(`/${path}/ticket-providers`, data);
  const response = await network.post(`/ticket-providers`, data);
  return response?.data;
};

export const deleteTicketProvider = async (id: string, location: any) => {
  const { pathname } = location;
  let path = 'validate-web-backend';
  if (pathname.split('/').includes('validate-backend')) {
    path = 'validate-admin-backend';
  }

  // const response = await network.delete(`/${path}/ticket-providers/${id}`);
  const response = await network.delete(`/ticket-providers/${id}`);
  return response?.data;
};
