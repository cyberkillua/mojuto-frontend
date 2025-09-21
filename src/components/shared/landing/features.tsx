import People from "@/components/shared/icons/people";
import MaxContainer from "../common/maxcontainer";
import Folder from "@/components/shared/icons/folder";
import { Button } from "@/components/ui/button";

const Features = () => {
    const features = [
        {
            icons: <People className="w-[36rem] h-[100%]" />,
            title: "Enterprise Collaboration",
            pargragh: "Manage up to 1000 wallets, get instant insights.",
        },
        {
            icons: <Folder className="w-[25rem] h-[100%]" />,
            title: "Periodic Onchain Statement",
            pargragh: "Compare wallets 1v1, 2v2, or bulk vs bulk.",
        },
        {
            icons: "",
            title: <>Multi-Chain <br></br> Support</>,
            pargragh: "Analyze thousands of wallets at once across multiple chains ",
        },

    ]

    return (
        <section
            className="sm:mt-[13rem] sm:px-[7rem] px-[2.5rem] mt-[7rem]"
        >
            <h2 className="text-[1.3rem] text-center text-[#7EF9FF]">Experiment</h2>
            <h3 className="text-center text-[3.4rem] text-white font-[400]">Features</h3>
            <MaxContainer
                className="grid sm:grid-cols-2 sm:mt-[6rem] sm:gap-[3rem]"
            >
                {
                    features.map((item, index) => (
                        <div
                            className=" sm:pt-[8.3rem] sm:rounded-[2rem] sm:data-[islast=true]:col-span-2 sm:data-[islast=true]:h-[56rem] sm:px-[4rem] bg-[url(/common/card-bg.png)] data-[islast=true]:bg-[url(/common/last-card-bg.png),url(/common/starlight.png)] data-[islast=true]:bg-contain bg-no-repeat data-[islast=true]:bg-[position:center,bottom_right] bg-[#010F10] sm:pb-[4rem]"
                            key={index}
                            data-islast={index === features.length - 1}
                        >
                            {
                                index !== 2 && (
                                    <div className="h-[35rem] mx-auto w-fit">
                                        {item.icons}
                                    </div>
                                )
                            }
                            <div
                                className="sm:w-[39rem] data-[islast=true]:mt-[6rem]"
                                data-islast={index === features.length - 1}
                            >
                                <h2
                                    className="text-[2.8rem] text-[#FFFFFF] data-[islast=true]:text-[3.2rem]"
                                    data-islast={index === features.length - 1}
                                >
                                    {item.title}
                                </h2>
                                <p
                                    className="text-[1.6rem] sm:w-[22rem] mt-[1.5rem] sm:data-[islast=true]:w-[28rem] text-[#B2D5E9]"
                                    data-islast={index === features.length - 1}
                                >
                                    {item.pargragh}
                                </p>

                                {
                                    index == 2 && (
                                        <Button
                                            className="bg-white px-[3.6rem] mt-[4rem] py-[2rem] text-[#030712] rounded-[3rem]"
                                        >
                                            TRY MOJUTO
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </MaxContainer>
        </section>
    );
}

export default Features;
