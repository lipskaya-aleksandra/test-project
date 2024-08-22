import { Link } from 'react-router-dom';
import {
  Autocomplete,
  Button,
  Checkbox,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';

import EditUserCell from './EditUserCell.jsx';
import StatusLabel from './StatusLabel.jsx';
import { useGetJobs } from './api/useGetJobs.js';
import useOptimisticUpdate from '../common/hooks/useOptimisticUpdate.js';
import useAlertSnackbar from '../common/hooks/useAlertSnackbar.jsx';
import { useEditUserJob } from './api/useEditUserJob.js';
import useUsersTableQueryParams from './hooks/useUsersTableQueryParams.js';
import { useSnackbar } from 'notistack';
import { Fragment } from 'react';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: () => <span>id</span>,
  }),
  columnHelper.accessor('email', {
    cell: (info) => (
      <Link to={`/users/${info.row.original.id}`}>{info.getValue()}</Link>
    ),

    header: () => <span>email</span>,
  }),
  columnHelper.accessor('firstName', {
    header: () => 'first name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: () => 'last name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('job', {
    header: () => 'job',
    cell: (info) => {
      const user = info.row.original;
      const { data } = useGetJobs();
      const noneJob = { name: 'none', id: 'null' };
      const jobs = [noneJob, ...data];

      const params = useUsersTableQueryParams();
      const { startUpdate, cancelUpdate } = useOptimisticUpdate([
        'users',
        params,
      ]);
      const displaySnackbar = useAlertSnackbar();
      const { closeSnackbar } = useSnackbar();

      const editJob = useEditUserJob(user.id);

      return (
        <Select
          size="small"
          value={info.getValue() ? info.getValue().id : noneJob.id}
          onChange={(e) => {
            const jobId = e.target.value;
            const jobName = jobs.filter((r) => r.id === jobId)[0].name;

            startUpdate({
              newData: (oldData) => ({
                count: oldData.count,
                rows: oldData.rows.map((u) => {
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
              Action: ({ snackbarKey }) => (
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
              ),
            });
          }}
        >
          {jobs.map((job) => (
            <MenuItem key={job.id} name={job.name} value={job.id}>
              {job.name}
            </MenuItem>
          ))}
        </Select>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: () => 'status',
    cell: (info) => <StatusLabel value={info.getValue()} />,
  }),
  columnHelper.accessor('createdAt', {
    header: () => <span>creation date</span>,
    cell: (info) => new Date(info.getValue()).toUTCString(),
  }),
  columnHelper.display({
    id: 'edit',
    cell: (info) => <EditUserCell cell={info} />,
  }),
  columnHelper.accessor('select', {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        icon={icon}
        checkedIcon={checkedIcon}
      />
    ),
  }),
];
