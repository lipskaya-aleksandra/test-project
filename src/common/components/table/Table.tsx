import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TableCellFallback from "./TableCellFallback";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { ReactNode } from "react";

type Props<T> = {
  loading?: boolean;
  pageSize?: number;
  renderFallback?: (cell: { column: { id: string } }) => ReactNode;
  data?: T[];
  columns: ColumnDef<T, any>[];
};

export default function Table<T>(props: Props<T>) {
  const { data, columns, loading, pageSize, renderFallback } = props;
  const navigate = useNavigate();
  const table = useReactTable<T>({
    data: data || Array(pageSize),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <TableContainer sx={{ width: "100vw" }}>
      <MUITable>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell align="center" key={header.id}>
                  {header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell align="center" key={cell.id}>
                  =
                  {/* {loading && renderFallback !== undefined ? (
                    renderFallback(cell)
                  ) : (
                    <TableCellFallback />
                  )} */}
                  {loading && (renderFallback?.(cell) || <TableCellFallback />)}
                  {!loading &&
                    flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
}
