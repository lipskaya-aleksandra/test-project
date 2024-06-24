import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import LoadingTableRow from "../common/components/LoadingTableRow";
import { useNavigate } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("user_id", {
    cell: (info) => info.getValue(),
    header: () => <span>id</span>,
  }),
  columnHelper.accessor("display_name", {
    cell: (info) => info.getValue(),
    header: () => <span>username</span>,
  }),
  columnHelper.accessor("age", {
    header: () => "age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("creation_date", {
    header: () => <span>created</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: () => <span>type</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_access_date", {
    header: () => <span>last online</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location", {
    header: () => <span>location</span>,
    cell: (info) => info.getValue(),
  }),
];

export default function UsersTable({ users, loading, pageSize }) {
  const navigate = useNavigate();
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => originalRow.user_id,
  });
  return (
    <TableContainer style={{ width: "100vw" }}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell align="center" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {loading ? (
            <LoadingTableRow rowsNum={pageSize} />
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
                onClick={() => {
                  navigate(`/users/${row.id}`);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell align="center" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
