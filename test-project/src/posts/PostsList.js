import { List, ListItemButton, ListItemText } from "@mui/material";

export default function PostsList({ posts }) {
  return (
    <List>
      {posts.map((post) => (
        <ListItemButton key={post.post_id}>
          <ListItemText primary={post.title} />
        </ListItemButton>
      ))}
    </List>
  );
}
