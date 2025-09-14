import { cn } from "@/lib/utils";
// import { ColumnDef } from "@tanstack/react-table";
import { formatToDollars } from "@/utils/formatamount";

// Portfolio data type
export interface PortfolioData {
    id: string;
    address: string;
    chain: string;
    native: string;
    nativeToken: string;
    nativeTokens?: Array<{
        symbol: string;
        amount: number;
        value: string;
    }>;
    stablecoin: string;
    stablecoinTokens: string;
    stablecoinTokensList?: Array<{
        symbol: string;
        amount: number;
        value: string;
    }>;
    nft: string;
    nftCount: string;
    altcoin: string;
    altcoinCount: string;
    altcoinTokens?: string;
    totalValue: string;
    style: string;
    riskLevel: string;
}

// Portfolio columns configuration
export const portfolioColumns = (showDetails: boolean) => {
    return [
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }: any) => (
                <div className="flex items-center gap-[1rem]">
                    <span className="text-[#D5F0FF] text-[1.3rem] font-mono">
                        {`${row.getValue("address")}`}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "chain",
            header: "Chain",
            cell: ({ row }: any) => (
                <span className="text-[#8EA2AD] text-[1.3rem] capitalize font-medium">
                    {row.getValue("chain")}
                </span>
            ),
        },
        {
            accessorKey: "native",
            header: "Native ($)",
            cell: ({ row }: any) => {
                const value = row.getValue("native") as string;
                // const nativeTokens = row.original.nativeTokens;

                return (
                    <div className="text-right">
                        {
                            showDetails ? (
                                <div className="text-[1.3rem] text-center">${value}</div>
                            ) : (
                                <div className="text-[#8EA2AD] text-start max-w-[8rem] text-[1.3rem]">
                                    {row.original.nativeToken}
                                </div>
                            )
                        }
                    </div >
                );
            },
        },
        {
            accessorKey: "stablecoin",
            header: "Stablecoin ($)",
            cell: ({ row }: any) => {
                const stablecoinTokensList = row.original.stablecoinTokens.split(',');

                return (
                    <div className="text-right">
                        {
                            showDetails ? (
                                <div className="text-[#8EA2AD] text-start !whitespace-normal  text-[1.1rem]">
                                    {
                                        stablecoinTokensList.map((token: any, idx: any) => (
                                            <p key={idx} className={`text-[1.2rem] mt-[.2rem]`}>
                                                {token.length > 0 ? token : 'No stablecoins'}

                                            </p>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className="text-center">{formatToDollars(row.original.stablecoin)}</p>
                            )
                        }
                    </div>
                );
            },
        },
        {
            accessorKey: "nft",
            header: "NFT ($)",
            cell: ({ row }: any) => {
                const value = row.getValue("nft") as string
                return (
                    <div className="text-right">
                        <div className="text-[#D5F0FF] text-[1.3rem] font-medium">${value}</div>
                        {showDetails && <div className="text-[#8EA2AD] text-[1.1rem]">
                            {row.original.nftCount} <span className="">NFTs</span>
                        </div>}
                    </div>
                )
            },
        },
        {
            accessorKey: "altcoin",
            header: "Altcoin ($)",
            cell: ({ row }: any) => {
                const value = row.getValue("altcoin") as string;
                const altcoinsTokenList = row.original.altcoinToken.split(',');

                return (
                    <div className="text-right">
                        {
                            showDetails ? (
                                <div className="text-[#8EA2AD] text-start !whitespace-normal  text-[1.1rem]">
                                    {
                                        altcoinsTokenList.map((token: any, idx: any) => (
                                            <p key={idx} className={`text-[1.2rem] mt-[.2rem]`}>
                                                {token.length > 0 ? token : 'No stablecoins'}

                                            </p>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className="">{value}</p>
                            )
                        }
                    </div>
                );
            },
        },
        {
            accessorKey: "totalValue",
            header: "Total Value",
            cell: ({ row }: any) => (
                <span className="text-[#D5F0FF] text-[1.3rem] font-semibold">${row.getValue("totalValue")}</span>
            ),
        },
        {
            accessorKey: "riskLevel",
            header: "Risk Level",
            cell: ({ row }: any) => {
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
}