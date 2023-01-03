import network from "../../utils/network";
import { CreateTicketTypeInterface } from '../../pages/TicketType/index'

interface getTicketTypeParams {
  limit?: number,
  eventUuid?: string;
  location?: any
}

export const getTicketTypes = async ({ limit, eventUuid, location }: getTicketTypeParams) => {
  const { pathname } = location;
  let alpha = '0';
  let params: { [key: string]: any } = {};
  let path = 'validate-web-backend';
  params.limit = limit;
  if(eventUuid?.toString() !== alpha){
    eventUuid &&  (params.eventUuid = eventUuid)
  }

  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({
    path: `/${path}/ticket-types`,
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

  const response = await network.get({
    path: `/${path}/ticket-providers/get-all`,
  });
  return response?.data;
};

export const createTicketTypeService = async (data: CreateTicketTypeInterface, location: any) => {
  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.post(`/${path}/ticket-types`, data);
  return response?.data;
}

export const getCurrencies = async(location: any) => {
  const { pathname } = location;
  let path = 'validate-web-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({path: `/${path}/ticket-types/currencies`})
  return response?.data;
}