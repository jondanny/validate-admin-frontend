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
  location?: any
}

export const getTicketProviders = async ({ limit, afterCursor, beforeCursor, searchText, location }: getTicketProviderParams) => {
  
  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }
  
  const response = await network.get({path: `/${path}/ticket-providers`, options: {
    params: {
      limit,
      afterCursor,
      beforeCursor,
      searchText
    }
  }});
  return response?.data;
}

export const createTicketProviderService = async (data: createTicketProviderInterface, location: any) => {

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.post(`/${path}/ticket-providers`, data);
  return response?.data
}

export const deleteTicketProvider = async (id: string, location: any) => {

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.delete(`/${path}/ticket-providers/${id}`);
  return response?.data;
}