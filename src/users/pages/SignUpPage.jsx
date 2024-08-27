import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../api/useSignUp';
import UserForm from '../UserForm';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';

export default function SignUpPage() {
  const signUp = useSignUp();
  const navigate = useNavigate();
  const displaySnackbar = useAlertSnackbar();

  const onSubmit = async (data, setError) => {
    try {
      const response = await signUp(data);
      if (response.status === 201) {
        displaySnackbar({ message: 'Sign up completed successfully.' });
        navigate('/login');
      }
    } catch (e) {
      if (e.response.status === 409) {
        setError('email', { type: '409', message: 'Email already in use.' });
      }
    }
  };

  return <UserForm title={'Sign up'} onSubmit={onSubmit} withPassword />;
}
