/* eslint-disable @typescript-eslint/no-unused-expressions */
import network from '../../utils/network';

interface getOrdersParams {
  limit?: number;
  ticketProviderId?: string;
  location?: any;
  orderSearchedParams?: any;
  afterCursor?: string;
  beforeCursor?: string;
}

export const getOrders = async ({
  limit,
  ticketProviderId,
  location,
  orderSearchedParams,
  afterCursor,
  beforeCursor,
}: getOrdersParams) => {
  const { pathname } = location;
  let params: { [key: string]: any } = {};
  let path = 'validate-web-backend';
  params.limit = limit;
  orderSearchedParams.marketType &&
    orderSearchedParams.marketType !== 'All' &&
    (params.marketType = orderSearchedParams.marketType);
  orderSearchedParams.status &&
    orderSearchedParams.status !== 'All' &&
    (params.orderStatus = orderSearchedParams.status);
  orderSearchedParams.externalStatus &&
    orderSearchedParams.externalStatus !== 'All' &&
    (params.paymentStatus = orderSearchedParams.externalStatus);
  orderSearchedParams.buyerValues && (params.buyerInputValue = orderSearchedParams.buyerValues);
  orderSearchedParams.paymentId && (params.paymentExternalId = orderSearchedParams.paymentId);

  afterCursor ? (params.afterCursor = afterCursor) : '';
  beforeCursor ? (params.beforeCursor = beforeCursor) : '';

  ticketProviderId && (params.ticketProviderId = ticketProviderId);

  if (pathname.split('/').includes('validate-backend')) {
    path = 'validate-admin-backend';
  }

  const response = await network.get({
    // path: `/${path}/orders`,
    path: `/orders`,
    options: {
      params,
    },
  });
  return response?.data;
};

export const getOrderByUuid = async (orderUuid: string, location: any) => {
  const { pathname } = location;
  let path = 'validate-web-backend';

  if (pathname.split('/').includes('validate-backend')) {
    path = 'validate-admin-backend';
  }

  const response = await network.get({
    // path: `/${path}/orders/${orderUuid}`,
    path: `/orders/${orderUuid}`,
  });

  return response.data;
};
