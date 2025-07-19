import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/tables/upload/data-table";
import { uploadHistoryColumns } from "@/components/shared/tables/upload/columns";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardHome = () => {
    const overView = [
        {
            title: "Total Uploads",
            key: "totalUpload",
            icon: "/icons/upload.svg",
        },
        {
            title: "Total Wallets Tracked",
            key: "totalWalletsUploaded",
            icon: "/icons/download.svg",
        },
        {
            title: "Total Analytics Requests",
            key: "totalAnalyticsRequests",
            icon: "/icons/users.svg",
        }
    ]

    const {
        data: uploadHistory,
        isLoading: isUploadHistoryLoading,
    } = useQuery({
        queryKey: ["uploadHistory"],
        queryFn: async () => {
            const response = await useFetch("/user/dashboard");
            return response.data;
        },
    })

    console.log("uploadHistory:", uploadHistory);

    // const data = [
    //     {
    //         id: "1",
    //         name: "BTC FC",
    //         wallets: "8",
    //         date: "3 hours"
    //     },
    //     {
    //         id: "2",
    //         name: "August Batch",
    //         wallets: "9",
    //         date: "1 hour"
    //     },
    //     {
    //         id: "3",
    //         name: "Ilemobayo Babes",
    //         wallets: "6",
    //         date: "01/08/2025"
    //     },
    // ]

    return (
        <div className="pl-[3.2rem] pt-[4rem]">
            <div className="max-w-[100rem] w-full pb-[5rem]">
                <img
                    src="/common/flare.png"
                    className="absolute blur top-[-8rem] pointer-events-none left-[23rem] w-[55rem]"
                />
                <div className="flex justify-between">
                    <h2 className="text-[1.6rem] text-[#EDEEF0]">Upload history</h2>

                    <Button
                        style={{
                            boxShadow: `
                                0px 0.5px 0px 0px #03071229,
                                0px 0.25px 0px 0px #03071229,
                                0px 1.75px 0px 0px #FFFFFF29 inset
                                `,
                            background: `
                                linear-gradient(0deg, #FFFFFF, #FFFFFF),
                                linear-gradient(180deg, rgba(40, 40, 40, 0.16) 0%, rgba(40, 40, 40, 0) 100%)
                                `
                        }}
                        className="text-[#030712] text-[1.2rem] px-[2.3rem] rounded-[2.3rem] py-[1.9rem]"
                    >
                        Analyze Wallets
                    </Button>
                </div>

                <div className="bg-[#131E24] mt-[2rem] px-[3.45rem] py-[2.6rem] w-full border border-[#253A4699] flex justify-between rounded-[3rem]">
                    {
                        overView?.map((item, i) => (
                            <div key={item.title} className={`w-[30%] ${i < 2 ? "border-r border-[#253A4699]" : ""}`}>
                                <div className="w-[18rem]">
                                    <p className="text-[#8EA2AD] text-[1.4rem]">{item.title}</p>
                                    {
                                        isUploadHistoryLoading ? (
                                            <Skeleton className="w-[8rem] mt-[2rem] bg-[#21343F] mx-auto h-[7rem]" />
                                        ) : (
                                            <h2 className="mt-[2rem] text-center font-regular text-white text-[6.5rem]">{uploadHistory?.[item?.key]}</h2>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="bg-[#131E24] mt-[4rem] px-[3.45rem] py-[2.6rem] border border-[#253A4699] w-[65%] rounded-[3rem]">
                    <h2 className="text-[1.6rem] text-[#EDEEF0]">Upload history</h2>

                    <div className="mt-[2rem]">
                        <DataTable
                            columns={uploadHistoryColumns}
                            data={uploadHistory?.uploadHistory}
                            isLoading={isUploadHistoryLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;