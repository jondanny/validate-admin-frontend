import HelloWorld from '../Pages/HelloWorld/hello-world.page'
import Login from '../Pages/auth/Login';
import SignUp from '../Pages/auth/SignUp';

export const protectedRoutes = [
  {
    path: "/hello-world",
    element: HelloWorld
  },
  {
    path: "/",
    element: HelloWorld
  }
]

export const authRoutes = [
  {
    path: "/auth/login",
    element: Login
  },
  {
    path: "/auth/SignUp",
    element: SignUp
  },
]
