import { List, ListItemButton, ListItemText } from "@mui/material";

export default function UsersList({ users }) {
  return (
    <List>
      {users.map((user) => (
        <ListItemButton key={user.user_id}>
          <ListItemText primary={user.display_name} />
        </ListItemButton>
      ))}
    </List>
  );
}
