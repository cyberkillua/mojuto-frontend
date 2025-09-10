import CustomTab from "@/components/shared/common/tabs";
import { DataTable } from "@/components/shared/tables/data-table";
import { Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { portfolioColumns } from "@/components/shared/tables/columns/portfolio";
import { chainsColumns } from "@/components/shared/tables/columns/chains";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { formatToDollars } from "@/utils/formatamount";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

function CustomLegend({ data, config }: { data: any[]; config: ChartConfig }) {
    return (
        <div className="flex flex-col gap-3">
            {data.map((item) => {
                const configKey = item.name.toLowerCase()
                const itemConfig = config[configKey as keyof typeof config]
                return (
                    <div key={item.name} className="flex items-center justify-between gap-[3rem]">
                        <div className="flex items-center gap-[.7rem]">
                            <div className="size-[1rem] rounded-full" style={{ backgroundColor: itemConfig?.color }} />
                            <span className="text-[#8EA2AD] font-[400] text-[1.4rem]">{item.name}</span>
                        </div>
                        <span className="text-white text-[1.8rem] font-medium">${item.value.toLocaleString()}</span>
                    </div>
                )
            })}
        </div>
    )
}

// Helper function to parse token holdings from API format and calculate values
const parseTokenHoldingsWithValues = (tokenString: string, totalValue: number) => {
    if (!tokenString || tokenString === "") return [];

    const tokens = tokenString.split(',').map(token => {
        const [symbol, amount] = token.split(':');
        return {
            symbol: symbol.trim(),
            amount: parseFloat(amount) || 0,
        };
    });

    // Calculate total amount for proportional value distribution
    const totalAmount = tokens.reduce((sum, token) => sum + token.amount, 0);

    return tokens.map(token => ({
        ...token,
        value: totalAmount > 0
            ? formatToDollars((totalValue * token.amount) / totalAmount)
            : "$0.00"
    }));
};

const MultiChainAnalytics = () => {
    const location = useLocation();
    const state = location.state as { selectedUploadIds: string[], chain: string } | null;
    const selectedUploadIds = state?.selectedUploadIds || [];
    const chain = state?.chain || "evm_chains";
    const [selectedChain, setSelectedChain] = useState<string>(chain);

    const {
        mutate: getAnalyzeDataMutation,
        data: _analyzeData,
        isPending: analyzeDataLoading
    } = useMutation({
        mutationFn: async () => {
            const response = await useFetch(`/upload/analyze-wallets`, { 
                method: "POST",
                body: JSON.stringify({ addresses: selectedUploadIds }),
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Chain analyze data:", data);
        },
        onError: (error) => {
            console.error("Error fetching chain analyze data:", error);
        },
    })

    useEffect(() => {
        if (selectedUploadIds.length > 0) {
            getAnalyzeDataMutation();
        }
    }, [selectedUploadIds]);

    const analyzeData = _analyzeData?.data;

    interface ChainDictionary {
        [key: string]: any;
    }

    const chainDictionary: ChainDictionary = {
        evm_chains: "EVM",
        sol_chains: "SVM",
        btc_chains: "BTC"
    }

    // Extract chain-specific data with token breakdown from API
    const chainData = analyzeData?.[selectedChain]?.map((chain: any, index: number) => {
        // Get detailed token information from single_chain_asset_details
        const chainAssetDetails = analyzeData.details?.single_chain_asset_details?.[chain.chain];
        const walletAssetDetails = chainAssetDetails?.wallet_asset_details?.[0]; // Assuming first wallet for now

        // Parse token holdings with proper value calculation
        const altcoinTokens = walletAssetDetails?.altcoin_held ?
            parseTokenHoldingsWithValues(walletAssetDetails.altcoin_held, chain.altcoinValue) : [];

        const stablecoinTokens = walletAssetDetails?.stablecoin_held ?
            parseTokenHoldingsWithValues(walletAssetDetails.stablecoin_held, chain.stablecoinValue) : [];

        const nativeToken = walletAssetDetails?.native_held ? (() => {
            const [symbol, amount] = walletAssetDetails.native_held.split(':');
            return {
                symbol: symbol.trim(),
                amount: parseFloat(amount) || 0,
                value: formatToDollars(chain.nativeValue)
            };
        })() : null;

        return {
            id: (index + 1).toString(),
            chain: chain.chain.charAt(0).toUpperCase() + chain.chain.slice(1),
            stableCoin: formatToDollars(chain.stablecoinValue),
            stableCoinTokens: stablecoinTokens.length > 0 ? stablecoinTokens : undefined,
            allValue: formatToDollars(chain.altcoinValue),
            altCoinTokens: altcoinTokens.length > 0 ? altcoinTokens : undefined,
            nativeValue: formatToDollars(chain.nativeValue),
            nativeToken: nativeToken || undefined,
            NFTValue: formatToDollars(chain.nftValue),
            nftCount: walletAssetDetails?.nft_count || 0,
            totalValue: formatToDollars(chain.totalValue),
        };
    }) || [];

    // Extract chain portfolio data from wallet details
    const portfolioData = (() => {
        if (!analyzeData?.details?.vm_analytics?.[chainDictionary?.[selectedChain]]) return [];

        if (!analyzeData.details.single_chain_overview) return [];

        return Object.entries(analyzeData.details.single_chain_overview)
            .filter(([chainName]) => analyzeData?.[selectedChain]?.some((currentChain: any) => currentChain.chain === chainName))
            .flatMap(([chainName, chainDetails]: [string, any]) =>
                chainDetails.wallet_details?.map((wallet: any, index: number) => {
                    // Get asset details for this wallet from single_chain_asset_details
                    const chainAssetDetails = analyzeData.details?.single_chain_asset_details?.[chainName];
                    const walletAssetDetail = chainAssetDetails?.wallet_asset_details?.find(
                        (w: any) => w.address === wallet.address
                    );

                    return {
                        id: `${chainName}-${index + 1}`,
                        address: wallet.address,
                        chain: chainName.charAt(0).toUpperCase() + chainName.slice(1),
                        native: formatToDollars(wallet.native_usd || 0).replace('$', ''),
                        nativeToken: walletAssetDetail?.native_held || `${chainName.toUpperCase()} 0.00`,
                        stablecoin: formatToDollars(wallet.stablecoin_usd || 0).replace('$', ''),
                        stablecoinTokens: walletAssetDetail?.stablecoin_held || "",
                        nft: formatToDollars(wallet.nft_usd || 0).replace('$', ''),
                        nftCount: walletAssetDetail?.nft_count?.toString() || "0",
                        altcoin: formatToDollars(wallet.altcoin_usd || 0).replace('$', ''),
                        altcoinCount: walletAssetDetail?.altcoin_held ?
                            walletAssetDetail.altcoin_held.split(',').length.toString() : "0",
                        totalValue: formatToDollars(wallet.total_value || 0).replace('$', ''),
                        style: "Mixed", // API doesn't provide this, using default
                        riskLevel: wallet.risk === "high" ? "High" : wallet.risk === "medium" ? "Medium" : "Low"
                    };
                }) || []
            );
    })();

    // Chain-specific asset distribution
    const currentChainAssetDistribution = analyzeData?.details?.vm_asset_distribution?.[chainDictionary?.[selectedChain]];
    const assetData = currentChainAssetDistribution ? [
        { name: "Altcoin", value: currentChainAssetDistribution.altcoin || 0, fill: "var(--color-altcoin)" },
        { name: "Stablecoin", value: currentChainAssetDistribution.stablecoin || 0, fill: "var(--color-stablecoin)" },
        { name: "Native", value: currentChainAssetDistribution.native || 0, fill: "var(--color-native)" },
        { name: "NFT", value: currentChainAssetDistribution.nft || 0, fill: "var(--color-nft)" },
    ] : [
        { name: "Altcoin", value: 0, fill: "var(--color-altcoin)" },
        { name: "Stablecoin", value: 0, fill: "var(--color-stablecoin)" },
        { name: "Native", value: 0, fill: "var(--color-native)" },
        { name: "NFT", value: 0, fill: "var(--color-nft)" },
    ];

    // Chain-specific risk distribution
    const currentChainRiskDistribution = analyzeData?.details?.vm_risk_distribution?.[chainDictionary?.[selectedChain]];
    const riskData = currentChainRiskDistribution ? [
        { name: "Low", value: currentChainRiskDistribution.low || 0, fill: "var(--color-low)" },
        { name: "Medium", value: currentChainRiskDistribution.medium || 0, fill: "var(--color-medium)" },
        { name: "High", value: currentChainRiskDistribution.high || 0, fill: "var(--color-high)" },
    ] : [
        { name: "Low", value: 0, fill: "var(--color-low)" },
        { name: "Medium", value: 0, fill: "var(--color-medium)" },
        { name: "High", value: 0, fill: "var(--color-high)" },
    ];

    const riskChartConfig = {
        low: {
            label: "Low",
            color: "#00FF9D",
        },
        medium: {
            label: "Medium",
            color: "#FFE41A",
        },
        high: {
            label: "High",
            color: "#FC2C2C",
        }
    } satisfies ChartConfig

    const assetChartConfig = {
        altcoin: {
            label: "Altcoin",
            color: "#7EF9FF",
        },
        stablecoin: {
            label: "Stablecoin",
            color: "#BFFF7E"
        },
        native: {
            label: "Native",
            color: "#D998FF",
        },
        nft: {
            label: "NFT",
            color: "#FFE41A",
        },
    } satisfies ChartConfig

    // Calculate totals for display
    const currentChainTotalValue = analyzeData?.details?.vm_analytics?.[chainDictionary?.[selectedChain]]?.total_value || 0;

    const currentChainTotalWallets = analyzeData?.details?.vm_analytics?.[chainDictionary?.[selectedChain]]?.total_wallets || 0;

    const evmTotalWallets = analyzeData?.details?.vm_analytics?.EVM?.total_wallets || 0;

    const solTotalWallets = analyzeData?.details?.vm_analytics?.SVM?.total_wallets || 0;

    const btcTotalWallets = analyzeData?.details?.vm_analytics?.BTC?.total_wallets || 0;

    const currentChainAvgValue = analyzeData?.details?.vm_analytics?.[chainDictionary?.[selectedChain]]?.avg_value || 0;

    return (
        <>
            {analyzeDataLoading ? (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-md">
                    <p className="text-[1.6rem] text-white">
                        <LoaderCircle className="animate-spin inline mr-[.7rem] text-[#00EAFF] size-[2rem]" />
                        Analyzing {chainDictionary?.[selectedChain]} chains for {selectedUploadIds.length} wallet{selectedUploadIds.length > 1 ? 's' : ''}...
                    </p>
                </div>
            ) : (
                <section className="pt-[4rem] pl-[2.8rem] pb-[6rem]">
                    <div className="max-w-[110rem] w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-[#AACDE1] text-[1.8rem] mb-[1rem]">
                                    {chainDictionary?.[selectedChain]} Analytics
                                </h2>
                                <p className="text-[#7FA1B4] text-[1.4rem]">
                                    {currentChainTotalWallets} Wallet{currentChainTotalWallets > 1 ? 's' : ''} • {formatToDollars(currentChainTotalValue)} Total Value • {formatToDollars(currentChainAvgValue)} Avg
                                </p>
                            </div>

                            <div className="flex gap-[2.8rem] items-center">
                                {/* <Button className="px-[1.5rem] py-[1.8rem] text-[1.4rem] bg-white rounded-[2rem] text-[#030712]">
                                    All Chains
                                </Button> */}
                                {
                                    !!evmTotalWallets && !!solTotalWallets && !!btcTotalWallets ? (
                                        <CustomTab
                                            options={
                                                [
                                                    `EVM (${evmTotalWallets})`,
                                                    (solTotalWallets > 0) ? `SVM (${solTotalWallets})` : null,
                                                    (btcTotalWallets > 0) ? `BTC (${btcTotalWallets})` : null
                                                ]
                                            }
                                            content={[
                                                <></>,
                                                <></>,
                                                <></>,
                                            ]}
                                            onTabChange={(tab) => {
                                                const key = tab.split(' ')[0];
                                                Object.entries(chainDictionary).map((v) => {
                                                    if (v[1] === key) {
                                                        setSelectedChain(v[0]);
                                                    }
                                                })
                                            }}
                                            classNames={
                                                {
                                                    tabs: "w-fit mt-0",
                                                    list: "!bg-[#172228] rounded-[3.5rem] !p-[1rem]",
                                                    trigger: "data-[state=active]:bg-[#172228] data-[state=active]:shadow-[0px_2px_4px_0px_#00000066,0px_1px_2px_-1px_#FFFFFF29] data-[state=active]:text-[#D5F0FF] data-[state=active]:border data-[state=active]:border-[#253A46] text-[#7FA1B4] py-[.7rem] px-[1.5rem] text-[1.4rem] rounded-[3rem]"
                                                }
                                            }
                                        />
                                    ) : (
                                        ""
                                    )
                                }
                            </div>
                        </div>

                        <div className="mt-[2rem]">
                            <DataTable
                                columns={chainsColumns}
                                data={chainData}
                            />
                        </div>

                        <div className="mt-[2.8rem]">
                            <h2 className="text-[1.8rem] text-[#AACDE1] mb-[1.8rem]">{chainDictionary?.[selectedChain]} Distribution</h2>

                            <div className="grid grid-cols-2 gap-[3rem]">
                                <Card className="">
                                    <p className="text-[1.4rem] text-[#8EA2AD]">Asset Distribution</p>
                                    <div className="flex items-center justify-between">
                                        <ChartContainer
                                            config={assetChartConfig}
                                            className="size-[20rem] mt-[3rem]">
                                            <PieChart>
                                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                                <Pie data={assetData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={82} strokeWidth={0} />
                                            </PieChart>
                                        </ChartContainer>

                                        <div className="">
                                            <CustomLegend
                                                data={assetData}
                                                config={assetChartConfig}
                                            />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="">
                                    <p className="text-[1.4rem] text-[#8EA2AD]">Risk Distribution</p>
                                    <div className="flex justify-between items-center">
                                        <ChartContainer
                                            config={riskChartConfig}
                                            className="size-[20rem] mt-[3rem]">
                                            <PieChart>
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent hideLabel />}
                                                />
                                                <Pie
                                                    data={riskData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    innerRadius={50}
                                                    outerRadius={82}
                                                    strokeWidth={0}
                                                />
                                            </PieChart>
                                        </ChartContainer>

                                        <div className="w-[35%]">
                                            <CustomLegend
                                                data={riskData}
                                                config={riskChartConfig}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className="mt-[2.8rem]">
                            <h2 className="text-[1.8rem] text-[#AACDE1] mb-[1.8rem]">{chainDictionary?.[selectedChain]} Portfolio Details</h2>
                            <DataTable
                                columns={portfolioColumns}
                                data={portfolioData}
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

const Card = ({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div className={cn("bg-[#131E24] border px-[2rem] py-[3rem] rounded-[3.5rem] border-[#253A46]", className)}>
            {children}
        </div>
    )
}

export default MultiChainAnalytics;