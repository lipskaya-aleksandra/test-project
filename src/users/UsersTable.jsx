import { usePagination } from '../common/hooks/usePagination';
import { createColumnHelper } from '@tanstack/react-table';
import EditCell from '../common/components/table/EditCell.jsx';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from './userApiSlice.js';
import Table from '../common/components/table/Table.jsx';
import { Link } from 'react-router-dom';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

const columnHelper = createColumnHelper();

const columns = [
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
  columnHelper.accessor('createdAt', {
    header: () => <span>creation date</span>,
    cell: (info) => new Date(info.getValue()).toUTCString(),
  }),
  columnHelper.display({
    id: 'edit',
    cell: (info) => {
      const navigate = useNavigate();
      const [deleteUser] = useDeleteUserMutation();
      const id = info.row.getValue('id');
      const onDelete = () => {
        deleteUser({ id });
      };
      const onEdit = () => {
        navigate(`/users/${id}`);
      };
      return <EditCell onDelete={onDelete} onEdit={onEdit} />;
    },
  }),
];

export default function UsersTable() {
  const { pageParams } = usePagination();
  const { data } = useQuery({
    queryKey: ['users', pageParams],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/users?page=${pageParams.page}&perPage=${pageParams.perPage}`,
        { mode: 'cors' },
      );

      console.log(response);

      return await response.json();
    },
    initialData: [],
  });

  console.log(data);

  return <Table data={data} columns={columns} />;
}
