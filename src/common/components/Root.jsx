import { AppBar, Button, Link, Toolbar } from "@mui/material";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { usePagination } from "../hooks/usePagination";

export default function Root() {
  const navigate = useNavigate();
  const [pageParams, setPageParams] = usePagination();
  const searchParams = new URLSearchParams({ page: 1, perPage: 10 }); //new URLSearchParams(pageParams);
  return (
    <>
      <AppBar style={{ width: "100vw", marginTop: 0 }} position="fixed">
        <Toolbar>
          <Link
            sx={{ mr: 6 }}
            variant="body2"
            color={"inherit"}
            href={"/users?" + searchParams.toString()}
            //onClick={() => navigate("/users?" + searchParams.toString())}
            // onClick={() => {
            //   setPageParams({ page: 1, perPage: 10 });
            //   navigate("/users?" + searchParams.toString());
            // }}
          >
            Users
          </Link>
          <Link
            // variant="contained"
            // onClick={() => {
            //   setPageParams({ page: 1, perPage: 10 });
            //   navigate("/posts?" + searchParams.toString());
            // }}
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
  return redirect("/users?page=1&perPage=10");
}
