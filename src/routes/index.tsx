import TicketProvider from '../pages/TicketProvider';
import Login from '../pages/Login';

export const protectedRoutes = [
  {
    path: '/',
    element: TicketProvider,
  },
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
];
