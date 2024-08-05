import { Link } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';

import EditUserCell from './EditUserCell.jsx';
import { statusMap } from './statusMap.jsx';

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
  columnHelper.accessor('role.name', {
    header: () => 'role',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: () => 'status',
    cell: (info) => statusMap[info.getValue()],
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
