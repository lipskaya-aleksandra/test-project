import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';

export default function useOptimisticUpdate(queryKey) {
  const queryClient = useQueryClient();
  let timer;

  const startUpdate = useCallback(
    ({ newData, delay, updateFn }) => {
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, newData);
      timer = setTimeout(updateFn, delay);
    },
    [queryKey],
  );

  const cancelUpdate = useCallback(() => {
    clearTimeout(timer);
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, timer]);

  return useMemo(
    () => ({ startUpdate, cancelUpdate }),
    [startUpdate, cancelUpdate],
  );
}
