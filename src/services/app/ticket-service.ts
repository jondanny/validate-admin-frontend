/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from '../../utils/network';

export interface createTicketInterface {
  name: string;
  ticketProviderId: number;
  userId?: number;
  imageUrl?: string | null;
  newUserName?: string;
  newUserEmail?: string;
  newUserPhoneNumber?: string;
  type?: string;
  dateStart?: any,
  dateEnd?: any,
  user?: any;
}

interface getTicketParams {
  limit?: number;
  afterCursor?: string;
  beforeCursor?: string;
  searchText?: string;
  ticketProviderId?: string;
  location?: any
}

interface updateTicketInterface {
  id: any;
  ticketType?: any
}

export interface retryMintingTicketInterface {
  userId: number;
  ticketId: number;
  ticketProviderId: number
}

export const getTickets = async ({
  limit,
  afterCursor,
  beforeCursor,
  searchText,
  ticketProviderId,
  location
}: getTicketParams) => {
  let params: { [key: string]: any } = {};

  params.limit = limit;

  afterCursor ? (params.afterCursor = afterCursor) : '';
  beforeCursor ? (params.beforeCursor = beforeCursor) : '';
  searchText ? (params.searchText = searchText) : '';
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? (params.ticketProviderId = ticketProviderId) : '';

  afterCursor ? (params.afterCursor = afterCursor) : '';
  beforeCursor ? (params.beforeCursor = beforeCursor) : '';
  searchText ? (params.searchText = searchText) : '';
  ticketProviderId && parseInt(ticketProviderId) !== 0 ? (params.ticketProviderId = ticketProviderId) : '';

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.get({
    path: `/${path}/tickets`,
    options: {
      params,
    },
  });
  return response?.data;
};

export const createTicketService = async (data: createTicketInterface, location: any, saleEnabled?: any) => {
  let user: {[key: string | number]: any} = {};
  let ticketType: {[key: string | number]: any} = {};
  if(data.userId){
    user['userId'] = data.userId
  }else {
    user.name = data.newUserName;
    user.email = data.newUserEmail;
    user.phoneNumber = data.newUserPhoneNumber;
  }

  if(saleEnabled.saleEnable){ 
    ticketType.saleAmount = parseInt(saleEnabled.saleFieldsValues.amount)
    ticketType.saleEnabledFromDate = saleEnabled.saleFieldsValues.ticketDateStart
    ticketType.saleEnabledToDate = saleEnabled.saleFieldsValues.ticketDateEnd
  }


  const ticket = {
    event: {
      name: data.name
    },
    ticketType: {
      ...ticketType,
      name: data.type,
      ticketDateStart: data.dateStart,
      ticketDateEnd: data.dateEnd
    },
    ticketProviderId: data.ticketProviderId,
    user: {
      ...data.user
    },
    imageUrl: data.imageUrl ? data.imageUrl : ''
  };

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.post(`/${path}/tickets`, ticket);
  return response?.data;
};

export const deleteTicket = async (id: string, location: any) => {

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.delete(`/${path}/tickets/${id}`);
  return response?.data;
};

export const updateTicketService = async (data: updateTicketInterface, location: any) => {
  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.patch(`/${path}/tickets/${data.id}`, data);
  return response;
}


export const retryTicketMinting = async (obj: retryMintingTicketInterface, location: any) => {

  const { pathname } = location;
  let path = 'validate-admin-backend';
  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-web-backend'
  }

  const response = await network.post(`/${path}tickets/retry-minting`, obj)
  return response?.data;
}