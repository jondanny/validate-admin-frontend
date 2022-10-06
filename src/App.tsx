import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { protectedRoutes } from './routes/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          protectedRoutes.map(({path, element: Component}: any, index) => {
            return (
              <Route path={path} element={<Component />} key={index}/>
            )
          })
        }
        <Route
          path="*"
          element={<Navigate to="/hello-world" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
