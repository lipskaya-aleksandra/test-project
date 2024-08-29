import { useSuspenseQuery } from '@tanstack/react-query';

import useApiClient from '../../common/hooks/useApiClient';

export function useGetAccount(options) {
  const apiClient = useApiClient();

  const getAccount = async () => {
    const response = await apiClient.get(`/account`);

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: ['users', 'account'],
    queryFn: getAccount,
    ...options,
  });
}