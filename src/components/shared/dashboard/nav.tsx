import { SidebarTrigger } from "@/components/ui/sidebar";
import { AutoBreadcrumb } from "@/components/shared/common/autobreadCrumb";

const DashboardNav = () => {
    return (
        <div className="bg-[#131E24] border-[#192830] w-full">
            <div className="flex items-center pl-[3rem] py-[1.5rem]">
                <SidebarTrigger
                  className="text-[#7FA1B4] hover:bg-[#21343F] hover:text-[#D5F0FF]"
                />
                <div className="ml-[1.5rem]">
                    <AutoBreadcrumb 
                        showHome={false}
                        maxItems={4}
                        customLabels={{
                            'uploads': { label: 'Upload Management' },
                            'analyze': { label: 'Portfolio Analysis' },
                            'wallet': { label: 'Wallet' },
                            'transactions': { label: 'Transactions' },
                            'settings': { label: 'Settings' },
                            'profile': { label: 'Profile' }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default DashboardNav;