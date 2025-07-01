import { Outlet } from "react-router-dom";
import Nav
    from "@/components/shared/common/navbar";
const AuthLayout = () => {
    return (
        <div className="min-h-screen pb-[5rem] w-screen bg-fg-base bg-no-repeat bg-cover sm:bg-[url(/auth/auth_bg.png)] bg-[url(/auth/auth_image_mobile.png)] flex flex-col">
            <Nav />
            <div className="px-[2rem] mt-[2.7rem] w-full">
                <div className="bg-white max-w-[61rem] rounded-[2rem] w-full mx-auto sm:px-[2.8rem] px-[1.5rem] py-[2.5rem]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;