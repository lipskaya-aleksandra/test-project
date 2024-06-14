import { AppBar, Button, Toolbar } from "@mui/material";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { usePagination } from "../hooks/usePagination";

export default function Root() {
  const navigate = useNavigate();
  const [pageParams, setPageParams] = usePagination();
  const searchParams = new URLSearchParams({ page: 1, perPage: 10 });//new URLSearchParams(pageParams);
  return (
    <>
      <AppBar style={{ width: "100vw", marginTop: 0 }} position="fixed">
        <Toolbar>
          <Button
            sx={{ mr: 6 }}
            variant="contained"
            //onClick={() => navigate("/users?" + searchParams.toString())}
            onClick={() => {
              setPageParams({ page: 1, perPage: 10 });
              navigate("/users?" + searchParams.toString())
            }}
          >
            Users
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPageParams({ page: 1, perPage: 10 });
              navigate("/posts?" + searchParams.toString())
            }}
          >
            Posts
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export function rootLoader() {
  return redirect("/users?page=1&perPage=10");
}
