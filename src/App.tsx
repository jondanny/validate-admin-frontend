import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes';
import PublicRoutes from './routes/PublicRoutes';
import { colorContext as ColorContext, initialUserState } from './utils/contexts/app-contexts';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000
      }
    }
  });
  return (
    <ColorContext.Provider value={{ ...initialUserState }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PublicRoutes />
          <AuthRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </ColorContext.Provider>
  );
}

export default App;
