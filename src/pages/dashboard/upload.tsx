import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/tables/data-table";
import { viewUploadColumns } from "@/components/shared/tables/columns/view-upload";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
import {  LoaderCircle, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "@/utils/formatTime";
import { toast } from "sonner";
import { useEffect } from "react";

const Upload = () => {
    const { id } = useParams();

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
        <div className="w-full pl-[3rem] pt-[4.6rem]">
            <div className="max-w-[88rem] w-full">
                <div className="flex gap-[1.5rem]">
                    {isLoading ? (
                        <Skeleton className="w-[10rem] bg-[#21343F] h-[3.5rem] rounded-[2rem]" />
                    ) : (
                        <Pill>
                            <span>{uploads?.noOfWallets || 0} Wallets</span>
                        </Pill>
                    )}
                    {isLoading ? (
                        <Skeleton className="w-[16rem] bg-[#21343F] h-[3.5rem] rounded-[2rem]" />
                    ) : (
                        <Pill>
                            <span>
                                {uploads?.createdAt && uploads?.updatedAt
                                    ? `${formatRelativeTime(uploads.createdAt)} - ${formatRelativeTime(uploads.updatedAt)}`
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
                    <div className="flex items gap-[1.5rem] items-center">
                        <Button
                            className="bg-white hover:bg-white cursor-pointer px-[1.2rem] text-[#030712] text-[1.1rem] py-[1.8rem] rounded-[2rem]"
                            disabled={isLoading}
                            onClick={() => {
                                toast.success("Upload functionality coming soon!");
                            }}
                        >
                            Upload Wallets
                        </Button>
                        <Button asChild className="bg-white hover:bg-white cursor-pointer !px-[1.8rem] text-[#030712] text-[1.1rem] py-[1.8rem] rounded-[2rem]">
                            <Link to={`/dashboard/analyze/${uploads?.id}`}>Analyze</Link>
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center mt-[3rem]">
                        <LoaderCircle className="animate-spin text-white h-[3rem] w-[3rem]" />
                    </div>
                ) : uploads?.wallets && uploads.wallets.length > 0 ? (
                    <div className="mt-[3rem]">
                        <DataTable
                            columns={viewUploadColumns}
                            data={uploads.wallets}
                            isLoading={false}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-[6rem] text-center">
                        <div className="h-[4rem] w-[4rem] bg-[#21343F] rounded-full flex items-center justify-center mb-[2rem]">
                            <span className="text-[#8EA2AD] text-[1.8rem]">📁</span>
                        </div>
                        <h3 className="text-[#D5F0FF] text-[1.6rem] font-medium mb-[1rem]">
                            No Wallets Found
                        </h3>
                        <p className="text-[#8EA2AD] text-[1.3rem]">
                            This upload doesn't contain any wallet data.
                        </p>
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