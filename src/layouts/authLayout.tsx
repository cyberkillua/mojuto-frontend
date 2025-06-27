import { Outlet } from "react-router-dom";
const AuthLayout = () => {
    return (
        <div className="min-h-screen py-[6rem] w-screen bg-fg-base bg-no-repeat bg-cover bg-[url(/auth/auth_bg.png)] flex justify-center items-center">
            <div className="bg-white max-w-[52rem] rounded-[2rem] w-full mx-auto px-[2.8rem] py-[2.5rem]">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;