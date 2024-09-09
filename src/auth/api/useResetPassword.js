import useApiClient from '../../common/hooks/useApiClient';
import useQueryParams from '../../common/hooks/useQueryParams';

export function useResetPassword() {
  const apiClient = useApiClient();

  const { queryParams } = useQueryParams({
    defaults: { resetPasswordToken: '' },
  });

  const resetPassword = async data => {
    const response = await apiClient.post(`/auth/reset-password`, {
      resetPasswordToken: queryParams.resetPasswordToken,
      ...data,
    });

    return response;
  };

  return resetPassword;
}
