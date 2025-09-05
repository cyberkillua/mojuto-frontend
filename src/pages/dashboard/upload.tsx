import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/tables/data-table";
import { viewUploadColumns } from "@/components/shared/tables/columns/view-upload";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
import { LoaderCircle, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "@/utils/formatTime";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { RowSelectionState, OnChangeFn } from "@tanstack/react-table";

const Upload = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const selectedUploadIds = Object.keys(rowSelection);
    const queryClient = useQueryClient();
    const selectedCount = selectedUploadIds.length;

    const {
        data: uploads,
        isLoading,
        error,
        refetch,
        isRefetching
    } = useQuery({
        queryKey: ["upload", id],
        queryFn: () => useFetch(`/upload/get-upload-by-id?id=${id}`, {
            method: "GET",
        }),
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    const bulkDeleteMutation = useMutation({
        mutationFn: async (uploadIds: string[]) => {
            // Delete uploads one by one or implement a bulk delete endpoint
            const deletePromises = uploadIds.map(id =>
                useFetch(`/upload/delete-wallet?id=${id}`, {
                    method: "DELETE",
                })
            );
            return Promise.all(deletePromises);
        },
        onSuccess: () => {
            toast.success("Selected uploads deleted successfully!");
            setRowSelection({}); // Clear selection
            queryClient.invalidateQueries({ queryKey: ["upload", id] });
        },
        onError: (error: any) => {
            toast.error("Failed to delete uploads", {
                description: error?.message || "Something went wrong. Please try again.",
            });
        },
    });

    // Handle error with toast
    useEffect(() => {
        if (error) {
            toast.error("Failed to load upload data", {
                description: error?.message || "Something went wrong. Please try again.",
                action: {
                    label: "Retry",
                    onClick: () => refetch()
                }
            });
        }
    }, [error, refetch]);

    const handleRetry = () => {
        toast.promise(
            refetch(),
            {
                loading: "Retrying...",
                success: "Upload data loaded successfully!",
                error: "Failed to retry. Please try again."
            }
        );
    };

    const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
        setRowSelection(updaterOrValue)
    }

    const handleBulkAnalyze = () => {
        if (selectedUploadIds.length === 0) {
            toast.error("Please select wallets to analyze");
            return;
        }

        // Navigate to analysis page with selected upload IDs
        const idsParam = selectedUploadIds.join(',');
        navigate(`/dashboard/analyze?uploads=${idsParam}`);
    };

    const handleBulkDelete = () => {
        if (selectedUploadIds.length === 0) {
            toast.error("Please select wallets to delete");
            return;
        }

        toast.promise(
            bulkDeleteMutation.mutateAsync(selectedUploadIds),

            {
                loading: `Deleting ${selectedCount} upload${selectedCount > 1 ? 's' : ''}...`,
                error: "Failed to delete wallet. Please try again."
            }
        );

    };

    // Show error state with toast handling
    if (error) {
        return (
            <div className="w-full pl-[3rem] pt-[4.6rem]">
                <div className="max-w-[88rem] w-full">
                    <div className="flex flex-col items-center justify-center mt-[6rem] text-center">
                        <h3 className="text-[#D5F0FF] text-[1.6rem] font-medium mb-[2rem]">
                            Unable to Load Upload Data
                        </h3>
                        <Button
                            onClick={handleRetry}
                            disabled={isRefetching}
                            className="bg-white hover:bg-gray-100 text-[#030712] px-[2rem] py-[1rem] rounded-[2rem] flex items-center gap-[0.5rem]"
                        >
                            {isRefetching ? (
                                <LoaderCircle className="h-[1.6rem] w-[1.6rem] animate-spin" />
                            ) : (
                                <RefreshCw className="h-[1.6rem] w-[1.6rem]" />
                            )}
                            Retry
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full pl-[3rem] pt-[4.6rem] pb-[6rem]">
            <div className="max-w-[88rem] w-full">
                <div className="flex gap-[1.5rem]">
                    {isLoading ? (
                        <Skeleton className="w-[10rem] bg-[#21343F] h-[3.5rem] rounded-[2rem]" />
                    ) : (
                        <Pill>
                            <span>{uploads?.upload?.noOfWallets || 0} {uploads?.upload?.noOfWallets === 1 ? "Wallet" : "Wallets"}</span>
                        </Pill>
                    )}
                    {isLoading ? (
                        <Skeleton className="w-[16rem] bg-[#21343F] h-[3.5rem] rounded-[2rem]" />
                    ) : (
                        <Pill>
                            <span>
                                {uploads?.upload?.createdAt && uploads?.upload?.updatedAt
                                    ? `${formatRelativeTime(uploads?.upload?.createdAt)} - ${formatRelativeTime(uploads?.upload?.updatedAt)}`
                                    : "No date available"
                                }
                            </span>
                        </Pill>
                    )}
                </div>

                <div className="flex mt-[3rem] justify-between items-center">
                    <Input
                        className="w-[27rem] h-[4rem] bg-white rounded-[2rem] pl-[1.8rem] placeholder:text-[1.3rem] placeholder:text-[#9CA3AF] !text-[1.3rem]"
                        placeholder="Search Uploads"
                        disabled={isLoading}
                    />
                    <Button
                        className="bg-white hover:bg-white cursor-pointer !px-[1.8rem] text-[#030712] text-[1.1rem] py-[1.8rem] rounded-[2rem]"
                        onClick={() => {
                            navigate("/dashboard/analyze");
                        }}
                        disabled={uploads?.upload?.wallets.length == 0}
                    >
                        Analyze All
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center mt-[3rem]">
                        <LoaderCircle className="animate-spin text-white h-[3rem] w-[3rem]" />
                    </div>
                ) :(
                    <div className="mt-[3rem]">
                        <DataTable
                            columns={viewUploadColumns}
                            data={uploads?.upload?.wallets ||  []}
                            isLoading={false}
                            enableRowSelection={true}
                            rowSelection={rowSelection}
                            onRowSelectionChange={handleRowSelectionChange}
                        />
                    </div>
                )}

                {!!selectedCount && selectedCount > 1  && (
                    <div className="bg-[#172228] w-fit mt-[1.7rem] px-[1.15rem] rounded-[1.7rem] py-[1.1rem]">
                        <p className="text-center text-[#D5F0FF] text-[1.3rem] mb-[1.5rem]">
                            {selectedCount} wallet{selectedCount > 1 ? 's' : ''} Selected
                        </p>

                        <div className="flex gap-[1rem]">
                            <Button
                                onClick={handleBulkAnalyze}
                                className="px-[2rem] py-[1.5rem] rounded-[2rem] text-[1rem] text-[#18181A] bg-white hover:bg-gray-100"
                            >
                                Analyze
                            </Button>
                            <Button
                                onClick={handleBulkDelete}
                                disabled={bulkDeleteMutation.isPending}
                                className="px-[2rem] py-[1.5rem] rounded-[2rem] text-[1rem] text-white bg-[#AF1100] hover:bg-[#8F0E00] flex items-center gap-[0.5rem]"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Pill = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#172329] px-[2rem] rounded-[3rem] w-fit py-[1rem] text-[1.2rem] font-medium text-[#8EA2AD]">
            {children}
        </div>
    );
};

export default Upload;