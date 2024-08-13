import { useCallback } from 'react';
import useQueryParams from './useQueryParams';
import { useMemo } from 'react';
import { defaultValues as paginationDefaultValues } from './usePagination';

export const defaultValues = { search: '' };

export function useSearch() {
  const { queryParams, setQueryParams } = useQueryParams({
    defaults: defaultValues,
    allowOverrideKeys: ['page'],
  });

  const updateSearch = useCallback(
    (newTerm) => {
      setQueryParams({ search: newTerm, page: paginationDefaultValues.page });
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
