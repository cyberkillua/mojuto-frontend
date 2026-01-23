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
            classname: "top-[5rem] left-[6.8rem] rotate-[-20deg] size-[31rem]",
            name: "BTC"
        },
        {
            image: "/common/binance.png",
            classname: "size-[17rem] top-[53rem] rotate-37 left-[10rem]",
            name: "Binance"
        },
        {
            image: "/common/lite.png",
            classname: "size-[17rem] top-[66rem] left-[38rem] rotate-19",
            name: "Litecoin"
        },
        {
            image: "/common/stellar.png",
            classname: "size-[15rem] top-[77rem]  left-[76rem] rotate-[-12deg]",
            name: "Stellar"
        },
        {
            image: "/common/eth.png",
            classname: "size-[19rem] top-[54rem] left-[97rem] rotate-[-22deg]",
            name: "Ethereum"
        },
        {
            image: "/common/cardano.png",
            classname: "size-[22rem] top-[18.5rem] left-[104rem] rotate-[-27deg]",
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