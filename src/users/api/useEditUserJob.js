import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApiClient from '../../common/hooks/useApiClient';

export function useEditUserJob(id, options) {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const editJobFn = async (jobId) => {
    const response = await apiClient.patch(`/users/${id}/job`, {
      id: jobId,
    });

    return response;
  };

  return useMutation({
    mutationKey: ['users', id, 'job'],
    mutationFn: editJobFn,
    onSettled: () => {
      queryClient.invalidateQueries(['users', id]);
    },
    ...options,
  });
}
