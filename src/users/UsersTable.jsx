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
          {/* <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="center">username</TableCell>
            <TableCell align="center">age</TableCell>
            <TableCell align="center">created</TableCell>
            <TableCell align="center">type</TableCell>
            <TableCell align="center">last online</TableCell>
            <TableCell align="center">location</TableCell>
          </TableRow> */}
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
            // users.map((user) => (
            //   <TableRow
            //     key={user.user_id}
            //     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            //     hover={true}
            //     onClick={() => {
            //       navigate(`/users/${user.user_id}`);
            //     }}
            //   >
            //     <TableCell component="th" scope="row">
            //       {user.user_id}
            //     </TableCell>
            //     <TableCell align="center">{user.display_name}</TableCell>
            //     <TableCell align="center">{user.age}</TableCell>
            //     <TableCell align="center">{user.creation_date}</TableCell>
            //     <TableCell align="center">{user.user_type}</TableCell>
            //     <TableCell align="center">{user.last_access_date}</TableCell>
            //     <TableCell align="center">{user.location}</TableCell>
            //   </TableRow>
            // ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    // <List>
    //   {users.map((user) => (
    //     <ListItemButton key={user.user_id}>
    //       <ListItemText primary={user.display_name} />
    //     </ListItemButton>
    //   ))}
    // </List>
  );
}
