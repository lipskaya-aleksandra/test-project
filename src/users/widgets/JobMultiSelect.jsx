import MultiSelect from '../../common/components/filter/MultiSelect';
import useQueryParams from '../../common/hooks/useQueryParams';
import { useGetJobs } from '../api/useGetJobs';
import { defaultFilters } from '../defaultUserFilters';

export const noneJob = { name: 'none', id: 'none' };

export default function JobMultiSelect(props) {
  const { queryParams } = useQueryParams({
    defaults: { job: defaultFilters.job },
    allowOverrideKeys: ['page'],
  });
  const { data } = useGetJobs();
  const jobs = [noneJob, ...data];

  return (
    <MultiSelect
      label="Job"
      options={jobs.map(r => r.name)}
      placeholder="Choose job"
      getOptionLabel={option => option}
      value={queryParams.job}
      renderTags={() => null}
      {...props}
    />
  );
}
