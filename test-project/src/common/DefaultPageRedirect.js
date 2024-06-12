import React from "react";
import { Navigate, useParams } from "react-router-dom";

const DefaultPageRedirect = ({ children, path }) => {
  const { page } = useParams();

  if (!page) {
    return <Navigate to={`/${path}/1`} />;
  }

  return children;
};

export default DefaultPageRedirect;
