import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function QueryWrapper({
  errorFallback,
  suspenseFallback,
  children,
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary onReset={reset} fallbackRender={errorFallback}>
            <Suspense fallback={suspenseFallback}>{children}</Suspense>
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
    // <Suspense fallback={suspenseFallback}>{children}</Suspense>
  );
}