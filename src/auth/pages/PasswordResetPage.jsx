import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import PasswordInput from '../../common/components/form/PasswordInput';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import { useResetPassword } from '../api/useResetPassword';
import { passwordResetFormSchema } from '../utils/validation/passwordResetFormValidation';
import PasswordValidationBox from '../widgets/PasswordValidationBox';

const textInputProps = {
  sx: {
    mt: 1,
    mb: 1,
  },
  size: 'small',
  fullWidth: true,
  variant: 'outlined',
};

export default function PasswordResetPage() {
  const resetPassword = useResetPassword();
  const navigate = useNavigate();
  const displaySnackbar = useAlertSnackbar();

  const formMethods = useForm({
    defaultValues: {
      password: '',
      confirmedPassword: '',
    },
    resolver: zodResolver(passwordResetFormSchema),
  });

  const onSubmit = async data => {
    try {
      const response = await resetPassword(data);

      if (response.status === 201) {
        displaySnackbar({ message: 'Password reset successfully.' });
        navigate('/login');
      }
    } catch (e) {
      //
    }
  };

  return (
    <Stack
      sx={{
        width: 'fit-content',
        alignItems: 'center',
        margin: '0 auto',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Container maxWidth="xs">
            <Typography fontWeight={300} fontSize={24} textAlign="center">
              Reset password
            </Typography>

            <Controller
              name="password"
              control={formMethods.control}
              render={({
                field: { ref, ...fieldProps },
                fieldState: { error },
              }) => (
                <PasswordInput
                  error={!!error}
                  helperText={error?.message}
                  label="Password"
                  {...fieldProps}
                  {...textInputProps}
                  inputRef={ref}
                />
              )}
            />

            <PasswordValidationBox />

            <Controller
              name="confirmedPassword"
              control={formMethods.control}
              render={({
                field: { ref, ...fieldProps },
                fieldState: { error },
              }) => (
                <PasswordInput
                  error={!!error}
                  helperText={error?.message}
                  label="Confirm password"
                  {...fieldProps}
                  {...textInputProps}
                  inputRef={ref}
                />
              )}
            />

            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                sx={{ '&:focus': { outline: 'none' } }}
                variant="outlined"
              >
                Cancel
              </Button>

              <Button
                sx={{ '&:focus': { outline: 'none' } }}
                onClick={formMethods.handleSubmit(onSubmit)}
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
          </Container>
        </form>
      </FormProvider>
    </Stack>
  );
}
