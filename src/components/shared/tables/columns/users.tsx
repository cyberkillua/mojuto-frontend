import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button";

export type Users = {
    id: string;
    name: string;
    wallets: string
    date: string;
}

export const UsersColumns: ColumnDef<Users>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "noOfWalletsUploaded",
        header: "Wallets Uploaded",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "noOfAnalyticsRequests",
        header: "Requests",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "lastActiveAt",
        header: "Last Active",
        cell: info => info.getValue() ?? "N/A",
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