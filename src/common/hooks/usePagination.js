import { useCallback } from 'react';
import useQueryParams from './useQueryParams';

export const defaultValues = { page: '1', perPage: '10' };

export function usePagination(defaults = defaultValues) {
  const [searchParams, setSearchParams] = useQueryParams(defaults);

  const getCurrentParams = useCallback(() => {
    return {
      page: parseInt(searchParams.page, 10),
      perPage: parseInt(searchParams.perPage, 10),
    };
  }, [searchParams]);

  const updatePageParams = useCallback(
    (newParams) => {
      setSearchParams({ ...getCurrentParams(), ...newParams });
    },
    [getCurrentParams, setSearchParams],
  );

  return [getCurrentParams(), updatePageParams];
}
