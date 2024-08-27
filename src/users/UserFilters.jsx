import { Stack } from '@mui/material';

import FilterResults from '../common/components/filter/FilterResults';
import FilterWidgetContainer from '../common/components/filter/FilterWidget';
import MultiSelect from '../common/components/filter/MultiSelect';
import SearchInput from '../common/components/filter/SearchInput';
import { defaultValues } from '../common/hooks/usePagination';
import useQueryParams from '../common/hooks/useQueryParams';
import { useSearch } from '../common/hooks/useSearch';

import { useGetJobs } from './api/useGetJobs';
import { defaultFilters } from './defaultUserFilters';

export default function UserFilters() {
  const { queryParams, setQueryParams } = useQueryParams({
    defaults: defaultFilters,
    allowOverrideKeys: ['page'],
  });
  const { search, setSearch } = useSearch();
  const { data } = useGetJobs();

  const onSelect = (newOptions, filter) => {
    setQueryParams({
      [filter]: newOptions,
      page: defaultValues.page,
    });
  };

  return (
    <FilterWidgetContainer>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
        <MultiSelect
          label="Job"
          options={data.map(r => r.name)}
          placeholder="Choose job"
          onChange={(e, newOptions) => {
            onSelect(newOptions, 'job');
          }}
          getOptionLabel={option => option}
          value={queryParams.job}
          renderTags={() => null}
        />

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
