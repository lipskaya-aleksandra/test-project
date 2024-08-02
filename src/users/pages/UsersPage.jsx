import { Alert, Container, Stack, Typography } from '@mui/material';
import Table from '../../common/components/table/Table.jsx';
import { usePagination } from '../../common/hooks/usePagination.js';
import UsersTable from '../UsersTable.jsx';
import QueryWrapper from '../../common/components/QueryWrapper.jsx';
import { columns } from '../usersTableColumns.jsx';

export default function UsersPage() {
  const { pageParams } = usePagination();

  return (
    <Container sx={{ pb: 2 }}>
      <Typography variant="h4">Users</Typography>

      <QueryWrapper
        suspenseFallback={
          <Table
            columns={columns}
            pageSize={pageParams.perPage}
            loading={true}
          />
        }
        errorFallback={<Alert severity="error">Could not load users</Alert>}
      >
        <UsersTable />
      </QueryWrapper>
    </Container>
  );
}
