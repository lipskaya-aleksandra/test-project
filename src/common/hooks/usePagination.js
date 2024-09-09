import { useCallback , useMemo } from 'react';

import useQueryParams from './useQueryParams';


export const defaultValues = { page: '1', perPage: '10' };

export function usePagination(defaults = defaultValues) {
  const { queryParams, setQueryParams } = useQueryParams({ defaults });

  const getCurrentParams = useCallback(() => ({
      page: parseInt(queryParams.page, 10),
      perPage: parseInt(queryParams.perPage, 10),
    }), [queryParams]);

  const updatePageParams = useCallback(
    newParams => {
      setQueryParams({ ...getCurrentParams(), ...newParams });
    },
    [getCurrentParams, setQueryParams],
  );

  return useMemo(
    () => ({
      pageParams: getCurrentParams(),
      setPageParams: updatePageParams,
    }),
    [getCurrentParams, updatePageParams],
  );
}
