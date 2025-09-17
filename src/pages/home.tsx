import DashboardHome from "./dashboard/dashboard-home";
import Nav from "@/components/shared/landing/navbar";
import Hero from "@/components/shared/landing/hero";
import UseCase from "@/components/shared/landing/use-case";


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
        </div>
    );
}

export default Home; DashboardHome