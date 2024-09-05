import { useQueryClient } from '@tanstack/react-query';
import { useRef, useMemo, useCallback } from 'react';

export default function useOptimisticUpdate(queryKey) {
  const queryClient = useQueryClient();
  const timerRef = useRef();

  const startUpdate = useCallback(
    ({ newData, delay, updateFn }) => {
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, newData);
      timerRef.current = setTimeout(updateFn, delay);
    },
    [queryKey, queryClient],
  );

  const cancelUpdate = useCallback(() => {
    clearTimeout(timerRef.current);
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, queryClient]);

  return useMemo(
    () => ({ startUpdate, cancelUpdate }),
    [startUpdate, cancelUpdate],
  );
}
