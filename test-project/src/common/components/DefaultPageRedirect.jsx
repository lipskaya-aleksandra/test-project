import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { usePagination } from "../hooks/usePagination";

const DefaultPageRedirect = ({ children, path }) => {
  const [pageParams, setPageParams] = usePagination();

  if (!pageParams) {
    return <Navigate to={`/${path}?page=1&perPage=10`} />;
  }

  return children;
};

export default DefaultPageRedirect;
