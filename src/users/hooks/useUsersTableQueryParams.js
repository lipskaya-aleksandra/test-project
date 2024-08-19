import { useMemo } from 'react';
import useDebouncedValue from '../../common/hooks/useDebouncedValue';
import { usePagination } from '../../common/hooks/usePagination';
import useQueryParams from '../../common/hooks/useQueryParams';
import { useSearch } from '../../common/hooks/useSearch';
import { defaultFilters } from '../defaultUserFilters';

export default function useUsersTableQueryParams() {
  const { queryParams } = useQueryParams({ defaults: defaultFilters });
  const { search } = useSearch();
  const debouncedSearchTerm = useDebouncedValue(search, 1000);

  const { pageParams } = usePagination();

  const params = {
    ...pageParams,
    ...queryParams,
    search: debouncedSearchTerm,
  };

  return useMemo(() => params, [pageParams, queryParams, debouncedSearchTerm]);
}
