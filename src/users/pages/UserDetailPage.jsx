import { useParams } from 'react-router-dom';

import { useGetUserById } from '../api/useGetUserById';
import UserCard from '../components/UserCard';

export default function UserDetailPage() {
  const { userId } = useParams();
  const { data } = useGetUserById(userId);

  return <UserCard user={data} />;
}
