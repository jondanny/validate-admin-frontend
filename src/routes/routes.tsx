import HelloWorld from '../Pages/HelloWorld/hello-world.page'

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

function async(arg0: () => Promise<any>) {
  throw new Error("Function not implemented.");
}
