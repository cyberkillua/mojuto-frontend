import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-[1.5rem] bg-[#172329]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, i) => (
           <TableRow
              key={headerGroup.id}
              className="!border-0 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`text-[#8EA2AD]  border-r border-r-[#192830] text-[1.3rem] font-medium px-[2rem] py-[1.7rem]`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="text-[#D5F0FF] hover:bg-transparent !border-0 text-[1.2rem]"
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <TableCell
                    key={cell.id}
                    className={`${idx == 3 ? "px-[2rem] w-[4rem]" : "px-[2rem] py-[1.7rem]"} border-r border-r-[#192830]`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}