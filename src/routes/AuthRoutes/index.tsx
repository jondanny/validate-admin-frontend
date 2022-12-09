import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { protectedRoutes } from '..';
import AuthGuard from '../../guards/AuthGuard';
import AdminLayout from '../../layout';

const AuthRoutes: FC = () => {
  return (
    <Routes>
      {protectedRoutes?.map(({ element: Component, webPath, path }: any, index) => {
        return (
          <Route
            path={webPath }
            element={
              <AuthGuard>
                <AdminLayout>
                  <Component />
                </AdminLayout>
              </AuthGuard>
            }
            key={index}
          />
        );
      })}
      {protectedRoutes?.map(({ element: Component, backendPath }: any, index) => {
        return (
          <Route
            path={backendPath}
            element={
              <AuthGuard>
                <AdminLayout>
                  <Component />
                </AdminLayout>
              </AuthGuard>
            }
            key={index}
          />
        );
      })}
    </Routes>
  );
};
export default AuthRoutes;
