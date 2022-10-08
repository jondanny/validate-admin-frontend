import HelloWorld from '../pages/HelloWorldPage';
import Login from '../pages/LoginPage';
import SignUp from '../pages/SignUpPage';
import Layout from '../layout/index'

export const protectedRoutes = [
  {
    path: '/hello-world',
    element: HelloWorld,
  },
  {
    path: '/',
    element: HelloWorld,
  },
  {
    path: '/layout',
    element: Layout
  }
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
