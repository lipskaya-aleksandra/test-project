import { usePagination } from '../common/hooks/usePagination';
import { createColumnHelper } from '@tanstack/react-table';
import EditCell from '../common/components/EditActions.jsx';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from './userApiSlice.js';
import Table from '../common/components/table/Table.jsx';
import { Link } from 'react-router-dom';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useGetUsers } from './api/useGetUsers.js';
import { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TablePagination,
  Toolbar,
  Typography,
} from '@mui/material';
import { columns } from './usersTableColumns.jsx';
import { Delete } from '@mui/icons-material';
import UserFilters from './UserFilters.jsx';
import { Add } from '@mui/icons-material';
import { useDeleteManyUsers } from './api/useDeleteManyUsers.js';

export default function UsersTable() {
  const { pageParams, setPageParams } = usePagination();
  const { data } = useGetUsers(pageParams);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();
  const deleteMany = useDeleteManyUsers();

  const onCreateUserClick = () => {
    navigate('/users/create');
  };

  const selectedCount = Object.entries(selected).length;

  const onDeleteSelected = () => {
    const ids = Object.keys(selected);
    if (ids.length <= 0) return;
    deleteMany.mutate(ids);
  };

  return (
    <>
      <Box
        sx={{
          mt: 3,
          mb: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
        }}
      >
        <UserFilters />

        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            textWrap: 'nowrap',
            ml: { xs: 0, sm: 'auto' },
          }}
          onClick={onCreateUserClick}
          startIcon={<Add />}
        >
          Create user
        </Button>
      </Box>

      <Stack direction="row" justifyContent={'space-between'}>
        {selectedCount > 0 && (
          <Typography>Selected: {selectedCount}</Typography>
        )}

        <Button
          variant="contained"
          color="error"
          sx={{ textTransform: 'none', ml: 'auto' }}
          onClick={onDeleteSelected}
          startIcon={<Delete />}
          disabled={selectedCount <= 0}
        >
          Delete selected
        </Button>
      </Stack>

      <Table
        data={data.rows}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        getRowId={(row) => row.id}
      />

      <TablePagination
        component="div"
        count={data.count}
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
    </>
  );
}
