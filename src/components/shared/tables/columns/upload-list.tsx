import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DropDown from "../../common/dropdown";
import { SquarePen, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";

export type uploadList = {
    id: string;
    name: string;
    wallets: string
    date: string;
    fileName?: string
}

// Hook for deleting uploads
const useDeleteUpload = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uploadId: string) =>
            useFetch(`/upload/delete-upload?id=${uploadId}`, {
                method: "DELETE",
            }),
        onSuccess: () => {
            toast.success("Upload deleted successfully!");
            // Invalidate uploads query to refresh the list
            queryClient.invalidateQueries({ queryKey: ["uploads"] });
        },
        onError: (error: any) => {
            toast.error("Failed to delete upload", {
                description: error?.message || "Something went wrong. Please try again.",
            });
        },
    });
};

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
        cell: ({ row }) => {
            const deleteUpload = useDeleteUpload();

            const handleEdit = () => {
                toast.info("Edit functionality coming soon!");
                // You can implement edit navigation here
                // navigate(`/dashboard/uploads/edit/${row.original.id}`);
            };

            const handleDelete = () => {
                const uploadId = row.original.id;
                const uploadName = row.original.fileName || row.original.name;

                // Show confirmation toast before deleting
                toast.promise(
                    deleteUpload.mutateAsync(uploadId),
                    {
                        loading: `Deleting "${uploadName}"...`,
                        success: `"${uploadName}" deleted successfully!`,
                        error: "Failed to delete upload. Please try again."
                    }
                );
            };

            return (
                <DropDown
                    dropdownMenuIems={[
                        <div
                            key="edit"
                            onClick={handleEdit}
                            className="flex items-center gap-[0.8rem] cursor-pointer"
                        >
                            <SquarePen
                                className="text-[#ADB1B8] !size-[1.7rem]"
                            />
                            Edit
                        </div>,
                        <div
                            key="delete"
                            onClick={handleDelete}
                            className="flex items-center gap-[0.8rem] cursor-pointer"
                        >
                            <Trash2
                                className="text-[#AF1100] !size-[1.7rem]"
                            />
                            <span className="text-[#AF1100] hover:text-[#8F0E00]">
                                Delete
                            </span>
                        </div>
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