import { usePagination } from "../hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  children: JSX.Element;
  path: string;
};

const DefaultPageRedirect = (props: Props) => {
  const { children, path } = props;
  const [pageParams, _setPageParams] = usePagination();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!searchParams) {
      navigate(
        `/${path}?page=${pageParams.page}&perPage=${pageParams.perPage}`
      );
    }
  }, []);

  return children;
};

export default DefaultPageRedirect;
