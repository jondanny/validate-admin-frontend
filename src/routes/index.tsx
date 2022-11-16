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
    path: '/',
    element: Landing,
  },
  {
    path: '/ticket-provider',
    element: TicketProvider,
  },
  {
    path: '/ticket',
    element: Ticket,
  },
  {
    path: '/users',
    element: Users,
  },
  {
    path: '/ticket-provider-api-token',
    element: TicketProviderApiToken,
  },
  {
    path: '/ticket-transfer',
    element: TicketTransfer,
  },
  {
    path: '/ticket-provider-encryption-key',
    element: TicketProviderEncryptionKey,
  },
  {
    path: '/events',
    element: Events
  }
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
