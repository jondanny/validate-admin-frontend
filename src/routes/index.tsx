import TicketProvider from '../pages/TicketProvider';
import Ticket from '../pages/Ticket';
import Login from '../pages/Login';
import Users from '../pages/Users';
import TicketProviderApiToken from '../pages/TicketProviderApiToken';
import TicketTransfer from '../pages/TicketTransfer';
import TicketProviderEncryptionKey from '../pages/TicketProviderEncryptionKey';
import Events from '../pages/Events'
import Landing from '../pages/Landing';

export const protectedRoutes = [
  {
    webPath: '/',
    element: Landing,
  },
  {
    webPath: '/validate-web-backend/ticket-provider',
    element: TicketProvider,
  },
  {
    webPath: '/validate-web-backend/ticket',
    element: Ticket,
  },
  {
    webPath: '/validate-web-backend/users',
    element: Users,
  },

  {
    webPath: '/validate-web-backend/events',
    element: Events
  }
];
export const protectedBackendRoutes = [
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
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
