import { List, ListItemButton, ListItemText } from "@mui/material";
import { Post } from "./PostType";

type Props = {
  posts: Post[];
};

export default function PostsList(props: Props) {
  const { posts } = props;
  return (
    <List style={{ width: "100vw" }}>
      {posts.map((post) => (
        <ListItemButton key={post.question_id}>
          <ListItemText primary={post.title} />
        </ListItemButton>
      ))}
    </List>
  );
}
