import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function UsersTable({ users }) {
  return (
    <TableContainer style={{ width: "100vw" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="center">username</TableCell>
            <TableCell align="center">age</TableCell>
            <TableCell align="center">created</TableCell>
            <TableCell align="center">type</TableCell>
            <TableCell align="center">last online</TableCell>
            <TableCell align="center">location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.user_id}
              </TableCell>
              <TableCell align="center">{user.display_name}</TableCell>
              <TableCell align="center">{user.age}</TableCell>
              <TableCell align="center">{user.creation_date}</TableCell>
              <TableCell align="center">{user.user_type}</TableCell>
              <TableCell align="center">{user.last_access_date}</TableCell>
              <TableCell align="center">{user.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // <List>
    //   {users.map((user) => (
    //     <ListItemButton key={user.user_id}>
    //       <ListItemText primary={user.display_name} />
    //     </ListItemButton>
    //   ))}
    // </List>
  );
}
