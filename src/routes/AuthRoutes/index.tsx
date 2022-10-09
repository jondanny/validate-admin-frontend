import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { protectedRoutes } from '..';
import AuthGuard from '../../guards/AuthGuard';
import AdminLayout from '../../layout';

const AuthRoutes: FC = () => {
  return (
    <Routes>
      {protectedRoutes?.map(({ path, element: Component }: any, index) => {
        return (
          <Route
            path={path}
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
