import { Link } from "react-router-dom";
import DashboardHome from "./dashboard/dashboard-home";
const Home = () => {
    return (
        <main className="flex justify-between pt-[2rem] sm:px-[4rem] px-[2rem]">
            <h1 className="text-[1.4rem]">Mojuto Landing page goes here</h1>
            
            <div className="flex flex-col sm:flex-row text-[1.2rem] text-[blue] sm:gap-[2rem] gap-[1rem]">
                <Link to={"/login"}>Login</Link>
                <Link to={"/signup"}>Sign Up</Link>
            </div>
        </main>
    );
}

export default Home;DashboardHome