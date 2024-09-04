import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LoadingButton from '../../common/components/form/LoadingButton';
import PasswordInput from '../../common/components/form/PasswordInput';
import { passwordResetFormSchema } from '../utils/validation/passwordResetFormValidation';

import PasswordValidationBox from './PasswordValidationBox';

const textInputProps = {
  sx: {
    mt: 1,
    mb: 1,
  },
  size: 'small',
  fullWidth: true,
  variant: 'outlined',
};

export default function PasswordResetForm({ loading, onSubmit }) {
  const navigate = useNavigate();

  const formMethods = useForm({
    defaultValues: {
      password: '',
      confirmedPassword: '',
    },
    resolver: zodResolver(passwordResetFormSchema),
  });

  return (
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

            <LoadingButton
              loading={loading}
              sx={{ '&:focus': { outline: 'none' } }}
              onClick={formMethods.handleSubmit(onSubmit)}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Stack>
        </Container>
      </form>
    </FormProvider>
  );
}
