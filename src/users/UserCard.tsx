import {
  Avatar,
  Card,
  CardHeader,
  Grid,
  Typography,
  Link,
  Skeleton,
  Stack,
  Button,
} from "@mui/material";
import { LocationOn, Link as LinkIcon, Language } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { User } from "./UserType";

type Props = {
  user?: User;
  loading?: boolean;
};

export default function UserCard(props: Props) {
  const { user, loading } = props;
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <Card sx={{ minWidth: "400px" }}>
        {loading && (
          <CardHeader
            avatar={<Skeleton variant="circular" width={40} height={40} />}
            title={<Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />}
            subheader={<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
          />
        )}
        {!loading && user && (
          <CardHeader
            avatar={<Avatar src={user.profile_image} />}
            title={
              <Typography gutterBottom variant="h5" component="h2">
                {user.display_name}
              </Typography>
            }
            subheader={
              <Typography variant="caption" display="block" gutterBottom>
                Last seen: {new Date(user.last_access_date).toUTCString()}
              </Typography>
            }
          />
        )}

        {loading && (
          <>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </>
        )}

        {!loading && user && (
          <>
            <Stack alignItems="center" direction="row" gap={2}>
              <LocationOn sx={{ m: "4px" }} />
              <Typography>{user.location || "-"}</Typography>
            </Stack>
            <Stack alignItems="center" direction="row" gap={2}>
              {user.link ? (
                <>
                  <LinkIcon sx={{ m: "4px" }} />
                  <Link>{user.link}</Link>
                </>
              ) : (
                <Typography>"-"</Typography>
              )}
            </Stack>
            <Stack alignItems="center" direction="row" gap={2}>
              <Language sx={{ m: "4px" }} />
              <Typography>
                {user.website_url ? <Link>{user.website_url}</Link> : "-"}
              </Typography>
            </Stack>
          </>
        )}
      </Card>
    </Grid>
  );
}
