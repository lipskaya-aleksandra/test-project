import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

const queryClient = new QueryClient({});

export default function QueryWrapper({ suspenseFallback, children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </QueryClientProvider>
  );
}
