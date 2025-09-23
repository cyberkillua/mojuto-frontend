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
        <section className="sm:px-[7rem] sm:mt-[15rem] mt-[6rem] px-[2rem]">
            <MaxContainer>
                <Tabs className="" defaultValue="Professional Report">
                    <div className="">
                        <div className="sm:flex sm:flex-row flex-col justify-between items-center">
                            <h1 className="sm:text-[4rem] text-[2.3rem] text-center sm:text-start text-white">
                                What We Offer
                            </h1>

                            <TabsList className="px-[1rem] w-full mt-[1rem] sm:mt-0 overflow-scroll sm:w-fit sm:py-[1.5rem] rounded-[4rem] !h-fit bg-[#172228] py-[1rem]">
                                {
                                    items.map((item, index) => {
                                        return (
                                            <TabsTrigger
                                                key={index}
                                                className="text-[#7FA1B4] data-[state=active]:border-[#253A46] data-[state=active]:bg-transparent rounded-[3rem] cursor-pointer data-[state=active]:bg-[linear-gradient(89.37deg,#9EF0FF_-4.84%,#BAFFA2_51.89%,#ADFF9C_93.76%),linear-gradient(0deg,rgba(255,255,255,0.15),rgba(255,255,255,0.15))] data-[state=active]:bg-clip-text data-[state=active]:text-transparent sm:p-[1.5rem] sm:text-[1.3rem] data-[isFirst=true]:ml-[8rem] sm:data-[isFirst=true]:mt-0  text-[1rem] p-[.8rem]"
                                                value={item.title}
                                                data-isFirst={index === 0}
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
                                        className="sm:mt-[4rem]"
                                    >
                                        <div className="mt-[2rem] items-center flex flex-col sm:flex-row justify-between">
                                            <div className="">
                                                {
                                                    item.offers.map((offer, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex border-b-[0.25px_solid] border-b [border-image:linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(0,234,255,0.6)_50.48%,rgba(255,255,255,0.12)_100%)_1]  w-[35rem] flex-col sm:py-[3rem] py-[2rem]"
                                                            >
                                                                <p className="text-[#B2D5E9] text-[1.2rem] sm:text-[1.8rem]">{offer}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div
                                                className="bg-[#172228] mt-[2.5rem] sm:mt-0 sm:w-[67rem] w-full sm:h-[47rem] sm:rounded-[5rem] rounded-[3rem] h-[30rem]"
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