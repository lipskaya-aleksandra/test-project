import { useCallback } from 'react';
import useQueryParams from './useQueryParams';
import { useMemo } from 'react';

export const defaultValues = { search: '' };

export function useSearch() {
  const { queryParams, setQueryParams } = useQueryParams(defaultValues);

  const updateSearch = useCallback(
    (newTerm) => {
      setQueryParams({ search: newTerm });
    },
    [setQueryParams],
  );

  return useMemo(
    () => ({
      search: queryParams.search,
      setSearch: updateSearch,
    }),
    [updateSearch],
  );
}
