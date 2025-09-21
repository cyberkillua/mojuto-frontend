import MaxContainer from "../common/maxcontainer";
import { Button } from "@/components/ui/button";

const CTA = () => {
    return (
        <section className="sm:px-[7rem] sm:mt-[13rem]">
            <MaxContainer className="flex py-[10rem] bg-[url(/common/cta_bg.png)] bg-[length:100%_100%] rounded-[3rem]  flex-col ">
                <img
                    src="/common/igo.svg"
                    alt="binoculars"
                    className="w-[30rem] mx-auto"
                />
                <p className="text-center mx-auto mt-[4rem] text-[4.4rem] text-white w-[50rem]">
                    Ready to analyze your wallets for insights?
                </p>
                <Button className="px-[3rem] mt-[3.5rem] mx-auto py-[2rem] text-[#030712] text-[1.5rem] font-[600] bg-white rounded-[3rem]">
                    TRY MOJUTO
                </Button>
            </MaxContainer>
        </section>
    );
}
export default CTA;