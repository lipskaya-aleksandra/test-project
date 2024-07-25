import { usePagination } from '../hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RedirectToCurrentPagination = ({ children, path }) => {
  const { pageParams } = usePagination();
  const [searchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams.entries());
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParamsObj.page || !searchParamsObj.perPage) {
      navigate(
        `/${path}?page=${pageParams.page}&perPage=${pageParams.perPage}`,
      );
    }
  }, [searchParams]);

  return children;
};

export default RedirectToCurrentPagination;
