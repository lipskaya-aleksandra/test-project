import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';

import { ALLOWED_UNAUTHORIZED_URLS } from './auth/constants';
import { router } from './common/router/config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,

      retry: (failureCount, error) => {
        if (
          error.response.status === 401 &&
          ALLOWED_UNAUTHORIZED_URLS.includes(error.config.url)
        ) {
          return false;
        }

        return 4 - failureCount;
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        if (
          error.response.status === 401 &&
          ALLOWED_UNAUTHORIZED_URLS.includes(error.config.url)
        ) {
          return false;
        }

        return 4 - failureCount;
      },
    },
  },
});

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
