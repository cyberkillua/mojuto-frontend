import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Coins {
    image: string;
    classname: string;
    name: string;
}

const Hero = () => {
    const coins: Coins[] = [
        {
            image: "/common/btc.png",
            classname: "sm:top-[5rem] sm:left-[6.8rem] sm:rotate-[-20deg] sm:size-[31rem] left-[-6.7rem] top-[18rem] size-[16rem]",
            name: "BTC"
        },
        {
            image: "/common/binance.png",
            classname: "size-[17rem] top-[53rem] rotate-37 hidden sm:block left-[10rem]",
            name: "Binance"
        },
        {
            image: "/common/lite.png",
            classname: "sm:size-[17rem] size-[12rem] sm:top-[66rem] top-[37rem] sm:left-[38rem]  rotate-19",
            name: "Litecoin"
        },
        {
            image: "/common/stellar.png",
            classname: "sm:size-[15rem] size-[6.8rem] sm:top-[77rem] top-[47rem]  sm:left-[76rem] left-[15.7rem] rotate-[-12deg]",
            name: "Stellar"
        },
        {
            image: "/common/eth.png",
            classname: "sm:size-[19rem] size-[8.7rem] sm:top-[54rem] top-[38rem] sm:left-[97rem] left-[28rem] rotate-[-22deg]",
            name: "Ethereum"
        },
        {
            image: "/common/cardano.png",
            classname: "sm:size-[22rem] size-[10.2rem] sm:top-[18.5rem] top-[22.8rem] sm:left-[104rem] left-[32rem] rotate-[-27deg]",
            name: "Cardano"
        },

    ]
    return (
        <section className="flex flex-col">
            {
                coins.map((coin) => {
                    return (
                        <img
                            src={coin.image}
                            alt={coin.name}
                            className={`${coin.classname} absolute`}
                            key={coin.name}
                        />
                    )
                })
            }
            <h1 className="sm:text-[5.5rem] text-[3rem] sm:mt-[17rem] mt-[6rem] text-[#FFFFFF] font-[400] mx-auto capitalize text-center sm:w-[50rem] w-[27rem]">
                Analyze wallets across EVM, Bitcoin & Solana Chains.
            </h1>

            <Button asChild className="mx-auto hover:bg-transparent hover:border-[1.5px] hover:border-[#7EF9FF]  bg-white mt-[3.5rem] text-[#030712] text-[1.2rem] font-[700] px-[3rem] rounded-[3rem] py-[2.5rem] hover:text-[#7EF9FF]">
                <Link to="/dashboard">
                    TRY MOJUTO
                </Link>
            </Button>
        </section>
    );
}

export default Hero;