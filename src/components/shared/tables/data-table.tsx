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
  // New props for wallet address selection
  onWalletSelectionChange?: (selectedWallets: string[]) => void
  walletAddressKey?: string // Key to access wallet address in row data (e.g., 'address', 'walletAddress')
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
  rowClickStyle = "cursor-pointer",
  onWalletSelectionChange,
  walletAddressKey = "address" // Default key for wallet address
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection,
    onRowSelectionChange: (updaterOrValue) => {
      // Call the original onRowSelectionChange if provided
      if (onRowSelectionChange) {
        onRowSelectionChange(updaterOrValue)
      }
      
      // Handle wallet address selection
      if (onWalletSelectionChange) {
        // Get the new selection state
        const newSelection = typeof updaterOrValue === 'function' 
          ? updaterOrValue(rowSelection) 
          : updaterOrValue;
        
        // Extract wallet addresses from selected rows
        const selectedWalletAddresses: string[] = Object.keys(newSelection)
          .filter(rowId => newSelection[rowId])
          .map(rowId => {
            const rowData = data.find((row: any) => row.id === rowId) as any;
            return rowData?.[walletAddressKey] || rowId; // Fallback to rowId if address not found
          })
          .filter(Boolean); // Remove any undefined/null values
        
        onWalletSelectionChange(selectedWalletAddresses);
      }
    },
    getRowId: (row: any) => row.id,
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
    <div className="rounded-[1.5rem]   overflow-hidden bg-[#172329]">
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

// Example usage in your component:
/*
const [selectedWalletAddresses, setSelectedWalletAddresses] = useState<string[]>([]);
const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

<DataTable
  columns={columns}
  data={walletData}
  enableRowSelection={true}
  rowSelection={rowSelection}
  onRowSelectionChange={setRowSelection}
  onWalletSelectionChange={setSelectedWalletAddresses}
  walletAddressKey="address" // or "walletAddress", "id", etc. based on your data structure
/>

// selectedWalletAddresses will now contain an array of wallet addresses
console.log("Selected wallets:", selectedWalletAddresses);
*/