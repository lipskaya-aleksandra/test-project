import { useCallback } from 'react';
import useQueryParams from './useQueryParams';

export const defaultValues = { page: 1, perPage: 10 };

export function usePagination(defaults = defaultValues) {
  const [searchParams, setSearchParams] = useQueryParams(defaults);

  const getCurrentParams = useCallback(() => {
    const params = {};

    params.page = parseInt(searchParams.page, 10);
    params.perPage = parseInt(searchParams.perPage, 10);

    return params;
  }, [searchParams]);

  const updatePageParams = useCallback(
    (newParams) => {
      setSearchParams({ ...getCurrentParams(), ...newParams });
    },
    [getCurrentParams, setSearchParams],
  );

  return [getCurrentParams(), updatePageParams];
}
