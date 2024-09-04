import { useGetUserById } from '../api/useGetUserById';

import UserCard from './UserCard';

export default function UserDataWrapper({ userId }) {
  const { data } = useGetUserById(userId);

  return <UserCard user={data} />;
}
