import { usePagination } from '../hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CurrentPageRedirect = ({ children, path }) => {
  const [pageParams] = usePagination();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.size) {
      navigate(
        `/${path}?page=${pageParams.page}&perPage=${pageParams.perPage}`,
      );
    }
  }, [searchParams]);

  return children;
};

export default CurrentPageRedirect;
