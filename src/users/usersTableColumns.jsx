import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import StatusLabel from './components/StatusLabel';
import EditUserCell from './widgets/EditUserCell';
import JobCell from './widgets/JobCell';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: () => <span>id</span>,
  }),
  columnHelper.accessor('email', {
    cell: info => (
      <Link to={`/users/${info.row.original.id}`}>{info.getValue()}</Link>
    ),

    header: () => <span>email</span>,
  }),
  columnHelper.accessor('firstName', {
    header: () => 'first name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: () => 'last name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('job', {
    header: () => 'job',
    cell: info => <JobCell info={info} />,
  }),
  columnHelper.accessor('status', {
    header: () => 'status',
    cell: info => <StatusLabel value={info.getValue()} />,
  }),
  columnHelper.accessor('createdAt', {
    header: () => <span>creation date</span>,
    cell: info => new Date(info.getValue()).toUTCString(),
  }),
  columnHelper.display({
    id: 'edit',
    cell: info => <EditUserCell cell={info} />,
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
