import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './common/store/index.js';
import { router } from './common/router/config.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({});

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
