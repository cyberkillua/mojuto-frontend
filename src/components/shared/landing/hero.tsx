import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="flex flex-col min-h-[100vh]">
            <h1 className="text-[5.5rem] mt-[17rem] text-[#FFFFFF] font-[400] mx-auto text-center w-[50rem]">
                Analyze wallets across EVM, Bitcoin & Solana Chains.
            </h1>

            <Button className="mx-auto bg-white mt-[3.5rem] text-[#030712] text-[1.2rem] font-[700] px-[3rem] rounded-[3rem] py-[2.5rem]">
                TRY MOJUTO
            </Button>
        </section>
    );
}

export default Hero;