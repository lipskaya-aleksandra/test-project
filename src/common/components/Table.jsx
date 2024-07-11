import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import TableCellFallback from './TableCellFallback';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function Table({
  data,
  columns,
  loading,
  pageSize,
  renderFallback,
}) {
  const table = useReactTable({
    data: data || Array(pageSize),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <TableContainer style={{ width: '100vw' }}>
      <MUITable>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell align="center" key={header.id}>
                  {header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  {!header.isPlaceholder && header.column.id}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover={true}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell align="center" key={cell.id}>
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
