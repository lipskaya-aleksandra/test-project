import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Fragment } from 'react';

import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import useOptimisticUpdate from '../../common/hooks/useOptimisticUpdate';
import { useEditUserJob } from '../api/useEditUserJob';
import { useGetJobs } from '../api/useGetJobs';
import useUsersTableQueryParams from '../hooks/useUsersTableQueryParams';

import { JobSelect } from './JobSelect';

function UndoAndDismissButtons({ snackbarKey }) {
  const params = useUsersTableQueryParams();
  const { cancelUpdate } = useOptimisticUpdate(['users', params]);
  const { closeSnackbar } = useSnackbar();

  return (
    <Fragment>
      <Button
        sx={{ '&:focus': { outline: 'none' } }}
        onClick={() => {
          cancelUpdate();
          closeSnackbar(snackbarKey);
        }}
      >
        Undo
      </Button>
      <Button
        sx={{ '&:focus': { outline: 'none' } }}
        onClick={() => {
          closeSnackbar(snackbarKey);
        }}
      >
        Dismiss
      </Button>
    </Fragment>
  );
}

export default function JobCell({ info }) {
  const user = info.row.original;
  const { data } = useGetJobs();
  const noneJob = { name: 'none', id: 'null' };
  const jobs = [noneJob, ...data];

  const params = useUsersTableQueryParams();
  const { startUpdate } = useOptimisticUpdate(['users', params]);
  const displaySnackbar = useAlertSnackbar();

  const editJob = useEditUserJob(user.id);

  return (
    <JobSelect
      value={info.getValue() ? info.getValue().id : noneJob.id}
      onChange={e => {
        const jobId = e.target.value;
        const jobName =
          jobs.filter(r => r.id === jobId)[0]?.name || noneJob.name;

        startUpdate({
          newData: oldData => ({
            count: oldData.count,
            rows: oldData.rows.map(u => {
              if (u.id === user.id)
                return { ...user, job: { name: jobName, id: jobId } };

              return u;
            }),
          }),
          delay: 5000,
          updateFn: () => {
            editJob.mutate(jobId);
          },
        });

        displaySnackbar({
          message: `Job for user ${user.firstName} ${user.lastName} changed from ${user.job.name} to ${jobName}`,
          Action: <UndoAndDismissButtons />,
        });
      }}
    />
  );
}
