import { Outlet } from "react-router-dom";
import { SidebarProvider, } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/common/sidebar";
import DashboardNav from "@/components/shared/dashboard/nav";


const SidebarLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-[#0F181D] bg-[url(/common/dashboard-background.png)] bg-cover bg-no-repeat bg-center bg-fixed min-h-screen">
                <DashboardNav />
                
                <section className="h-[calc(100vh-5.2rem)] overflow-y-auto">
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    );
}

export default SidebarLayout;