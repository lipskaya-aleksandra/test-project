import { useState } from 'react';
import FilterWidgetContainer from '../common/components/filter/FilterWidget';
import MultiSelect from '../common/components/filter/MultiSelect';
import SearchInput from '../common/components/filter/SearchInput';
import useQueryParams from '../common/hooks/useQueryParams';
import useDebouncedValue from '../common/hooks/useDebouncedValue';
import { useEffect } from 'react';
import FilterResults from '../common/components/filter/FilterResults';
import { Stack } from '@mui/material';
import { useGetJobs } from './api/useGetJobs';
import { useSearch } from '../common/hooks/useSearch';
import { defaultFilters } from './pages/UsersPage';

export default function UserFilters() {
  const { queryParams, setQueryParams } = useQueryParams(defaultFilters);
  const { search, setSearch } = useSearch();
  const { data } = useGetJobs();

  const onSelect = (newOptions, filter) => {
    setQueryParams({
      [filter]: [...newOptions],
    });
  };

  return (
    <FilterWidgetContainer>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
        <MultiSelect
          label={'Job'}
          options={data.map((r) => r.name)}
          placeholder={'Choose job'}
          onChange={(e, newOptions) => {
            onSelect(newOptions, 'job');
          }}
          getOptionLabel={(option) => option}
          value={queryParams['job']}
          renderTags={() => null}
        />

        <SearchInput
          searchTerm={search}
          setSearchTerm={(term) => {
            setSearch(term);
          }}
        />
      </Stack>

      <FilterResults defaultFilters={defaultFilters} />
    </FilterWidgetContainer>
  );
}
