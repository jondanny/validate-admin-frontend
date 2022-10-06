import HelloWorld from '../pages/HelloWorldPage';
import Login from '../pages/LoginPage';
import SignUp from '../pages/SignUpPage';

export const protectedRoutes = [
  {
    path: '/hello-world',
    element: HelloWorld,
  },
  {
    path: '/',
    element: HelloWorld,
  },
];

export const authRoutes = [
  {
    path: '/auth/login',
    element: Login,
  },
  {
    path: '/auth/SignUp',
    element: SignUp,
  },
];
