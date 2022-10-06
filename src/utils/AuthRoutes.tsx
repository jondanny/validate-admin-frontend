import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes } from '../routes/routes'
const AuthRoute: FC = () => {
  return (
    <Routes>
      {
        authRoutes?.map(({path, element: Component}: any, index) => {
          return (
            <Route path={path} element={<Component />} key={index}/>
          )
        })
      }
      <Route />
    </Routes>
  )
}
export default AuthRoute