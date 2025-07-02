import Logo from "../icons/logo";
import X from "../icons/x";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Nav = () => {

    const navItems = [
        {
            name: "Contact Us",
            link: "#"
        },
        {
            name: "X",
            link: "#"
        }
    ]

    return (
        <nav className=" sm:px-[7rem] px-[2rem] py-[2rem] w-full">
            <div className="max-w-[1920px] mx-auto w-full flex justify-between items-center">
                <Logo />
                <div className="flex  sm:gap-x-[2rem] gap-x-[1.5rem] items-center">
                    {
                        navItems.map((navItem, idx) => {
                            return (
                                <Button asChild key={idx} className="font-rubik bg-off-white !px-[2rem] rounded-[3rem] !h-fit sm:!py-[1.2rem] py-[1rem] text-[#ffffff] text-[1.3rem] font-light backdrop-blur-[1rem]">
                                    <Link  to={navItem.link} className="">
                                        {
                                            navItem.name === "Contact Us" ? ("Contact Us") : (
                                                <X
                                                    fill="white"
                                                />
                                            )
                                        }
                                    </Link>
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
        </nav>
    );
}

export default Nav;