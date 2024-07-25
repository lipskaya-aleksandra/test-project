import { Await, useLoaderData, Link, json, defer } from 'react-router-dom';
import { Suspense } from 'react';
import { TablePagination, Alert, Skeleton } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import Table from '../common/components/table/Table.jsx';
import store, { injectReducer } from '../common/store/config';
import { usePagination } from '../common/hooks/usePagination.js';
import UserFilters from './UserFilters.jsx';
import EditCell from '../common/components/table/EditCell.jsx';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, userApi } from './userApiSlice.js';

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

export default function UsersPage() {
  const { pageParams, setPageParams } = usePagination();

  const { users } = useLoaderData();
  const renderAvatarFallback = (cell) => {
    if (cell.column.id === 'profile_image') {
      return <Skeleton variant="circular" width={40} height={40} />;
    }

    return null;
  };

  return (
    <>
      <UserFilters />
      <Suspense
        fallback={
          <Table
            columns={columns}
            pageSize={pageParams.perPage}
            loading={true}
            renderFallback={renderAvatarFallback}
          />
        }
      >
        <Await
          resolve={users}
          errorElement={<Alert severity="error">Could not load users</Alert>}
        >
          {(resolvedUsers) => <Table data={resolvedUsers} columns={columns} />}
        </Await>
      </Suspense>
      <TablePagination
        component="div"
        count={100}
        page={pageParams.page - 1}
        onPageChange={(e, value) => {
          setPageParams({ page: value + 1 });
        }}
        rowsPerPage={pageParams.perPage}
        onRowsPerPageChange={(e) => {
          setPageParams({ perPage: e.target.value, page: 1 });
        }}
      />
    </>
  );
}

export async function usersLoader({ request }) {
  try {
    injectReducer(userApi.reducerPath, userApi.reducer);
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get('page');
    const perPage = searchParams.get('perPage');

    const response = await store
      .dispatch(userApi.endpoints.getUsers.initiate({ page, perPage }))
      .unwrap();

    return defer({ users: response });
  } catch (e) {
    console.log(e);
    throw json(
      { message: 'Error occured while fetching users' },
      { status: e.status },
    );
  }
}
