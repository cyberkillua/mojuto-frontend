import { Outlet } from "react-router-dom";
import { SidebarProvider, } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/common/sidebar";
import DashboardNav from "@/components/shared/dashboard/nav";


const SidebarLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-[url(/common/dashboard-background.png)] bg-cover bg-no-repeat bg-center bg-fixed min-h-screen">
                <DashboardNav />
                {/* <SidebarTrigger /> */}
                <section className="pt-[3.2rem] pl-[3.2rem]">
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    );
}

export default SidebarLayout;