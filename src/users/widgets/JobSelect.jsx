import { MenuItem, Select } from '@mui/material';
import { forwardRef } from 'react';

import { useGetJobs } from '../api/useGetJobs';

export const noneJob = { name: 'none', id: 'none' };

export const JobSelect = forwardRef((props, ref) => {
  const { data } = useGetJobs();
  const jobs = [noneJob, ...data];

  return (
    <Select inputRef={ref} sx={{ my: 1 }} size="small" fullWidth {...props}>
      {jobs.map(job => (
        <MenuItem key={job.id} name={job.name} value={job.id}>
          {job.name}
        </MenuItem>
      ))}
    </Select>
  );
});
