import { AppBar, Link, Toolbar } from "@mui/material";
import { Outlet, redirect } from "react-router-dom";
import { defaultSearchParams } from "../hooks/usePagination";

export default function Root() {
  const searchParams = new URLSearchParams(defaultSearchParams);
  return (
    <>
      <AppBar style={{ width: "100vw", marginTop: 0 }} position="fixed">
        <Toolbar>
          <Link
            sx={{ mr: 6 }}
            variant="body2"
            color={"inherit"}
            href={"/users?" + searchParams.toString()}
          >
            Users
          </Link>
          <Link
            variant="body2"
            color={"inherit"}
            href={"/posts?" + searchParams.toString()}
          >
            Posts
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export function rootLoader() {
  return redirect("/users");
}
