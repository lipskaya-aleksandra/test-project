import { TableRow, TableCell, Skeleton } from "@mui/material";

export default function LoadingTableRow({ rowsNum }) {
  return [...Array(rowsNum)].map((row, indexRow) => (
    <TableRow
      key={indexRow}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="rectangular" />
      </TableCell>
      {[...Array(6)].map((row, index) => (
        <TableCell key={indexRow + " " + index}>
          <Skeleton animation="wave" variant="rectangular" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
