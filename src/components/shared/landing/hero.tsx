import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="flex flex-col">
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