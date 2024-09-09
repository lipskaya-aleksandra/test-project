import { Tab, Tabs } from '@mui/material';
import { useTransition } from 'react';

import { defaultValues } from '../../common/hooks/usePagination';
import useQueryParams from '../../common/hooks/useQueryParams';
import { statusColorMap } from '../components/StatusLabel';
import { defaultFilters } from '../defaultUserFilters';

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
  const { queryParams, setQueryParams } = useQueryParams({
    defaults: { status: defaultFilters.status },
    allowOverrideKeys: ['page'],
  });

  const [, startTransition] = useTransition();

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
            ].color,
        },
      }}
      onChange={(e, value) => {
        startTransition(() => {
          if (value === 'all') {
            setQueryParams({ status: '', page: defaultValues.page });
          } else {
            setQueryParams({ status: value, page: defaultValues.page });
          }
        });
      }}
    >
      <Tab
        sx={{
          ...tabSx,
          '&.Mui-selected': {
            color: statusColorMap.all.color,
          },
        }}
        value="all"
        label="All"
      />
      <Tab
        sx={{
          ...tabSx,
          '&.Mui-selected': {
            color: statusColorMap.active.color,
          },
        }}
        value="active"
        label="Active"
      />
      <Tab
        sx={{
          ...tabSx,
          '&.Mui-selected': {
            color: statusColorMap.pending.color,
          },
        }}
        value="pending"
        label="Pending"
      />
      <Tab
        sx={{
          ...tabSx,
          '&.Mui-selected': {
            color: statusColorMap.blocked.color,
          },
        }}
        value="blocked"
        label="Blocked"
      />
    </Tabs>
  );
}
