import CustomTab from "@/components/shared/common/tabs";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/tables/data-table";
import { Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { portfolioColumns } from "@/components/shared/tables/columns/portfolio";
import { chainsColumns } from "@/components/shared/tables/columns/chains";

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
                    </div>
                )
            })}
        </div>
    )
}



const EvmChains = () => {
    // Portfolio data based on the image
    const portfolioData = [
        {
            id: "1",
            address: "0x8ba6...Ag2h",
            chain: "Ethereum",
            native: "2,391,235",
            nativeToken: "ETH 0.0",
            stablecoin: "3,880",
            stablecoinTokens: "USDT,USDC,DAI,BUSD,FRAX",
            nft: "416.45",
            nftCount: "6",
            altcoin: "38,534",
            altcoinCount: "5",
            totalValue: "36,534",
            style: "DEX",
            riskLevel: "High"
        },
        {
            id: "2",
            address: "0x8ba6...Ag2h",
            chain: "Ethereum",
            native: "2,391,235",
            nativeToken: "ETH 0.0",
            stablecoin: "3,880",
            stablecoinTokens: "USDT,USDC,DAI,BUSD,FRAX",
            nft: "416.45",
            nftCount: "6",
            altcoin: "38,534",
            altcoinCount: "5",
            totalValue: "36,534",
            style: "DEX",
            riskLevel: "High"
        }
    ]

    const evmData = [
        {
            id: "1",
            chain: "Ethereum",
            stableCoin: "32000398",
            allValue: "32000398",
            nativeValue: "32000398",
            NFTValue: "32000398",
            totalValue: "32000398",
        },
        {
            id: "2",
            chain: "BSC",
            stableCoin: "32000398",
            allValue: "32000398",
            nativeValue: "32000398",
            NFTValue: "32000398",
            totalValue: "32000398",
        },
        {
            id: "3",
            chain: "Polygon",
            stableCoin: "32000398",
            allValue: "32000398",
            nativeValue: "32000398",
            NFTValue: "32000398",
            totalValue: "32000398",
        },

    ]

    const riskData = [
        { name: "Low", value: 32000398, fill: "var(--color-low)" },
        { name: "Medium", value: 32000398, fill: "var(--color-medium)" },
        { name: "High", value: 32000398, fill: "var(--color-high)" },
    ]

    const assetData = [
        { name: "Altcoin", value: 32000398, fill: "var(--color-altcoin)" },
        { name: "Stablecoin", value: 32000398, fill: "var(--color-stablecoin)" },
        { name: "Native", value: 32000398, fill: "var(--color-native)" },
        { name: "NFT", value: 32000398, fill: "var(--color-nft)" },
    ]

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

    return (
        <section className="pt-[4rem] pl-[2.8rem]">
            <div className="max-w-[110rem] w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-[#AACDE1] text-[1.8rem]">
                        EVM Analytics
                    </h2>

                    <div className="flex gap-[2.8rem] items-center">
                        <Button className="px-[1.5rem] py-[1.8rem] text-[1.4rem] bg-white rounded-[2rem] text-[#030712]">
                            All Chains
                        </Button>
                        <CustomTab
                            options={["EVM (25)", "SVM (25)", "BTC (25)"]}
                            content={[
                                <></>,
                                <></>,
                                <></>,
                            ]}
                            classNames={
                                {
                                    tabs: "w-fit mt-0",
                                    list: "!bg-[#172228] rounded-[3.5rem] !p-[1rem]",
                                    trigger: "data-[state=active]:bg-[#172228] data-[state=active]:shadow-[0px_2px_4px_0px_#00000066,0px_1px_2px_-1px_#FFFFFF29] data-[state=active]:text-[#D5F0FF] data-[state=active]:border data-[state=active]:border-[#253A46] text-[#7FA1B4] py-[1rem] rounded-[3rem]"
                                }
                            }
                        />
                    </div>
                </div>

                <div className="mt-[2rem]">
                    <DataTable
                        columns={chainsColumns}
                        data={evmData}
                    />
                </div>

                <div className="mt-[2.8rem]">
                    <h2 className="text-[1.8rem] text-[#AACDE1] mb-[1.8rem]">Total Distribution</h2>

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

                                <div className="w-[35%]">
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

                <div className="mt-[2rem]">
                    <DataTable
                        columns={portfolioColumns}
                        data={portfolioData}
                    />
                </div>
            </div>
        </section>
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

export default EvmChains;