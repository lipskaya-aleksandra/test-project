import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { usePagination } from '../common/hooks/usePagination';
import { useGetPosts } from './api/useGetPosts';

export default function PostsList() {
  const { pageParams } = usePagination();
  const { data } = useGetPosts(pageParams);

  return (
    <Container>
      <Typography variant="h4">Posts</Typography>
      <List>
        {data.map((post) => (
          <ListItemButton key={post.question_id}>
            <ListItemText primary={post.title} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}
