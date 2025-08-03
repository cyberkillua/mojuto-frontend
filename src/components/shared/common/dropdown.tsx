import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DropDown = ({
    children,
    dropdownMenuIems,
    
}: {
    children: React.ReactNode,
    dropdownMenuIems: React.ReactNode[]
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="bg-[#172329] p-[.5rem] border-none shadow-[0px_8px_16px_0px_#00000052,0px_0px_0px_1px_#FFFFFF1A]  text-[#EDEEF0]">
                {dropdownMenuIems?.map((item, index) => (
                    <DropdownMenuItem
                        className={`text-[1.4rem] ${index > 0 ? "mt-[.7rem]" : "" } !pr-[7rem] px-[2rem] !w-full py-[.8rem]`}
                        key={index}>
                        {item}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DropDown;