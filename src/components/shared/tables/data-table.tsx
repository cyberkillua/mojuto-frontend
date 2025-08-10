import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  OnChangeFn,
} from "@tanstack/react-table"

import { LoaderCircle } from "lucide-react"

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
  isLoading?: boolean
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  enableRowSelection?: boolean
  // Optional row click configuration
  rowClickable?: boolean
  onRowClick?: (rowData: TData) => void
  rowHoverStyle?: string
  rowClickStyle?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  rowSelection = {},
  onRowSelectionChange,
  enableRowSelection = false,
  rowClickable = false,
  onRowClick,
  rowHoverStyle = "hover:bg-[#21343F]",
  rowClickStyle = "cursor-pointer"
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection,
    onRowSelectionChange,
    state: {
      rowSelection,
    },
  })

  const handleRowClick = (rowData: TData, event: React.MouseEvent) => {
    // Only handle click if rowClickable is true and onRowClick is provided
    console.log(event)
    if (rowClickable && onRowClick) {
      onRowClick(rowData)
    }
  }

  const handleCellClick = (event: React.MouseEvent, columnId: string) => {
    // Prevent row click for specific columns (like checkboxes and actions)
    const preventRowClick = ['select', 'actions']
    if (preventRowClick.includes(columnId)) {
      event.stopPropagation()
    }
  }

  return (
    <div className="rounded-[1.5rem] bg-[#172329]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="!border-0 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`text-[#8EA2AD] border-r border-r-[#192830] text-[1.3rem] font-medium px-[2rem] py-[1.7rem]`}
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
          {
            isLoading ? (
              <TableRow className="hover:bg-transparent py-[7rem]">
                <TableCell className="mx-auto py-[2rem]" colSpan={columns.length}>
                  <LoaderCircle className="animate-spin size-[2.5rem] text-[#D5F0FF] mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`
                      text-[#D5F0FF] !border-0 text-[1.2rem] data-[state=selected]:bg-transperent transition-colors
                      ${rowClickable ? rowClickStyle : 'hover:bg-transparent'}
                      ${rowClickable ? rowHoverStyle : ''}
                    `}
                    onClick={(e) => handleRowClick(row.original, e)}
                  >
                    {row.getVisibleCells().map((cell, idx) => (
                      <TableCell
                        key={cell.id}
                        className={`${idx == 3 ? "px-[2rem] w-[4rem]" : "px-[2rem] py-[1.7rem]"} border-r border-r-[#192830]`}
                        onClick={(e) => handleCellClick(e, cell.column.id)}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="h-24 text-[1.2rem] text-[#D5F0FF] text-center">
                    No Data Available.
                  </TableCell>
                </TableRow>
              )
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}