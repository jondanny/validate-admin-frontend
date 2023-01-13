import network from "../../utils/network";

interface getEventsParams {
  limit?: number,
  ticketProviderId?: string
  location?: any
}

interface createEvent {
  name: string;
  description: string;
  imageUrl?: string;
  ticketProviderId: string | number;
}

export const getEvents = async ( { limit, ticketProviderId, location }: getEventsParams ) => {
  const { pathname } = location;
  let params: { [key: string]: any } = {};
  let path = 'validate-web-backend';
  params.limit = limit;
  ticketProviderId && (params.ticketProviderId = ticketProviderId)

  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({
    path: `/${path}/events`,
    options: {
      params,
    },
  });
  return response?.data;
}

export const getTicketProviders = async ({location}: any) => {

  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  try {
    
    const response = await network.get({
      path: `/${path}/ticket-providers/get-all`,
    });
    return response?.data;
  }catch(err: any){
    return err;
  }
};

export const createEventService = async (data: createEvent, location: any) => {

  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.post(`/${path}/events`, data);

  return response?.data;
}