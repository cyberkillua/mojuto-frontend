import { Outlet } from "react-router-dom";
const AuthLayout = () => {
    return (
        <div className="min-h-screen py-[6rem] w-screen bg-fg-base bg-no-repeat px-[2rem] bg-cover sm:bg-[url(/auth/auth_bg.png)] bg-[url(/auth/auth_image_mobile.png)] flex justify-center items-center">
            <div className="bg-white max-w-[52rem] rounded-[2rem] w-full mx-auto sm:px-[2.8rem] px-[1.5rem] py-[2.5rem]">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;