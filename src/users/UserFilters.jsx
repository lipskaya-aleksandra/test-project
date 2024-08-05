import { useState } from 'react';
import FilterWidget from '../common/components/filter/FilterWidget';
import MultiSelect from '../common/components/filter/MultiSelect';
import SearchInput from '../common/components/filter/SearchInput';
import useQueryParams from '../common/hooks/useQueryParams';
import useDebouncedValue from '../common/hooks/useDebouncedValue';
import { useEffect } from 'react';
import FilterResults from '../common/components/filter/FilterResults';
import { Stack } from '@mui/material';
import { useGetRoles } from './api/useGetRoles';
import { useSearch } from '../common/hooks/useSearch';

export default function UserFilters({ defaultFilters }) {
  const { queryParams, setQueryParams } = useQueryParams(defaultFilters);
  const { search, setSearch } = useSearch();
  const { data } = useGetRoles();

  const onSelect = (newOptions, filter) => {
    setQueryParams({
      [filter]: [...newOptions],
    });
  };

  return (
    <FilterWidget>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
        <MultiSelect
          label={'Role'}
          options={data.map((r) => r.name)}
          placeholder={'Choose role'}
          onChange={(e, newOptions) => {
            onSelect(newOptions, 'role');
          }}
          getOptionLabel={(option) => option}
          value={queryParams['role']}
        />
        <SearchInput
          searchTerm={search}
          setSearchTerm={(term) => {
            setSearch(term);
          }}
        />
      </Stack>

      <FilterResults defaultFilters={defaultFilters} />
    </FilterWidget>
  );
}
