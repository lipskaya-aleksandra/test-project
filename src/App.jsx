import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';

import { router } from './common/router/config';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
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
