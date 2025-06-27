import { Link } from "react-router-dom";
const Home = () => {
    return (
        <main className="flex justify-between pt-[2rem] px-[4rem]">
            <h1 className="text-[1.4rem]">Mojuto Landing page goes here</h1>
            
            <div className="flex text-[1.2rem] text-[blue] gap-[2rem]">
                <Link to={"/login"}>Login</Link>
                <Link to={"/signup"}>Sign Up</Link>
            </div>
        </main>
    );
}

export default Home;