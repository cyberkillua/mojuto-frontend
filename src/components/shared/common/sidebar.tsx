import Home from "../icons/home"
import Wallet from "../icons/wallet"
import { SidebarHeader } from "@/components/ui/sidebar"
import Logo from "../icons/logo"
import { useLocation } from "react-router-dom"
import { useSidebar } from "@/components/ui/sidebar"
import Binoculars from "../icons/binoculars"
import { Link } from "react-router-dom"
import { useFetch } from "@/hooks/use-fetch"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import Settings from "../icons/settings"
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
} from "@/components/ui/sidebar"
import ChangeLog from "../icons/changelog"
import Help from "../icons/help"
import LogOut from "../icons/logout"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard/home",
        icon: Home,
    },
    {
        title: "Wallet Upload",
        url: "/dashboard/analytics",
        icon: Wallet,
    }
]

export function AppSidebar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const { open } = useSidebar();

    const {
        data: userData,
        isPending
    } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await useFetch("/user/get-logged-in-user")
            return response.data
        },
    })


    return (
        <Sidebar className="border-[#192830]" collapsible="icon">
            <SidebarHeader className="pt-[3rem] pl-[1.2rem]">
                {
                    open ? (
                        <Logo
                            classname="h-[3rem] w-[10rem]"
                        />
                    ) : (
                        <Binoculars
                            classname="w-[3.5rem]"
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
                                        <Link to={item.url}>
                                            <item.icon
                                                classname="mr-[1rem] !size-[2rem]"
                                            />
                                            <span>{item.title}</span>
                                        </Link>
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
                                className="!text-[1.4rem] flex flex-col gap-[.7rem] mt-[.5rem]"
                            >
                                <SidebarMenuButton asChild className="!text-[1.3rem] !h-[3.2rem] hover:bg-[#21343F] font-medium hover:text-[#D5F0FF] px-[.9rem]">
                                    <Link to={"/dashboard/changeLog"}>
                                        <ChangeLog
                                            className="mr-[1rem] !size-[2rem]"
                                        />
                                        <span className="font-[400]">Changelog</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild className="!text-[1.3rem] !h-[3.2rem] hover:bg-[#21343F] font-medium hover:text-[#D5F0FF] px-[.9rem]">
                                    <Link to={"/dashboard/settings"}>
                                        <Settings
                                            className="mr-[1rem] !size-[2rem]"
                                        />
                                        <span className="font-[400]">Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild className="!text-[1.3rem] !h-[3.2rem] hover:bg-[#21343F] font-medium hover:text-[#D5F0FF] px-[.9rem]">
                                    <Link to={"/dashboard/help"}>
                                        <Help
                                            className="mr-[1rem] !size-[2rem]"
                                        />
                                        <span className="font-[400]">Help</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild className="!text-[1.3rem] !h-[3.2rem] hover:bg-[#21343F] font-medium hover:text-[#D5F0FF] cursor-pointer px-[.9rem]" onClick={() => {
                                    sessionStorage.removeItem('accessToken')
                                    window.location.reload();

                                }
                                }>
                                    <span>
                                        <LogOut
                                            className="mr-[1rem] !size-[2rem]"
                                        />
                                        <span className="font-[400]">Log Out</span>
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>



                            {
                                isPending ? (
                                    <Skeleton
                                        className="w-[100%] mt-[2rem] h-[2.5rem] rounded-[2.5rem] bg-[#21343F]"
                                    />
                                ) : (
                                    <SidebarMenuItem
                                        className="!text-[1.4rem] p-0 mt-[2rem]"
                                    >
                                        <div className="!text-[1.3rem] flex items-center !h-[3.7rem] hover:bg-transparent gap-[1rem] font-medium group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:size-[3.5rem]! ">
                                            <UserAvatar initial={userData?.firstName[0]} />
                                            <span className="truncate capitalize">{`${userData?.firstName} ${userData?.lastName}`}</span>

                                        </div>
                                    </SidebarMenuItem>
                                )
                            }

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}