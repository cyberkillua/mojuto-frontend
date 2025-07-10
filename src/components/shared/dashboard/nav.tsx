import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const DashboardNav = () => {
    const location = useLocation();
    const currentPathArr = location.pathname.split("/");
    const currentPath = currentPathArr[currentPathArr.length - 1];

    return (
        <div className="bg-[#131E24] border-[#192830] w-full">
            <div className="flex items-center pl-[3rem] py-[1.5rem]">
                <SidebarTrigger
                  className="text-[#7FA1B4] hover:bg-[#21343F] hover:text-[#D5F0FF]"
                />
                <h1 className="text-[#7FA1B4] ml-[1.5rem] font-medium text-[1.4rem] capitalize">{currentPath}</h1>
            </div>
        </div>
    );
}

export default DashboardNav;