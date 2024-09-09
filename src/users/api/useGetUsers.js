import { useSuspenseQuery } from '@tanstack/react-query';

import useApiClient from '../../common/hooks/useApiClient';

export function useGetUsers(params, options) {
  const apiClient = useApiClient();

  const getUsersFn = async () => {
    const response = await apiClient.get(`/users`, {
      params,
      paramsSerializer: { indexes: null },
    });

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: ['users', params],
    queryFn: getUsersFn,
    ...options,
  });
}
