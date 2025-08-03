import { ColumnDef } from "@tanstack/react-table";

import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button";
// import { AnyAaaaRecord } from "dns";
import { Checkbox } from "@/components/ui/checkbox";
import DropDown from "../../common/dropdown";
import { SquarePen, Trash2 } from "lucide-react";

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
                className="size-[2.1rem] rounded-full data-[state=checked]:bg-[linear-gradient(145.74deg,#A2F8FF_10.32%,#99F7FF_20.28%,#39CBD8_44.55%,#14C1D0_57.31%,#43C9D5_95.05%)] [&_svg]:size-[1.5rem] border border-[#D5F0FF66]"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="size-[2.1rem] rounded-full data-[state=checked]:bg-[linear-gradient(145.74deg,#A2F8FF_10.32%,#99F7FF_20.28%,#39CBD8_44.55%,#14C1D0_57.31%,#43C9D5_95.05%)] data-[state=checked]-border-[#76F5FF] border [&_svg]:size-[1.3rem] border-[#D5F0FF66]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
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
        cell: () => {
            return (
                <DropDown
                    dropdownMenuIems={[
                        <>
                            <SquarePen
                                className="text-[#ADB1B8] !size-[1.7rem]"
                            />
                            Edit
                        </>,
                        <>
                            <Trash2
                                className="text-[#ADB1B8] !size-[1.7rem]"
                            />
                            Delete
                        </>
                    ]}
                >
                    <Button variant="ghost" className="h-12 w-12 p-0 hover:bg-[#21343F]">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="size-8 text-[#D5F0FF66]" />
                    </Button>
                </DropDown>
            )
        },
    },

];