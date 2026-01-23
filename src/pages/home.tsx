import MaxContainer from "@/components/shared/common/maxcontainer";

import Nav from "@/components/shared/landing/navbar";
import Hero from "@/components/shared/landing/hero";
import UseCase from "@/components/shared/landing/use-case";
import Features from "@/components/shared/landing/features";
import Actions from "@/components/shared/landing/action";
import CTA from "@/components/shared/landing/cta";
import Offer from "@/components/shared/landing/offer";
import Footer from "@/components/shared/landing/footer";

const Home = () => {
    return (
        <div className="bg-[#000000] w-[100vw] overflow-x-hidden">
            <MaxContainer
                className="bg-[url(/common/mojuto-hero-bg.png)] max-w-[1440px] mx-auto h-[988px] bg-size-[length:100%_100%] bg-no-repeat bg-center relative"
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