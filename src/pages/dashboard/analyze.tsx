import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChevronRight } from "lucide-react";
import { chainsColumns } from "@/components/shared/tables/columns/chains";
import { DataTable } from "@/components/shared/tables/data-table";
import { Link } from "react-router-dom";

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

    const chartData = [
        { coin: "Ethereum", desktop: 17 },
        { coin: "BSC", desktop: 55 },
        { coin: "Polygon", desktop: 20 },
        { coin: "Arbitrum", desktop: 18 },
        { coin: "Optimisim", desktop: 25 },
        { coin: "Solana", desktop: 22 },
        { coin: "Bitcoin", desktop: 13 },
    ]

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig

    const headerData = [
        {
            value: "32000398",
            text: "Total Portfolio Value",
            border: false
        },
        {
            value: "50",
            text: "Total Wallets",
            border: false,
        },
        {
            value: "32000398",
            text: "Stablecoin",
            border: true
        },
        {
            value: "3200098",
            text: "NFT",
            border: true,
        },
        {
            value: "32000398",
            text: "Native",
            border: true,
        },
        {
            value: "200",
            text: "Altcoin",
            border: true,
        },
    ]

    const vmData = [
        { name: "BTC", value: 32000398, fill: "var(--color-btc)" },
        { name: "SVM", value: 32000398, fill: "var(--color-svm)" },
        { name: "EVM", value: 32000398, fill: "var(--color-evm)" },
    ]

    const assetData = [
        { name: "Altcoin", value: 32000398, fill: "var(--color-altcoin)" },
        { name: "Stablecoin", value: 32000398, fill: "var(--color-stablecoin)" },
        { name: "Native", value: 32000398, fill: "var(--color-native)" },
        { name: "NFT", value: 32000398, fill: "var(--color-nft)" },
    ]

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



    return (
        <section className="pt-[3rem] px-[2.5rem]">
            <div className="max-[1440px]">
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
                                <p className={`text-[1.4rem] font-[400] mb-[1.5rem] ${item.border ? "text-[#8EA2AD]" : "text-white"}`}>{item.text}</p>
                                <p className={`text-white font-[500]  ${item.border ? "text-[3rem]" : "text-[4.5rem]"}`}>
                                    {idx === 1 || idx === 5 ? item.value : `$${Number(item.value).toLocaleString()}`}
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
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Pie data={vmData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={82} strokeWidth={0} />
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
                                <ChartContainer config={assetChartConfig} className="size-[20rem] mt-[3rem]">
                                    <PieChart>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Pie data={assetData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={82} strokeWidth={0} />
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
                        <ChartContainer config={chartConfig} className="h-[40rem] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid horizontal={false} vertical={false} />
                                <XAxis
                                    dataKey="coin"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value}
                                    className="text-[1.6rem] !text-[#8EA2AD]"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                                    className="text-[1.6rem] !text-[#8EA2AD]"
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
                            <p className="text-[1.4rem] mt-[.8rem] text-[#7FA1B4]">5 Chains - $68,235</p>
                        </div>

                        <Button
                            variant={"ghost"}
                            className="text-[#00EAFF] hover:bg-transparent hover:text-[#00EAFF] text-[1.4rem]"
                            asChild
                        >
                            <Link to="/dashboard/analyze/1/evm-chains">
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
                            <p className="text-[1.4rem] mt-[.8rem] text-[#7FA1B4]">$68,235</p>
                        </div>

                        <Button
                            variant={"ghost"}
                            className="text-[#00EAFF] text-[1.4rem]"
                        >
                            Details
                            <ChevronRight
                                className="ml-2 size-[1.8rem]"
                            />
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
                            <p className="text-[1.4rem] mt-[.8rem] text-[#7FA1B4]">$68,235</p>
                        </div>

                        <Button
                            variant={"ghost"}
                            className="text-[#00EAFF] text-[1.4rem]"
                        >
                            Details
                            <ChevronRight
                                className="ml-2 size-[1.8rem]"
                            />
                        </Button>
                    </div>

                    <div className="mt-[2rem]">
                        <DataTable
                            columns={chainsColumns}
                            data={evmData}
                        />
                    </div>
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

export default Analyze;