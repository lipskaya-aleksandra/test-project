import { useSuspenseQuery } from '@tanstack/react-query';
import { baseServerUrl } from '../../constants/server';
import useApiClient from '../../common/hooks/useApiClient';

export function useGetUsers(pageParams) {
  const apiClient = useApiClient();

  const getUsersFn = async () => {
    const response = await apiClient.get(
      `/users?page=${pageParams.page}&perPage=${pageParams.perPage}`,
    );

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: ['users', pageParams.page, pageParams.perPage],
    queryFn: getUsersFn,
  });
}
