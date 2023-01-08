import network from "../../utils/network";

interface getOrdersParams {
  limit?: number,
  ticketProviderId?: string
  location?: any
}

export const getOrders = async ( { limit, ticketProviderId, location }: getOrdersParams ) => {
  const { pathname } = location;
  let params: { [key: string]: any } = {};
  let path = 'validate-web-backend';
  params.limit = limit;
  ticketProviderId && (params.ticketProviderId = ticketProviderId)

  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({
    path: `/${path}/orders`,
    options: {
      params,
    },
  });
  return response?.data;
}


export const getOrderByUuid = async (orderUuid: string, location: any) => {
  console.log({orderUuid})
  const { pathname } = location;
  let path = 'validate-web-backend';

  if(pathname.split('/').includes('validate-backend')){
    path = 'validate-admin-backend'
  }

  const response = await network.get({
    path: `/${path}/orders/${orderUuid}`,
  })

  return response.data;
}