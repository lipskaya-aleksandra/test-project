import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useResetPassword } from '../api/useResetPassword';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import PasswordValidationBox from '../PasswordValidationBox';
import {
  AT_LEAST_ONE_DIGIT,
  AT_LEAST_ONE_LOWERCASE_LETTER,
  AT_LEAST_ONE_SYMBOL,
  AT_LEAST_ONE_UPPERCASE_LETTER,
} from '../userFormValidation';
import PasswordInput from '../../common/components/form/PasswordInput';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmedPassword: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword(data);
      if (response.status === 201) {
        displaySnackbar({ message: 'Password reset successfully.' });
        navigate('/login');
      }
    } catch (e) {}
  };

  const password = useWatch({
    control,
    name: 'password',
  });

  const hasOneDigit = AT_LEAST_ONE_DIGIT.test(password);
  const hasOneLowercaseLetter = AT_LEAST_ONE_LOWERCASE_LETTER.test(password);
  const hasOneUppercaseLetter = AT_LEAST_ONE_UPPERCASE_LETTER.test(password);
  const hasOneSymbol = AT_LEAST_ONE_SYMBOL.test(password);
  const hasMinLength8 = password.length >= 8;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs">
          <Typography fontWeight={300} fontSize={24} textAlign={'center'}>
            Reset password
          </Typography>

          <Controller
            name={'password'}
            control={control}
            render={({ field: { ref, ...fieldProps } }) => (
              <PasswordInput
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                {...fieldProps}
                {...textInputProps}
                inputRef={ref}
              />
            )}
          />

          <PasswordValidationBox
            hasOneDigit={hasOneDigit}
            hasOneLowercaseLetter={hasOneLowercaseLetter}
            hasOneUppercaseLetter={hasOneUppercaseLetter}
            hasOneSymbol={hasOneSymbol}
            hasMinLength8={hasMinLength8}
          />

          <Controller
            name={'confirmedPassword'}
            control={control}
            render={({ field: { ref, ...fieldProps } }) => (
              <PasswordInput
                error={!!errors.confirmedPassword}
                helperText={errors.confirmedPassword?.message}
                label="Confirm password"
                {...fieldProps}
                {...textInputProps}
                inputRef={ref}
              />
            )}
          />

          <Stack direction={'row'} justifyContent={'space-between'} mt={1}>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              sx={{ '&:focus': { outline: 'none' } }}
              variant={'outlined'}
            >
              Cancel
            </Button>

            <Button
              sx={{ '&:focus': { outline: 'none' } }}
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
            >
              Submit
            </Button>
          </Stack>
        </Container>
      </form>
    </Stack>
  );
}
