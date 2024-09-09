import { Stack, Alert } from '@mui/material';

import QueryWrapper from '../../common/components/QueryWrapper';
import FilterResults from '../../common/components/filter/FilterResults';
import FilterWidgetContainer from '../../common/components/filter/FilterWidget';
import MultiSelect from '../../common/components/filter/MultiSelect';
import SearchInput from '../../common/components/filter/SearchInput';
import { defaultValues } from '../../common/hooks/usePagination';
import useQueryParams from '../../common/hooks/useQueryParams';
import { useSearch } from '../../common/hooks/useSearch';
import { defaultFilters } from '../defaultUserFilters';

import JobMultiSelect from './JobMultiSelect';

export default function UserFilters() {
  const { setQueryParams } = useQueryParams({
    defaults: defaultFilters,
    allowOverrideKeys: ['page'],
  });
  const { search, setSearch } = useSearch();

  const onSelect = (newOptions, filter) => {
    setQueryParams({
      [filter]: newOptions,
      page: defaultValues.page,
    });
  };

  return (
    <FilterWidgetContainer>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5}>
        <QueryWrapper
          suspenseFallback={
            <MultiSelect sx={{ minWidth: '300px' }} options={[]} loading />
          }
          errorFallback={<Alert severity="error">Could not load jobs</Alert>}
        >
          <JobMultiSelect
            sx={{ minWidth: '300px' }}
            onChange={(e, newOptions) => {
              onSelect(newOptions, 'job');
            }}
          />
        </QueryWrapper>

        <SearchInput
          searchTerm={search}
          setSearchTerm={term => {
            setSearch(term);
          }}
        />
      </Stack>

      <FilterResults defaultFilters={defaultFilters} />
    </FilterWidgetContainer>
  );
}
