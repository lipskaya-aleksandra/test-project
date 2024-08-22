import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../api/useCreateUser';
import UserForm from '../UserForm';
import { usePagination } from '../../common/hooks/usePagination';

export default function CreateUserPage() {
  const createUser = useCreateUser({
    onSuccess: () => {
      navigate(`/users?page=${pageParams.page}&perPage=${pageParams.perPage}`);
    },
  });

  const navigate = useNavigate();
  const { pageParams } = usePagination();
  const onSubmit = (data) => {
    if (data.jobId === 'null') {
      data.jobId = null;
    }
    createUser.mutate(data);
  };

  return <UserForm onSubmit={onSubmit} />;
}
