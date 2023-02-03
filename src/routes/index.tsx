import TicketProvider from '../pages/TicketProvider';
import Ticket from '../pages/Ticket';
import Login from '../pages/Login';
import Users from '../pages/Users';
import TicketProviderApiToken from '../pages/TicketProviderApiToken';
import TicketTransfer from '../pages/TicketTransfer';
import TicketProviderEncryptionKey from '../pages/TicketProviderEncryptionKey';
import Events from '../pages/Events'
import Landing from '../pages/Landing';
import TicketType from '../pages/TicketType/index'
import Orders from '../pages/Orders';
import OrdersDetailPage from '../pages/Orders/OrderDetailPage';

export const protectedBackendRoutes = [
  {
    backendPath: '/',
    element: Landing,
  },
  {
    backendPath: '/ticket-provider',
    element: TicketProvider,
  },
  {
    backendPath: '/ticket',
    element: Ticket,
  },
  {
    backendPath: '/users',
    element: Users,
  },
  {
    backendPath: '/events',
    element: Events
  },
  {
    backendPath: '/ticket-provider-api-token',
    element: TicketProviderApiToken,
  },
  {
    backendPath: '/ticket-transfer',
    element: TicketTransfer,
  },
  {
    backendPath: '/ticket-provider-encryption-key',
    element: TicketProviderEncryptionKey,
  },
  {
    backendPath: '/ticket-types',
    element: TicketType,
  },
  {
    backendPath: '/orders',
    element: Orders,
  },
  {
    backendPath: '/orders/:uuid',
    element: OrdersDetailPage,
  }
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
