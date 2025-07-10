import Home from "../icons/home"
import Analytics from "../icons/analytics"
import Settings from "../icons/settings"
import { SidebarHeader } from "@/components/ui/sidebar"
import Logo from "../icons/logo"
import { useLocation } from "react-router-dom"
import { useSidebar } from "@/components/ui/sidebar"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "../icons/user-avater"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarMenuAction,

} from "@/components/ui/sidebar"

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
        <Sidebar className="border-[#192830]" collapsible="icon">
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
                    <SidebarGroupContent>
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
            <SidebarFooter className="mt-[2rem] pl-[1rem] pr-[2rem] pb-[3rem]">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu >
                            <SidebarMenuItem
                                className="!text-[1.4rem] mt-[.5rem]"
                            >
                                <SidebarMenuButton asChild className="!text-[1.3rem] !h-[3.2rem] hover:bg-[#21343F] font-medium hover:text-[#D5F0FF] px-[.9rem]">
                                    <a href={"/dashboard/settings"}>
                                        <Settings
                                            classname="mr-[1rem] !size-[2rem]"
                                        />
                                        <span>Settings</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem
                                className="!text-[1.4rem] p-0 mt-[2rem]"
                            >
                                <SidebarMenuButton asChild className="!text-[1.3rem] !h-[3.7rem] hover:bg-[#21343F] font-medium group-data-[collapsible=icon]:p-1! hover:text-[#D5F0FF] group-data-[collapsible=icon]:size-[3.5rem]! ">
                                    <a href="#">
                                        <UserAvatar initial="M" />
                                        <span>Mojuto Mukhtar</span>
                                    </a>
                                </SidebarMenuButton>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction>
                                            <MoreHorizontal
                                                className="!size-[2rem] mt-[.7rem]"
                                            />
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="right" align="start">
                                        <DropdownMenuItem>
                                            <span>Edit Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span>Delete Project</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}