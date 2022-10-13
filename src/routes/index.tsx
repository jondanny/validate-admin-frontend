import TicketProvider from '../pages/TicketProvider';
import Ticket from '../pages/Ticket';
import Login from '../pages/Login';

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
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
