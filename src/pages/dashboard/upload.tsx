import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/tables/data-table";
import { viewUploadColumns } from "@/components/shared/tables/columns/view-upload";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { useFetch } from "@/hooks/use-fetch";


const Upload = () => {

    // const { id } = useParams();


    // const {
    //     data: _uploads,
    //     isLoading,
    //     error   
    // } = useQuery({
    //     queryKey: ["upload", id],
    //     queryFn: () => useFetch(`/upload/get-upload-by-id?id=${id}`, {
    //         method: "GET",
    //     }),
    // })

    // console.log(_uploads)

    const uploads = [
        {
            id: "1",
            walletsAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            chain: "Ethereum"
        },
        {
            id: "1",
            walletsAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            chain: "Ethereum"
        },
        {
            id: "1",
            walletsAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            chain: "Ethereum"
        },
        {
            id: "1",
            walletsAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            chain: "Ethereum"
        },

    ]
    return (
        <div className="w-full pl-[3rem] pt-[4.6rem]">
            <div className="max-w-[88rem] w-full">
                <div className="flex gap-[1.5rem]">
                    <Pill>
                        <span className="">4 Wallets</span>
                    </Pill>
                    <Pill>
                        <span className="">12:05PM - 12 May 2025</span>
                    </Pill>
                </div>
                <div className="flex mt-[3rem] justify-between items-center">
                    <Input
                        className="w-[27rem] h-[4rem] bg-white rounded-[2rem] pl-[1.8rem] placeholder:text-[1.3rem] placeholder:text-[#9CA3AF] !text-[1.3rem]"
                        placeholder="Search Uploads"
                    />
                    <Button
                        className="bg-white hover:bg-white cursor-pointer px-[1.2rem] text-[#030712] text-[1.1rem] py-[1.8rem] rounded-[2rem]"
                    >
                        Upload Wallets
                    </Button>
                </div>

                <div className="mt-[3rem]">
                    <DataTable
                        columns={viewUploadColumns}
                        data={uploads}
                        isLoading={false}
                    />
                </div>
            </div>
        </div>
    );
}

const Pill = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#172329] px-[2rem] rounded-[3rem] w-fit py-[1rem] text-[1.2rem] font-medium text-[#8EA2AD]">
            {children}
        </div>
    );
};

export default Upload;