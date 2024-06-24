import React from "react";
import { Navigate } from "react-router-dom";
import { usePagination } from "../hooks/usePagination";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DefaultPageRedirect = ({ children, path }) => {
  const [pageParams, setPageParams] = usePagination();
  const searchParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!searchParams) {
      navigate(`/${path}?page=${pageParams.page}&perPage=${pageParams.perPage}`);
      //return <Navigate to={`/${path}?page=${pageParams.page}&perPage=${pageParams.perPage}`} />;
    }
  }, []);



  return children;
};

export default DefaultPageRedirect;
