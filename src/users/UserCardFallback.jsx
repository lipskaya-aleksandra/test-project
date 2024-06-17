import { Avatar, Card, Container, Typography, Skeleton } from "@mui/material";
import { LocationOn, Link as LinkIcon, Language } from "@mui/icons-material";

export default function UserCardFallback() {
  return (
    <Card>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
      <Typography variant="caption" display="block" gutterBottom>
        Last seen: <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </Typography>
      <Typography>
        <LocationOn /> <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </Typography>
      <Typography>
        <LinkIcon /> <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </Typography>
      <Typography>
        <Language /> <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </Typography>
    </Card>
  );
}
