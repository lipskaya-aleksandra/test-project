import { useState } from 'react';
import FilterWidget from '../common/components/filter/FilterWidget';
import MultiSelect from '../common/components/filter/MultiSelect';
import SearchInput from '../common/components/filter/SearchInput';
import useQueryParams from '../common/hooks/useQueryParams';
import useDebouncedValue from '../common/hooks/useDebouncedValue';
import { useEffect } from 'react';
import FilterResults from '../common/components/filter/FilterResults';

export default function UserFilters() {
  const defaultFilters = { badge: [], search: '' };
  const [searchParams, setSearchParams] = useQueryParams(defaultFilters);
  const [searchTerm, setSearchTerm] = useState(defaultFilters.search);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 1000);
  useEffect(() => {
    if (debouncedSearchTerm.trim() === searchTerm.trim()) {
      setSearchParams({ search: debouncedSearchTerm.trim() });
    }
  }, [debouncedSearchTerm, searchTerm]);
  const onSelect = (newOptions, filter) => {
    setSearchParams({
      [filter]: [...newOptions],
    });
  };
  return (
    <FilterWidget>
      <MultiSelect
        label={'Badge'}
        options={['bronze', 'silver', 'gold']}
        placeholder={'Choose badge'}
        onSelect={(newOptions) => {
          onSelect(newOptions, 'badge');
        }}
        selectedOptions={searchParams['badge']}
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* <FilterResults defaultFilters={defaultFilters} /> */}
    </FilterWidget>
  );
}
