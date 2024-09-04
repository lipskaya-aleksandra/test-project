import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import errorImg from '../../assets/pngwing.com.png';
import QueryWrapper from '../../common/components/QueryWrapper';
import UserCard from '../components/UserCard';
import UserCardFallback from '../components/UserCardFallback';

export default function UserDetailPage() {
  const { userId } = useParams();

  return (
    <QueryWrapper
      suspenseFallback={<UserCardFallback />}
      errorFallback={
        <Box sx={{ textAlign: 'center' }}>
          <img style={{ height: 300 }} src={errorImg} alt="ERROR 404" />
          <Typography color="#5893b0" variant="h5">
            Record not found.
          </Typography>
        </Box>
      }
    >
      <UserCard userId={userId} />
    </QueryWrapper>
  );
}
