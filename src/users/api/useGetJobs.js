import { useSuspenseQuery } from '@tanstack/react-query';

import useApiClient from '../../common/hooks/useApiClient';

export function useGetJobs(options) {
  const apiClient = useApiClient();

  const getJobsFn = async () => {
    const response = await apiClient.get(`/jobs`);

    return response.data;
  };

  return useSuspenseQuery({
    queryKey: ['jobs'],
    queryFn: getJobsFn,
    ...options,
  });
}
