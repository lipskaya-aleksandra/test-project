import { Await, useLoaderData, Link, json, defer } from 'react-router-dom';
import { Suspense } from 'react';
import { TablePagination, Alert, Skeleton, Container } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import Table from '../common/components/table/Table.jsx';
import store, { injectReducer } from '../common/store/config';
import { usePagination } from '../common/hooks/usePagination.js';
import UserFilters from './UserFilters.jsx';
import EditActions from '../common/components/EditActions.jsx';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, userApi } from './userApiSlice.js';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import UsersTable from './UsersTable.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import QueryWrapper from '../common/components/QueryWrapper.jsx';
import { useDeleteUser } from './api/useDeleteUser.js';
import EditUserCell from './EditUserCell.jsx';

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
    cell: (info) => <EditUserCell cell={info} />,
  }),
];

export default function UsersPage() {
  const { pageParams, setPageParams } = usePagination();

  return (
    <Container
      sx={{
        width: '100vw',
        padding: 4,
        mt: 6,
      }}
    >
      <UserFilters />

      <QueryWrapper
        suspenseFallback={
          <Table
            columns={columns}
            pageSize={pageParams.perPage}
            loading={true}
          />
        }
      >
        <UsersTable columns={columns} />
      </QueryWrapper>

      <TablePagination
        component="div"
        count={100}
        page={pageParams.page - 1}
        slotProps={{
          actions: {
            previousButton: {
              sx: {
                ':focus': { outline: 'none' },
              },
            },
            nextButton: {
              sx: {
                ':focus': { outline: 'none' },
              },
            },
          },
        }}
        onPageChange={(e, value) => {
          setPageParams({ page: value + 1 });
        }}
        rowsPerPage={pageParams.perPage}
        onRowsPerPageChange={(e) => {
          setPageParams({ perPage: e.target.value, page: 1 });
        }}
      />
    </Container>
  );
}
