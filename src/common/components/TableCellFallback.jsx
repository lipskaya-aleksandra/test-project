import { TableRow, TableCell, Skeleton } from "@mui/material";

const fallbackMap = {
  profile_image: <Skeleton variant="circular" width={40} height={40} />,
};

export default function TableCellFallback(cell) {
  let fallback;
  if (cell && fallbackMap[cell.column.id]) {
    fallback = fallbackMap[cell.column.id];
  } else {
    fallback = <Skeleton variant="text" sx={{ fontSize: "1rem" }} />;
  }
  return fallback;
}
