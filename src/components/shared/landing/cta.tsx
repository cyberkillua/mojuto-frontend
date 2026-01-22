import MaxContainer from "../common/maxcontainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="sm:px-[7rem] sm:mt-[13rem] mt-[7rem] px-[2rem]">
            <MaxContainer className="flex sm:py-[10rem] py-[6.7rem] bg-[url(/common/cta_bg.png)] bg-[length:100%_100%] rounded-[3rem]  flex-col ">
                <img
                    src="/common/igo.svg"
                    alt="binoculars"
                    loading="lazy"
                    decoding="async"
                    className="sm:w-[30rem] w-[20rem] mx-auto"
                />
                <p className="text-center mx-auto mt-[4rem] text-[2.2rem] sm:text-[4.4rem] text-white sm:w-[50rem] w-[26rem]">
                    Ready to analyze your wallets for insights?
                </p>
                <Button className="px-[3rem] hover:bg-transparent hover:border-[1.5px] hover:border-[#7EF9FF] hover:text-[#7EF9FF] mt-[3.5rem] mx-auto py-[2rem] text-[#030712] text-[1.2rem] sm:text-[1.5rem] font-[600] bg-white rounded-[3rem]">
                    <Link to="/dashboard">
                        TRY MOJUTO
                    </Link>
                </Button>
            </MaxContainer>
        </section>
    );
}
export default CTA;