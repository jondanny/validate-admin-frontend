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
    backendPath: '/validate-backend/ticket-provider',
    element: TicketProvider,
  },
  {
    backendPath: '/validate-backend/ticket',
    element: Ticket,
  },
  {
    backendPath: '/validate-backend/users',
    element: Users,
  },
  {
    backendPath: '/validate-backend/events',
    element: Events
  },
  {
    backendPath: '/validate-backend/ticket-provider-api-token',
    element: TicketProviderApiToken,
  },
  {
    backendPath: '/validate-backend/ticket-transfer',
    element: TicketTransfer,
  },
  {
    backendPath: '/validate-backend/ticket-provider-encryption-key',
    element: TicketProviderEncryptionKey,
  },
  {
    backendPath: '/validate-backend/ticket-types',
    element: TicketType,
  },
  {
    backendPath: '/validate-backend/orders',
    element: Orders,
  },
  {
    backendPath: '/validate-backend/orders/:uuid',
    element: OrdersDetailPage,
  }
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
