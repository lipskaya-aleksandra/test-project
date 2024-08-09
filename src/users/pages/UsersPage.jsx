import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Table from '../../common/components/table/Table.jsx';
import { usePagination } from '../../common/hooks/usePagination.js';
import UsersTable from '../UsersTable.jsx';
import QueryWrapper from '../../common/components/QueryWrapper.jsx';
import { columns } from '../usersTableColumns.jsx';
import { Add } from '@mui/icons-material';
import UserFilters from '../UserFilters.jsx';
import { useNavigate } from 'react-router-dom';
import UsersTabs from '../UsersTabs.jsx';

export const defaultFilters = { job: [], status: '' };

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
      </Stack>

      <UsersTabs />

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
