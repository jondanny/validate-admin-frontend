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
    webPath: '/validate-backend/ticket-provider',
    backendPath: '/validate-web-backend/ticket-provider',
    element: TicketProvider,
  },
  {
    webPath: '/validate-backend/ticket',
    backendPath: '/validate-web-backend/ticket',
    element: Ticket,
  },
  {
    webPath: '/validate-backend/users',
    backendPath: '/validate-web-backend/users',
    element: Users,
  },
  {
    webPath: '/validate-backend/ticket-provider-api-token',
    backendPath: '/validate-web-backend/ticket-provider-api-token',
    element: TicketProviderApiToken,
  },
  {
    webPath: '/validate-backend/ticket-transfer',
    backendPath: '/validate-web-backend/ticket-transfer',
    element: TicketTransfer,
  },
  {
    webPath: '/validate-backend/ticket-provider-encryption-key',
    backendPath: '/validate-web-backend/ticket-provider-encryption-key',
    element: TicketProviderEncryptionKey,
  },
  {
    webPath: '/validate-backend/events',
    backendPath: '/validate-web-backend/events',
    element: Events
  }
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
