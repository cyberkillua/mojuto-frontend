import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@/hooks/use-fetch";

// import { AnyAaaaRecord } from "dns";
import { Checkbox } from "@/components/ui/checkbox";

export type viewUpload = {
    id: string;
    address: string;
    chain: string
}

const useDeleteWallet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (walletId: string) =>
            useFetch(`/upload/delete-wallet?id=${walletId}`, {
                method: "DELETE",
            }),
        onSuccess: () => {
            toast.success("Wallet deleted successfully!");
            // Invalidate uploads query to refresh the list
            queryClient.invalidateQueries({ queryKey: ["upload"] });
        },
        onError: (error: any) => {
            toast.error("Failed to delete wallet", {
                description: error?.message || "Something went wrong. Please try again.",
            });
        },
    });
};



export const viewUploadColumns: ColumnDef<viewUpload>[] = [
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
        accessorKey: "address",
        header: "Wallet Address",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "chain",
        header: "Chain",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "noOfWallets",
        header: "Actions",
        cell: ({ row }) => {

            const deleteWallet = useDeleteWallet();

            const handleDelete = () => {
                const walletId = row.original.id;

                // Show confirmation toast before deleting
                toast.promise(
                    deleteWallet.mutateAsync(walletId),
                    {
                        loading: `Deleting "${walletId}"...`,
                    }
                );
            };

            return (
                (
                    <div className="flex items-center gap-[1.2rem]">

                        <Button
                            className="rounded-full cursor-pointer hover:bg-[#AF1100] size-[3.5rem] bg-[#AF1100]"
                            onClick={handleDelete}
                        >
                            <Trash2
                                className="text-[#D5F0FF] size-[1.4rem]"
                            />
                        </Button>
                    </div>
                )
            )
        }
    },
];