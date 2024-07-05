import { usePagination } from "../hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DefaultPageRedirect = ({ children, path }) => {
  const [pageParams] = usePagination();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams) {
      navigate(
        `/${path}?page=${pageParams.page}&perPage=${pageParams.perPage}`
      );
    }
  }, []);

  return children;
};

export default DefaultPageRedirect;
