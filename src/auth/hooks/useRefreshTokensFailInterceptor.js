import { useNavigate } from 'react-router-dom';

export default function useRefreshTokensFailInterceptor() {
  const navigate = useNavigate();

  return [
    response => response,
    error => {
      if (error.response.status === 401) {
        navigate('/login', { replace: true });

        return null;
      }

      return Promise.reject(error);
    },
  ];
}
