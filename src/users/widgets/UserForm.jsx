import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import PasswordValidationBox from '../../auth/widgets/PasswordValidationBox';
import QueryWrapper from '../../common/components/QueryWrapper';
import LoadingButton from '../../common/components/form/LoadingButton';
import PasswordInput from '../../common/components/form/PasswordInput';
import {
  userFormSchema,
  userFormWithPasswordSchema,
} from '../utils/userFormValidation';

import { noneJob, JobSelect } from './JobSelect';

const textInputProps = {
  sx: {
    mt: 1,
    mb: 1,
  },
  size: 'small',
  fullWidth: true,
  variant: 'outlined',
};

export default function UserForm({
  onSubmit,
  user,
  withPassword,
  title,
  loading,
}) {
  const formMethods = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      jobId: noneJob.id,
    },
    values: user && {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,

      jobId: user.job?.id,
    },
    resolver: zodResolver(
      withPassword ? userFormWithPasswordSchema : userFormSchema,
    ),
  });

  const onSubmitInterceptor = data => {
    onSubmit({ ...data, jobId: data.jobId === noneJob.id ? null : data.jobId });
  };

  const navigate = useNavigate();

  return (
    <Stack>
      <Typography fontWeight={300} fontSize={24} textAlign="center">
        {title}
      </Typography>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmitInterceptor)}>
          <Container maxWidth="xs">
            <Controller
              name="firstName"
              control={formMethods.control}
              render={({ field }) => (
                <TextField label="First name" {...field} {...textInputProps} />
              )}
            />

            <Controller
              name="lastName"
              control={formMethods.control}
              render={({ field }) => (
                <TextField label="Last name" {...field} {...textInputProps} />
              )}
            />

            <Controller
              name="email"
              control={formMethods.control}
              render={({
                field: { ref, ...fieldProps },
                fieldState: { error },
              }) => (
                <TextField
                  error={!!error}
                  helperText={error?.message}
                  label="Email"
                  {...fieldProps}
                  {...textInputProps}
                  inputRef={ref}
                />
              )}
            />

            {withPassword && (
              <Fragment>
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
              </Fragment>
            )}

            <QueryWrapper
              suspenseFallback={
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              }
              errorFallback={
                <Alert severity="error">Couldn&apos;t load jobs</Alert>
              }
            >
              <Controller
                render={({ field: { ref, value, onChange } }) => (
                  <JobSelect onChange={onChange} ref={ref} value={value} />
                )}
                name="jobId"
                control={formMethods.control}
                defaultValue={noneJob.id}
              />
            </QueryWrapper>

            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                variant="outlined"
              >
                Cancel
              </Button>

              <LoadingButton
                sx={{ '&:focus': { outline: 'none' } }}
                type="submit"
                variant="contained"
                loading={loading}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Container>
        </form>
      </FormProvider>
    </Stack>
  );
}
