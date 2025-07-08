import Home from "../icons/home"
import Analytics from "../icons/analytics"
import Settings from "../icons/settings"
import { SidebarHeader } from "@/components/ui/sidebar"
import Logo from "../icons/logo"
import { useLocation } from "react-router-dom"
import { useSidebar } from "@/components/ui/sidebar"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { Binoculars } from "lucide-react"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard/home",
        icon: Home,
    },
    {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: Analytics,
    }
]

export function AppSidebar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const { open } = useSidebar();

    return (
        <Sidebar className="" collapsible="icon">
            <SidebarHeader className="pt-[3rem] pl-[1.2rem]">
                {
                    open ? (
                        <Logo
                            classname="h-[3rem] w-[10rem]"
                        />
                    ) : (
                     <img
                         src="/common/binoculars.svg"
                         alt="logo"
                         className="w-[3.5rem]"
                       />
                    )
                }
            </SidebarHeader>
            <SidebarContent className="mt-[1rem] px-[1rem]">
                <SidebarGroup>
                    <SidebarGroupContent className="">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem className="!text-[1.4rem] mt-[.5rem]" key={item.title}>
                                    <SidebarMenuButton asChild className={`!text-[1.5rem] !h-[3.2rem] hover:bg-[#21343F] font-medium hover:text-[#D5F0FF] px-[.9rem] ${currentPath === item.url ? "bg-[#21343F] text-[#D5F0FF]" : ""}`}>
                                        <a href={item.url}>
                                            <item.icon
                                                classname="mr-[1rem] !size-[2rem]"
                                            />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mt-[2rem] px-[1rem] pb-[3rem]">
                <SidebarMenu>
                    <SidebarMenuItem
                        className="!text-[1.4rem] mt-[.5rem]"
                    >
                        <SidebarMenuButton asChild className="!text-[1.5rem] !h-[3.2rem] hover:bg-[#21343F] font-medium hover:text-[#D5F0FF] px-[.9rem]">
                            <a href={"/dashboard/settings"}>
                                <Settings
                                    classname="mr-[1rem] !size-[2rem]"
                                />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem
                        className="!text-[1.4rem] mt-[.5rem]"
                    >
                        <SidebarMenuButton asChild className="!text-[1.5rem] !h-[3.2rem] hover:bg-[#21343F] font-medium hover:text-[#D5F0FF] px-[.9rem]">
                            <a href={"/dashboard/settings"}>
                                <Settings
                                    classname="mr-[1rem] !size-[2rem]"
                                />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                {/* <div className="mt-[2rem]">
                    <div className="flex items-center">
                        <div className="size-[3rem] rounded-full bg-[#35505F] grid place-content-center mr-[1.2rem] text-[1.3rem] font-medium text-white">
                            M
                        </div>
                        <span className="font-[500] text-[1.3rem]">Mojuto Mukhtar</span>
                    </div>
                </div> */}
            </SidebarFooter>
        </Sidebar>
    )
}