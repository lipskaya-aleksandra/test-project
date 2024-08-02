import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

export default function PostsList({ posts }) {
  return (
    <Container>
      <Typography variant="h4">Posts</Typography>
      <List>
        {posts.map((post) => (
          <ListItemButton key={post.question_id}>
            <ListItemText primary={post.title} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}
