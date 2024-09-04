import { Stack, Alert, Autocomplete, TextField } from '@mui/material';

import QueryWrapper from '../../common/components/QueryWrapper';
import FilterResults from '../../common/components/filter/FilterResults';
import FilterWidgetContainer from '../../common/components/filter/FilterWidget';
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
      <Stack direction={{ xs: 'column', md: 'row' }} gap={1}>
        <QueryWrapper
          suspenseFallback={
            <Autocomplete
              sx={{ mt: 1, mb: 1, minWidth: '300px' }}
              options={[]}
              loading
              renderInput={params => (
                <TextField {...params} label="Job" placeholder="Choose job" />
              )}
            />
          }
          errorFallback={<Alert severity="error">Could not load jobs</Alert>}
        >
          <JobMultiSelect
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
