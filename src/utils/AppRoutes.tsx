import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom'
import { protectedRoutes } from '../routes/routes'
const AppRoute: FC = () => {
  return (
    <Routes>
      {
        protectedRoutes?.map(({path, element: Component}: any, index) => {
          return (
            <Route path={path} element={<Component />} key={index}/>
          )
        })
      }
    </Routes>
  )
}

export default AppRoute