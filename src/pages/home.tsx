import MaxContainer from "@/components/shared/common/maxcontainer";
import  scroll, { resetScroll } from "@/animations/scroll";
import { split } from "@/animations/text";
import { useEffect } from "react";
import Nav from "@/components/shared/landing/navbar";
import Hero from "@/components/shared/landing/hero";
import UseCase from "@/components/shared/landing/use-case";
import Features from "@/components/shared/landing/features";
import Actions from "@/components/shared/landing/action";
import CTA from "@/components/shared/landing/cta";
import Offer from "@/components/shared/landing/offer";
import Footer from "@/components/shared/landing/footer";

const Home = () => {
    useEffect(() => {
        document.body.classList.add("landing-scroll");
        scroll();
        split();
        return () => {
            document.body.classList.remove("landing-scroll");
            resetScroll();
        };
    }, []);
    return (
        <div 
            className="bg-[#000000] w-[100vw] overflow-x-hidden"
            
        >
            
            <MaxContainer
                className="bg-[url(/common/hero-bg-mobile.png)] sm:bg-[url(/common/mojuto-hero-bg.png)] max-w-[1440px] mx-auto sm:h-[98rem] h-[62rem]  bg-size-[length:100%_100%] bg-no-repeat bg-center relative"
            >
                <Nav />
                <Hero />
            </MaxContainer>
            <UseCase />
            <Features />
            <Offer />
            <Actions />
            <CTA />
            <Footer />
        </div>
    );
}

export default Home; 