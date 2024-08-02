import { useSuspenseQuery } from '@tanstack/react-query';
import { baseServerUrl } from '../../constants/server';
import useApiClient from '../../common/hooks/useApiClient';

export function useGetUserById(id, options) {
  const apiClient = useApiClient();

  const getUserFn = async () => {
    const response = await apiClient.get(`/users/${id}`);

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: ['users', id],
    queryFn: getUserFn,
    ...options,
  });
}
