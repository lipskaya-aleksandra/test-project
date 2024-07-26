import { usePagination } from '../common/hooks/usePagination';
import { createColumnHelper } from '@tanstack/react-table';
import EditCell from '../common/components/EditActions.jsx';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from './userApiSlice.js';
import Table from '../common/components/table/Table.jsx';
import { Link } from 'react-router-dom';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export default function UsersTable({ columns }) {
  const { pageParams } = usePagination();
  const { data } = useSuspenseQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users', pageParams.page, pageParams.perPage],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/users?page=${pageParams.page}&perPage=${pageParams.perPage}`,
        { mode: 'cors' },
      );
      return await response.json();
    },
  });

  return <Table data={data} columns={columns} />;
}
