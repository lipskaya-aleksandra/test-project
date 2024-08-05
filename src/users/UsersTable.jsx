import { usePagination } from '../common/hooks/usePagination';
import { useNavigate } from 'react-router-dom';
import Table from '../common/components/table/Table.jsx';
import { useGetUsers } from './api/useGetUsers.js';
import { useState } from 'react';
import { Button, Stack, TablePagination, Typography } from '@mui/material';
import { columns } from './usersTableColumns.jsx';
import { Delete } from '@mui/icons-material';
import { useDeleteManyUsers } from './api/useDeleteManyUsers.js';
import useQueryParams from '../common/hooks/useQueryParams.js';
import useDebouncedValue from '../common/hooks/useDebouncedValue.js';
import { useSearch } from '../common/hooks/useSearch.js';

export default function UsersTable({ defaultFilters }) {
  const { queryParams } = useQueryParams(defaultFilters);
  const { search } = useSearch();
  const debouncedSearchTerm = useDebouncedValue(search, 1000);

  const { pageParams, setPageParams } = usePagination();

  const { data } = useGetUsers({
    ...pageParams,
    ...queryParams,
    search: debouncedSearchTerm,
  });

  const [selected, setSelected] = useState({});
  const deleteMany = useDeleteManyUsers();

  const selectedCount = Object.entries(selected).length;

  const onDeleteSelected = () => {
    const ids = Object.keys(selected);
    if (ids.length <= 0) return;
    deleteMany.mutate(ids);
  };

  return (
    <>
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
