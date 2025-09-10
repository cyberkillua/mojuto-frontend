import { ColumnDef } from "@tanstack/react-table";
import DropDown from "../../common/dropdown";
import { SquarePen, Trash2 } from "lucide-react";
import {  MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button";

export type uploadHistoryEnterprise = {
    id: string;
    name: string;
    wallets: string
    date: string;
}

export const uploadHistoryEnterpriseColumns: ColumnDef<uploadHistoryEnterprise>[] = [
    {
        accessorKey: "fileName",
        header: "Upload Name",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "uploadedBy",
        header: "Uploaded By",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "noOfWallets",
        header: "Wallets",
        cell: info => info.getValue(),
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: info => info.getValue(),
    // },
    {
        accessorKey: "time",
        header: "Time",
        cell: info => info.getValue(),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: () => {
            // const payment = row.original
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
                        {/* <span className="sr-only">Open menu</span> */}
                        <MoreVertical className="size-8 text-[#D5F0FF66]" />
                    </Button>
                </DropDown>

            )
        },
    },

];