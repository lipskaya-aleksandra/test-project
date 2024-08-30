import { Add } from '@mui/icons-material';
import { Alert, Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import QueryWrapper from '../../common/components/QueryWrapper';
import Table from '../../common/components/table/Table';
import { usePagination } from '../../common/hooks/usePagination';
import { columns } from '../usersTableColumns';
import UserFilters from '../widgets/UserFilters';
import UsersTable from '../widgets/UsersTable';
import UsersTabs from '../widgets/UsersTabs';

export default function UsersPage() {
  const navigate = useNavigate();

  const { pageParams } = usePagination();

  const onCreateUserClick = () => {
    navigate('/users/create');
  };

  return (
    <Container sx={{ pb: 2 }}>
      <Typography variant="h4">Users</Typography>

      <Stack
        sx={{
          mt: 3,
          mb: 2,
          flexDirection: { sm: 'row' },
          alignItems: 'flex-start',
        }}
      >
        <QueryWrapper
          errorFallback={<Alert severity="error">Could not load filters</Alert>}
        >
          <UserFilters />
        </QueryWrapper>

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
      </Stack>

      <UsersTabs />

      <QueryWrapper
        suspenseFallback={
          <Table columns={columns} pageSize={pageParams.perPage} loading />
        }
        errorFallback={<Alert severity="error">Could not load users</Alert>}
      >
        <UsersTable />
      </QueryWrapper>
    </Container>
  );
}
