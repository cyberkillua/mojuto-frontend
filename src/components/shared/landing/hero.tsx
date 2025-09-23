import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="flex flex-col ">
            <h1 className="sm:text-[5.5rem] text-[3rem] sm:mt-[17rem] mt-[10rem] text-[#FFFFFF] font-[400] mx-auto text-center sm:w-[50rem] w-[27rem]">
                Analyze wallets across EVM, Bitcoin & Solana Chains.
            </h1>

            <Button className="mx-auto bg-white mt-[3.5rem] text-[#030712] text-[1.2rem] font-[700] px-[3rem] rounded-[3rem] py-[2.5rem]">
                TRY MOJUTO
            </Button>
        </section>
    );
}

export default Hero;