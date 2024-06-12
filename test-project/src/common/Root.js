import { AppBar, Menu, MenuItem, Typography } from "@mui/material";
import { Outlet, redirect } from "react-router-dom";

export default function Root() {
  return (
    <>
      <AppBar>
        <Menu>
          <MenuItem>
            <Typography>Users</Typography>
          </MenuItem>
          <MenuItem>
            <Typography>Posts</Typography>
          </MenuItem>
        </Menu>
      </AppBar>
      <Outlet />
    </>
  );
}

export function rootLoader() {
  return redirect("/users");
}
