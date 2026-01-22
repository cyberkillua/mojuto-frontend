import Nav from "@/components/shared/landing/navbar";
import Hero from "@/components/shared/landing/hero";
import UseCase from "@/components/shared/landing/use-case";
import Features from "@/components/shared/landing/features";
import Actions from "@/components/shared/landing/action";
import CTA from "@/components/shared/landing/cta";
import Offer from "@/components/shared/landing/offer";
import Footer from "@/components/shared/landing/footer";
import MaxContainer from "@/components/shared/common/maxcontainer";

const Home = () => {
    return (
        <div className="bg-[#000000] w-[100vw] overflow-x-hidden">
            <MaxContainer
                className="sm:bg-[url(/common/coins.png),url(/common/globe_flare.png)] bg-no-repeat sm:bg-[position:top_center,center_center] bg-[url(/common/coins_sm.png),url(/common/flare_mobile.png)] sm:bg-[length:100%_auto] bg-[length:150%_auto] bg-[position:center_top]"
                
            >
                <Nav />
                <Hero />
               <UseCase />
            </MaxContainer>
            <Features />
            <Offer />
            <Actions />
            <CTA />
            <Footer />
        </div>
    );
}

export default Home; 