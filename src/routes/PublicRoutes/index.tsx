import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '..';

const PublicRoutes: FC = () => {
  return (
    <Routes>
      {publicRoutes?.map(({ path, element: Component }: any, index) => {
        return <Route path={path} element={<Component />} key={index} />;
      })}
    </Routes>
  );
};


export default PublicRoutes;