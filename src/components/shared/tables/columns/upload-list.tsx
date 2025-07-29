import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button";
// import { AnyAaaaRecord } from "dns";
import { Checkbox } from "@/components/ui/checkbox";

export type uploadList = {
    id: string;
    name: string;
    wallets: string
    date: string;
}

export const uploadListColumns: ColumnDef<uploadList>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                // onCheckedChange={(value: AnyAaaaRecord) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
    },
    {
        accessorKey: "fileName",
        header: "Upload Title",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "uploadedOn",
        header: "Uploaded on",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "noOfWallets",
        header: "# Wallets",
        cell: info => info.getValue(),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-12 w-12 p-0 hover:bg-[#21343F]">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="size-8 text-[#D5F0FF66]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

];