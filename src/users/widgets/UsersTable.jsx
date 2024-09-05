import { Delete } from '@mui/icons-material';
import { Button, Stack, TablePagination, Typography } from '@mui/material';
import { useState, Fragment } from 'react';

import { UndoButton } from '../../common/components/snackbar/SnackbarActions.';
import Table from '../../common/components/table/Table';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import useOptimisticUpdate from '../../common/hooks/useOptimisticUpdate';
import { usePagination } from '../../common/hooks/usePagination';
import { useDeleteManyUsers } from '../api/useDeleteManyUsers';
import { useGetUsers } from '../api/useGetUsers';
import useUsersTableQueryParams from '../hooks/useUsersTableQueryParams';
import { columns } from '../usersTableColumns';

export default function UsersTable() {
  const { pageParams, setPageParams } = usePagination();

  const params = useUsersTableQueryParams();

  const { data } = useGetUsers(params);

  const [selected, setSelected] = useState({});
  const deleteMany = useDeleteManyUsers();

  const { startUpdate, cancelUpdate } = useOptimisticUpdate(['users', params]);
  const displaySnackbar = useAlertSnackbar();

  const selectedCount = Object.entries(selected).length;

  const onDeleteSelected = () => {
    const ids = Object.keys(selected);

    if (ids.length <= 0) return;
    startUpdate({
      newData: oldData => ({
        count: oldData.count,
        rows: oldData.rows.filter(u => !ids.includes(u.id.toString())),
      }),
      delay: 5000,
      updateFn: () => {
        deleteMany.mutate(ids, {
          onSuccess: () => {
            setSelected({});
          },
        });
      },
    });
    displaySnackbar({
      message: `Users with ids ${ids} deleted successfully`,
      Action: <UndoButton onUndo={cancelUpdate} />,
    });
  };

  return (
    <Fragment>
      <Stack direction="row" justifyContent="space-between">
        {selectedCount > 0 && (
          <Typography>Selected: {selectedCount}</Typography>
        )}

        <Button
          variant="contained"
          color="error"
          sx={{
            textTransform: 'none',
            ml: 'auto',
            '&:focus': { outline: 'none' },
          }}
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
        getRowId={row => row.id}
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
        onRowsPerPageChange={e => {
          setPageParams({ perPage: e.target.value, page: 1 });
        }}
      />
    </Fragment>
  );
}
