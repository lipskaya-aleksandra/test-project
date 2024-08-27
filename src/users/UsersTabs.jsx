import { Tab, Tabs } from '@mui/material';

import { defaultValues, usePagination } from '../common/hooks/usePagination';
import useQueryParams from '../common/hooks/useQueryParams';

import { statusColorMap } from './StatusLabel';
import { defaultFilters } from './defaultUserFilters';

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

export default function UsersTabs() {
  const { pageParams } = usePagination();
  const { queryParams, setQueryParams } = useQueryParams({
    defaults: { status: defaultFilters.status },
    allowOverrideKeys: ['page'],
  });

  return (
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
          setQueryParams({ status: '', page: defaultValues.page });
        } else {
          setQueryParams({ status: value, page: defaultValues.page });
        }
      }}
    >
      <Tab
        sx={{
          ...tabSx,
          '&.Mui-selected': {
            color: statusColorMap.all,
          },
        }}
        value="all"
        label="All"
      />
      <Tab
        sx={{
          ...tabSx,
          '&.Mui-selected': {
            color: statusColorMap.active,
          },
        }}
        value="active"
        label="Active"
      />
      <Tab
        sx={{
          ...tabSx,
          '&.Mui-selected': {
            color: statusColorMap.pending,
          },
        }}
        value="pending"
        label="Pending"
      />
      <Tab
        sx={{
          ...tabSx,
          '&.Mui-selected': {
            color: statusColorMap.blocked,
          },
        }}
        value="blocked"
        label="Blocked"
      />
    </Tabs>
  );
}
