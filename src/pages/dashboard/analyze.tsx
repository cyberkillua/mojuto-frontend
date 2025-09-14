import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChevronRight } from "lucide-react";
import { chainsColumns } from "@/components/shared/tables/columns/chains";
import { DataTable } from "@/components/shared/tables/data-table";
import {
    Link,
    useLocation,
    useParams
} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect } from "react";
import { formatToDollars } from "@/utils/formatamount";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react";
import { LoaderCircle } from "lucide-react";

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


const Analyze = () => {
    const location = useLocation();
    const state = location.state as { selectedUploadIds: string[] } | null;
    const selectedUploadIds = state?.selectedUploadIds || [];
    const { id } = useParams();

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
            console.log("Analyze data:", data);
        },
        onError: (error) => {
            console.error("Error fetching analyze data:", error);
        },
    })

    useEffect(() => {
        if (selectedUploadIds.length > 0) {
            getAnalyzeDataMutation();
        }
    }, [selectedUploadIds]);

    const analyzeData = _analyzeData?.data;

    // Updated EVM data integration
    const evmData = analyzeData?.evm_chains?.map((chain: any, index: number) => ({
        id: (index + 1).toString(),
        chain: chain.chain.charAt(0).toUpperCase() + chain.chain.slice(1),
        stableCoin: formatToDollars(chain.stablecoinValue),
        allValue: formatToDollars(chain.altcoinValue),
        nativeValue: formatToDollars(chain.nativeValue),
        NFTValue: formatToDollars(chain.nftValue),
        totalValue: formatToDollars(chain.totalValue),
    })) || [];

    // Updated SOL data integration
    const solData = analyzeData?.sol_chains?.map((chain: any, index: number) => ({
        id: (index + 1).toString(),
        chain: chain.chain.charAt(0).toUpperCase() + chain.chain.slice(1),
        stableCoin: formatToDollars(chain.stablecoinValue),
        allValue: formatToDollars(chain.altcoinValue),
        nativeValue: formatToDollars(chain.nativeValue),
        NFTValue: formatToDollars(chain.nftValue),
        totalValue: formatToDollars(chain.totalValue),
    })) || [];

    // Updated BTC data integration
    const btcData = analyzeData?.btc_chains?.map((chain: any, index: number) => ({
        id: (index + 1).toString(),
        chain: chain.chain.charAt(0).toUpperCase() + chain.chain.slice(1),
        stableCoin: formatToDollars(chain.stablecoinValue),
        allValue: formatToDollars(chain.altcoinValue),
        nativeValue: formatToDollars(chain.nativeValue),
        NFTValue: formatToDollars(chain.nftValue),
        totalValue: formatToDollars(chain.totalValue),
    })) || [];

    // Updated chart data integration
    const chartData = analyzeData?.blockchainValues?.map((item: any) => ({
        coin: item.chain.charAt(0).toUpperCase() + item.chain.slice(1),
        desktop: item.value
    })) || [];

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig

    const headerData = [
        {
            value: formatToDollars(analyzeData?.totalPortfolioValue || 0),
            text: "Total Portfolio Value",
            border: false,
            tooltip: "The combined total value of all assets across all wallets analyzed.",
            icon: "/common/value.png"
        },
        {
            value: analyzeData?.totalWallets || 0,
            text: "Total Wallets",
            border: false,
            tooltip: "The combined total value of all assets across all wallets analyzed.",
            icon: "/common/wallet.png"
        },
        {
            value: formatToDollars(analyzeData?.stablecoins || 0),
            text: "Stablecoin",
            border: true,
            tooltip: "The combined total value of all assets across all wallets analyzed.",
            icon: "/common/stablecoin.png"
        },
        {
            value: formatToDollars(analyzeData?.nft || 0),
            text: "NFT",
            border: true,
            tooltip: "The combined total value of all assets across all wallets analyzed.",
            icon: "/common/nft.png"
        },
        {
            value: formatToDollars(analyzeData?.native || 0),
            text: "Native",
            border: true,
            tooltip: "The combined total value of all assets across all wallets analyzed.",
            icon: "/common/native.png"
        },
        {
            value: formatToDollars(analyzeData?.altcoin || 0),
            text: "Altcoins",
            border: true,
            tooltip: "The combined total value of all assets across all wallets analyzed.",
            icon: "/common/alt.png"
        },
    ]

    // Updated VM data integration
    const vmData = [
        {
            name: "BTC",
            value: analyzeData?.distributionByVirtualMembers?.find((item: any) => item.BTC !== undefined)?.BTC || 0,
            fill: "var(--color-btc)"
        },
        {
            name: "SVM",
            value: analyzeData?.distributionByVirtualMembers?.find((item: any) => item.SOL !== undefined)?.SOL || 0,
            fill: "var(--color-svm)"
        },
        {
            name: "EVM",
            value: analyzeData?.distributionByVirtualMembers?.find((item: any) => item.EVM !== undefined)?.EVM || 0,
            fill: "var(--color-evm)"
        },
    ];

    // Updated asset data integration
    const assetData = analyzeData?.distributionByAssetType?.map((item: any) => ({
        name: item.type.charAt(0).toUpperCase() + item.type.slice(1),
        value: item.value,
        fill: `var(--color-${item.type})`
    })) || [
            { name: "Altcoin", value: 0, fill: "var(--color-altcoin)" },
            { name: "Stablecoin", value: 0, fill: "var(--color-stablecoin)" },
            { name: "Native", value: 0, fill: "var(--color-native)" },
            { name: "NFT", value: 0, fill: "var(--color-nft)" },
        ];

    const vmChartConfig = {
        btc: {
            label: "BTC",
            color: "#FFE41A",
        },
        svm: {
            label: "SVM",
            color: "#7EF9FF",
        },
        evm: {
            label: "EVM",
            color: "#D998FF",
        },
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

    // Calculate dynamic values
    const evmTotalValue = analyzeData?.evm_chains?.reduce((sum: number, chain: any) => sum + chain.totalValue, 0) || 0;
    const evmChainCount = analyzeData?.evm_chains?.length || 0;
    const solTotalValue = analyzeData?.sol_chains?.[0]?.totalValue || 0;
    const btcTotalValue = analyzeData?.btc_chains?.[0]?.totalValue || 0;

    return (
        <>
            {
                analyzeDataLoading ? (<div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-md"
                >
                    <p className="text-[1.6rem] text-white">
                        <LoaderCircle className="animate-spin inline mr-[.7rem] text-[#00EAFF] size-[2rem]" />
                        Analyzing {selectedUploadIds.length} Wallet{selectedUploadIds.length > 1 ? 's' : ''} ...
                    </p>
                </div>) : (
                    <section className="pt-[3rem] pb-[6rem] px-[2.5rem]">
                        <div className="max-w-[1440px]">
                            <div className="flex justify-between items-center mb-[3rem]">
                                <p className="text-[1.6rem] text-[#AACDE1]">Wallet Analytics Dashboard</p>

                                <div className="flex gap-[1rem]">
                                    <Button className="bg-white rounded-[2rem] px-[2rem] py-[1.8rem] text-[#030712] text-[1.2rem]">
                                        Export Results
                                    </Button>

                                    <Button className="bg-white rounded-[2rem] px-[2rem] py-[1.8rem] text-[#030712] text-[1.2rem]">
                                        Last 7 Days
                                    </Button>
                                </div>
                            </div>
                            <Card
                                className="grid grid-cols-2 gap-[2rem]"
                            >
                                {
                                    headerData.map((item, idx) => (
                                        <div
                                            className={`p-[2.5rem] rounded-[3rem] ${item.border ? "border border-[#253A46]" : ""}`}
                                            key={idx}
                                        >
                                            <p className={`text-[1.4rem] font-[400] mb-[1.5rem] ${item.border ? "text-[#8EA2AD]" : "text-white"}`}>
                                                <img
                                                    src={item.icon}
                                                    alt="native icon"
                                                    className="size-[1.8rem] inline"
                                                />
                                                {"  "}
                                                {item.text}
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Info
                                                            className="inline size-[1.8rem] ml-[.8rem] text-[#8EA2AD] cursor-pointer"
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-[#131E24] border border-[#253A46] !w-fit">
                                                        <p className="text-[.8rem] max-w-[15rem] w-full">{item.tooltip}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </p>
                                            <p className={`text-white font-[500]  ${item.border ? "text-[3rem]" : "text-[4.5rem]"}`}>
                                                {idx === 1 ? item.value : `${item.value}`}
                                            </p>
                                        </div>
                                    ))
                                }
                            </Card>

                            <div className="">
                                <p className="text-[1.6rem] text-[#AACDE1] my-[2.5rem]">Total Distribution</p>

                                <div className="grid grid-cols-2 gap-[3rem]">
                                    <Card className="">
                                        <p className="text-[1.4rem] text-[#8EA2AD]">Distribution by Virtual Machine</p>
                                        <div className="flex items-center justify-between">
                                            <ChartContainer config={vmChartConfig} className="size-[20rem] mt-[3rem]">
                                                <PieChart>
                                                    <ChartTooltip
                                                        cursor={false}
                                                        content={<ChartTooltipContent hideLabel />}
                                                    />
                                                    <Pie
                                                        data={vmData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        innerRadius={"60%"}
                                                        outerRadius={"100%"}
                                                        strokeWidth={0}
                                                    />
                                                </PieChart>
                                            </ChartContainer>

                                            <div className="">
                                                <CustomLegend
                                                    data={vmData}
                                                    config={vmChartConfig}
                                                />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="">
                                        <p className="text-[1.4rem] text-[#8EA2AD]">Distribution by Asset Type</p>
                                        <div className="flex justify-between items-center">
                                            <ChartContainer
                                                config={assetChartConfig}
                                                className="size-[20rem] rounded-full mt-[3rem]"
                                            >
                                                <PieChart>
                                                    <ChartTooltip
                                                        cursor={false}
                                                        content={<ChartTooltipContent hideLabel />}
                                                    />
                                                    <Pie
                                                        data={assetData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        innerRadius={"60%"}
                                                        outerRadius={"100%"}
                                                        strokeWidth={0}
                                                    />
                                                </PieChart>
                                            </ChartContainer>

                                            <CustomLegend
                                                data={assetData}
                                                config={assetChartConfig}
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            <div className="">
                                <p className="text-[1.6rem] text-[#AACDE1] my-[2.5rem]">Blockchain Value</p>

                                <Card>
                                    <ChartContainer
                                        config={chartConfig}
                                        className="h-[45rem] w-full"
                                    >
                                        <BarChart
                                            accessibilityLayer
                                            data={chartData}
                                            margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                                        >
                                            <CartesianGrid
                                                horizontal={false}
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="coin"
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => value}
                                                className="text-[1.6rem] !text-[#8EA2AD]"
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                                                className="text-[1.4rem] !text-[#8EA2AD]"
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent hideLabel />}
                                            />
                                            <Bar
                                                dataKey="desktop"
                                                fill="var(--color-desktop)"
                                                radius={[25, 25, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </Card>
                            </div>

                            <div className="mt-[2.5rem]">
                                <div className="flex justify-between">
                                    <div className="">
                                        <p className="text-[1.4rem] text-[#8EA2AD]">EVM Chains</p>
                                        <p className="text-[1.4rem] mt-[.8rem] text-[#7FA1B4]">
                                            {evmChainCount} Chain{evmChainCount !== 1 ? 's' : ''} - {formatToDollars(evmTotalValue)}
                                        </p>
                                    </div>

                                    <Button
                                        variant={"ghost"}
                                        className="text-[#00EAFF] hover:bg-transparent hover:text-[#00EAFF] text-[1.4rem]"
                                        asChild
                                    >
                                        <Link
                                            state={{
                                                selectedUploadIds: selectedUploadIds,
                                                chain: "evm_chains"
                                            }}
                                            to={`/dashboard/uploads/${id}/analyze/evm-chains`}
                                        >
                                            Details
                                            <ChevronRight
                                                className="ml-2 size-[1.8rem]"
                                            />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="mt-[2rem]">
                                    <DataTable
                                        columns={chainsColumns}
                                        data={evmData}
                                    />
                                </div>
                            </div>

                            <div className="mt-[2.5rem]">
                                <div className="flex justify-between">
                                    <div className="">
                                        <p className="text-[1.4rem] text-[#8EA2AD]">Solana (SVM)</p>
                                        <p className="text-[1.4rem] mt-[.8rem] text-[#7FA1B4]">{formatToDollars(solTotalValue)}</p>
                                    </div>

                                    {
                                        solTotalValue > 0 && (
                                            <Button
                                                asChild
                                                variant={"ghost"}
                                                className="text-[#00EAFF] hover:bg-transparent hover:text-[#00EAFF] text-[1.4rem]"
                                            >
                                                <Link
                                                    state={{
                                                        selectedUploadIds: selectedUploadIds,
                                                        chain: "sol_chains"
                                                    }}
                                                    to={`/dashboard/uploads/${id}/analyze/evm-chains`}
                                                >
                                                    Details
                                                    <ChevronRight
                                                        className="ml-2 size-[1.8rem]"
                                                    />
                                                </Link>
                                            </Button>
                                        )
                                    }
                                </div>

                                <div className="mt-[2rem]">
                                    <DataTable
                                        columns={chainsColumns}
                                        data={solData}
                                    />
                                </div>
                            </div>

                            <div className="mt-[2.5rem]">
                                <div className="flex justify-between">
                                    <div className="">
                                        <p className="text-[1.4rem] text-[#8EA2AD]">Bitcoin</p>
                                        <p className="text-[1.4rem] mt-[.8rem] text-[#7FA1B4]">{formatToDollars(btcTotalValue)}</p>
                                    </div>

                                    {
                                        btcTotalValue > 0 && (
                                            <Button
                                                asChild
                                                variant={"ghost"}
                                                className="text-[#00EAFF] hover:bg-transparent hover:text-[#00EAFF] text-[1.4rem]"
                                            >
                                                <Link
                                                    state={{
                                                        selectedUploadIds: selectedUploadIds,
                                                        chain: "btc_chains"
                                                    }}
                                                    to={`/dashboard/uploads/${id}/analyze/evm-chains`}
                                                >
                                                    Details
                                                    <ChevronRight
                                                        className="ml-2 size-[1.8rem]"
                                                    />
                                                </Link>
                                            </Button>
                                        )
                                    }
                                </div>

                                <div className="mt-[2rem]">
                                    <DataTable
                                        columns={chainsColumns}
                                        data={btcData}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
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

export default Analyze;