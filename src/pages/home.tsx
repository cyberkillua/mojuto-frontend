import DashboardHome from "./dashboard/dashboard-home";
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
        <div className="bg-[#000000] min-h-[100vh]">
            <div
                className="bg-[url(/common/globe_flare.png)] bg-contain bg-no-repeat bg-center"
                style={{
                    backgroundPosition: 'center center',
                    backgroundSize: '100% auto',
                }}
            >
                <Nav />
                <Hero />
               <UseCase />
            </div>
            <Features />
            <Actions />
            <CTA />
            <Offer />
            <Footer />
        </div>
    );
}

export default Home; DashboardHome