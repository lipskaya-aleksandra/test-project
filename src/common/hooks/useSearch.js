import { useCallback } from 'react';
import useQueryParams from './useQueryParams';
import { useMemo } from 'react';
import {
  usePagination,
  defaultValues as paginationDefaultValues,
} from './usePagination';

export const defaultValues = { search: '' };

export function useSearch() {
  const { pageParams } = usePagination();
  const { queryParams, setQueryParams } = useQueryParams({
    ...defaultValues,
    page: pageParams.page,
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
