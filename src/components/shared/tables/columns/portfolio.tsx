import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

// Portfolio data type
export interface PortfolioData {
    id: string;
    address: string;
    chain: string;
    native: string;
    nativeToken: string;
    stablecoin: string;
    stablecoinTokens: string;
    nft: string;
    nftCount: string;
    altcoin: string;
    altcoinCount: string;
    totalValue: string;
    style: string;
    riskLevel: string;
}

// Portfolio columns configuration
export const portfolioColumns: ColumnDef<PortfolioData>[] = [
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
            <div className="flex items-center gap-[1rem]">
                {/* <div className="w-[2.4rem] h-[2.4rem] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[1rem] font-semibold">
                    {row.original.address.slice(0, 2)}
                </div> */}
                <span className="text-[#D5F0FF] text-[1.3rem]">{row.getValue("address")}</span>
            </div>
        ),
    },
    {
        accessorKey: "chain",
        header: "Chain",
        cell: ({ row }) => (
            <span className="text-[#8EA2AD] text-[1.3rem]">{row.getValue("chain")}</span>
        ),
    },
    {
        accessorKey: "native",
        header: "Native ($)",
        cell: ({ row }) => {
            const value = row.getValue("native") as string
            return (
                <div className="text-right">
                    <div className="text-[#D5F0FF] text-[1.3rem] font-medium">${value}</div>
                    <div className="text-[#8EA2AD] text-[1.1rem]">({row.original.nativeToken})</div>
                </div>
            )
        },
    },
    {
        accessorKey: "stablecoin",
        header: "Stablecoin ($)",
        cell: ({ row }) => {
            const value = row.getValue("stablecoin") as string
            return (
                <div className="text-right">
                    <div className="text-[#D5F0FF] text-[1.3rem] font-medium">${value}</div>
                    <div className="text-[#8EA2AD] text-[1.1rem]">({row.original.stablecoinTokens})</div>
                </div>
            )
        },
    },
    {
        accessorKey: "nft",
        header: "NFT ($)",
        cell: ({ row }) => {
            const value = row.getValue("nft") as string
            return (
                <div className="text-right">
                    <div className="text-[#D5F0FF] text-[1.3rem] font-medium">${value}</div>
                    <div className="text-[#8EA2AD] text-[1.1rem]">({row.original.nftCount})</div>
                </div>
            )
        },
    },
    {
        accessorKey: "altcoin",
        header: "Altcoin ($)",
        cell: ({ row }) => {
            const value = row.getValue("altcoin") as string
            return (
                <div className="text-right">
                    <div className="text-[#D5F0FF] text-[1.3rem] font-medium">${value}</div>
                    <div className="text-[#8EA2AD] text-[1.1rem]">({row.original.altcoinCount})</div>
                </div>
            )
        },
    },
    {
        accessorKey: "totalValue",
        header: "Total Value",
        cell: ({ row }) => (
            <span className="text-[#D5F0FF] text-[1.3rem] font-semibold">${row.getValue("totalValue")}</span>
        ),
    },
    {
        accessorKey: "style",
        header: "Style",
        cell: ({ row }) => (
            <span className="text-[#8EA2AD] text-[1.3rem]">{row.getValue("style")}</span>
        ),
    },
    {
        accessorKey: "riskLevel",
        header: "Risk Level",
        cell: ({ row }) => {
            const riskLevel = row.getValue("riskLevel") as string
            const riskColors = {
                "High": "bg-[#FC2C2C] text-white",
                "Medium": "bg-[#FFE41A] text-black",
                "Low": "bg-[#00FF9D] text-black"
            }
            return (
                <span className={cn(
                    "px-[1rem] py-[0.5rem] rounded-[1rem] text-[1.2rem] font-medium",
                    riskColors[riskLevel as keyof typeof riskColors]
                )}>
                    {riskLevel}
                </span>
            )
        },
    },
];