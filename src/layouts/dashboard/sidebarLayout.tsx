import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/common/sidebar";


const SidebarLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="bg-[]">
                <SidebarTrigger />
                <section className="bg-[]">
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    );
}

export default SidebarLayout;