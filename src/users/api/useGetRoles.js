import { useSuspenseQuery } from '@tanstack/react-query';
import useApiClient from '../../common/hooks/useApiClient';

export function useGetRoles() {
  const apiClient = useApiClient();

  const getRolesFn = async () => {
    const response = await apiClient.get(`/roles`);

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: ['roles'],
    queryFn: getRolesFn,
  });
}
