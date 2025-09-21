import MaxContainer from "../common/maxcontainer";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const Offer = () => {
    const items = [
        {
            title: "Professional Report",
            img: "",
            offers: [
                "Monthy Onchain statements",
                "DEX volume trends",
                "Trade size and portfolio allocation",
                "Protocol Breakdown",
                "Volume distribution across major DEXs"
            ]
        },
        {
            title: "CEX  Tracking",
            img: "",
            offers: [
                "DeFi Ecosystem",
                "Gaming & Metaverse",
                "NFT Ecosystem",
                "RWA, Prediction Market, Social-Fi Etc"
            ]
        },
        {
            title: "Interaction Mapping",
            img: "",
            offers: [
                "Liquidity Positions",
                "Lending & Borrowing",
                "Staking Positions",
                "Yield Calculator"
            ]
        },
        {
            title: "Position Tracking",
            img: "",
            offers: [
                "Major Exchange Integration",
                "Inflows & outflows",
                "Volume & frequency of CEX interactions",
                "Exchange concentration risk"
            ]
        },

    ]
    return (
        <section className="sm:px-[7rem] mt-[15rem] px-[2rem]">
            <MaxContainer>
                <Tabs className="" defaultValue="Professional Report">
                    <div className="">
                        <div className="sm:flex hidden sm:flex-row flex-col justify-between items-center">
                            <h1 className="text-[4rem] text-white">
                                What We Offer
                            </h1>

                            <TabsList className="px-[1rem] py-[1.5rem] rounded-[4rem] !h-fit bg-[#172228]">
                                {
                                    items.map((item, index) => {
                                        return (
                                            <TabsTrigger
                                                key={index}
                                                className="text-[#7FA1B4] data-[state=active]:border-[#253A46] data-[state=active]:bg-transparent rounded-[3rem] cursor-pointer data-[state=active]:bg-[linear-gradient(89.37deg,#9EF0FF_-4.84%,#BAFFA2_51.89%,#ADFF9C_93.76%),linear-gradient(0deg,rgba(255,255,255,0.15),rgba(255,255,255,0.15))] data-[state=active]:bg-clip-text data-[state=active]:text-transparent p-[1.5rem] text-[1.3rem]"
                                                value={item.title}
                                            >
                                                {item.title}
                                            </TabsTrigger>
                                        )
                                    })
                                }
                            </TabsList>
                        </div>

                        {
                            items.map((item, index) => {
                                return (
                                    <TabsContent
                                        key={index}
                                        value={item.title}
                                        className="mt-[4rem]"
                                    >
                                        <div className="mt-[2rem] items-center flex justify-between">
                                            <div className="">
                                                {
                                                    item.offers.map((offer, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex border-b-[0.25px_solid] border-b [border-image:linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(0,234,255,0.6)_50.48%,rgba(255,255,255,0.12)_100%)_1]  w-[35rem] flex-col py-[3rem]"
                                                            >
                                                                <p className="text-[#B2D5E9] text-[1.8rem]">{offer}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div
                                                className="bg-[#172228] w-[67rem] h-[47rem] rounded-[5rem]"
                                            />
                                        </div>
                                    </TabsContent>
                                )
                            })
                        }
                    </div>
                </Tabs>

            </MaxContainer>

        </section>
    );
}

export default Offer;