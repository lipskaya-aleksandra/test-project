import { Typography, TablePagination, Alert } from '@mui/material';
import PostsList from './PostsList.jsx';
import { usePagination } from '../common/hooks/usePagination.js';
import QueryWrapper from '../common/components/QueryWrapper.jsx';

export default function PostsPage() {
  const { pageParams, setPageParams } = usePagination();

  return (
    <QueryWrapper
      suspenseFallback={<Typography>Loading posts...</Typography>}
      errorFallback={<Alert severity="error">Could not load posts</Alert>}
    >
      <PostsList />
      <TablePagination
        component="div"
        count={100}
        page={pageParams.page - 1}
        onPageChange={(e, value) => {
          setPageParams({ page: value + 1 });
        }}
        rowsPerPage={pageParams.perPage}
        onRowsPerPageChange={(e) => {
          setPageParams({ perPage: e.target.value, page: 1 });
        }}
      />
    </QueryWrapper>
  );
}
