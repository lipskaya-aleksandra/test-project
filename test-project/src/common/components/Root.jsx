import { AppBar, Button, Toolbar } from "@mui/material";
import { Outlet, redirect, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar style={{ width: "100vw", marginTop: 0 }} position="fixed">
        <Toolbar>
          <Button
            sx={{ mr: 6 }}
            variant="contained"
            onClick={() => navigate("/users/1")}
          >
            Users
          </Button>
          <Button variant="contained" onClick={() => navigate("/posts/1")}>
            Posts
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export function rootLoader() {
  return redirect("/users/1");
}
