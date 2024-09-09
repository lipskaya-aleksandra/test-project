import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import TableCellFallback from './TableCellFallback';

export default function Table({
  data,
  columns,
  loading,
  pageSize,
  renderFallback,
  selected,
  setSelected,
  getRowId,
}) {
  const table = useReactTable({
    data: data || Array(pageSize),
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selected || {},
    },
    enableRowSelection: !!data,
    onRowSelectionChange: setSelected,
    getRowId,
  });

  return (
    <TableContainer>
      <MUITable>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell align="center" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
            >
              {row.getVisibleCells().map(cell => (
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
