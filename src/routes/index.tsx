import TicketProvider from '../pages/TicketProvider';
import Ticket from '../pages/Ticket';
import Login from '../pages/Login';
import Users from '../pages/Users';

export const protectedRoutes = [
  {
    path: '/',
    element: TicketProvider,
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
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
