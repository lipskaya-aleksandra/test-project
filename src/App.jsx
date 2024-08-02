import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';

import { store } from './common/store/index.js';
import { router } from './common/router/config.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
