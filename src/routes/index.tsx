import TicketProvider from '../pages/TicketProvider';
import Login from '../pages/Login';

export const protectedRoutes = [
  {
    path: '/',
    element: TicketProvider,
  },
  {
    path: '/ticket-provider',
    element: TicketProvider
  }
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
