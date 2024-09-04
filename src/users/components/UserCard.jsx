import {
  Email,
  Edit,
  ArrowBack,
  WorkOutlineOutlined,
  MoreVert,
} from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Typography,
  Stack,
  Button,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import BaseMenu from '../../common/components/menu/BaseMenu';

import StatusLabel from './StatusLabel';

export default function UserCard({ user, menuOptions }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ p: 1 }}>
      <CardHeader
        title={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography gutterBottom variant="h5">
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <StatusLabel value={user.status} />
          </Box>
        }
        action={
          menuOptions && (
            <BaseMenu
              tooltipTitle="Open edit menu"
              id="edit-menu"
              MenuIcon={<MoreVert />}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              arrowPosition={{ left: -4, top: 14 }}
            >
              {menuOptions}
            </BaseMenu>
          )
        }
        subheader={
          <Typography variant="caption" display="block" gutterBottom>
            Created: {new Date(user.createdAt).toUTCString()}
          </Typography>
        }
      />
      <CardContent>
        <Stack alignItems="center" direction="row" gap={2}>
          <Email />
          <Typography>{user.email}</Typography>
        </Stack>
        {user.job && (
          <Stack alignItems="center" direction="row" gap={2}>
            <WorkOutlineOutlined />
            <Typography>{user.job.name}</Typography>
          </Stack>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            navigate(`/users/edit/${user.id}`, {
              state: {
                user,
              },
            });
          }}
          startIcon={<Edit />}
          variant="outlined"
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
