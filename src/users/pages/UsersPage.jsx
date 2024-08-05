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
import useQueryParams from '../../common/hooks/useQueryParams.js';
import { statusColorMap } from '../statusMap.jsx';

const defaultFilters = { role: [], status: '' }; //, search: ''
const tabSx = {
  textTransform: 'none',
  '&.Mui-selected': {
    outline: 'none',
    border: 'none',
  },
  '&:focus': {
    outline: 'none',
    border: 'none',
  },
};

export default function UsersPage() {
  const navigate = useNavigate();

  const { pageParams } = usePagination();

  const { queryParams, setQueryParams } = useQueryParams({
    status: defaultFilters.status,
  });

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
        <UserFilters defaultFilters={defaultFilters} />

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

      <Tabs
        value={
          queryParams.status && queryParams.status.length > 0
            ? queryParams.status
            : 'all'
        }
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
        sx={{
          '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
          '& .MuiTabs-indicatorSpan': {
            width: '100%',
            backgroundColor:
              statusColorMap[
                queryParams.status && queryParams.status.length > 0
                  ? queryParams.status
                  : 'all'
              ],
          },
        }}
        onChange={(e, value) => {
          if (value === 'all') {
            setQueryParams({ status: '' });
          } else {
            setQueryParams({ status: value });
          }
        }}
      >
        <Tab
          sx={{
            ...tabSx,
            '&.Mui-selected': {
              color: statusColorMap['all'],
            },
          }}
          value={'all'}
          label="All"
        />
        <Tab
          sx={{
            ...tabSx,
            '&.Mui-selected': {
              color: statusColorMap['active'],
            },
          }}
          value={'active'}
          label="Active"
        />
        <Tab
          sx={{
            ...tabSx,
            '&.Mui-selected': {
              color: statusColorMap['pending'],
            },
          }}
          value={'pending'}
          label="Pending"
        />
        <Tab
          sx={{
            ...tabSx,
            '&.Mui-selected': {
              color: statusColorMap['blocked'],
            },
          }}
          value={'blocked'}
          label="Blocked"
        />
      </Tabs>

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
        <UsersTable defaultFilters={defaultFilters} />
      </QueryWrapper>
    </Container>
  );
}
