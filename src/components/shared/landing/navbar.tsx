import Logo from "../icons/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MaxContainer from "../common/maxcontainer";
import { useState, useEffect } from "react";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ToggleNavOpen = () => {
        setIsOpen(prevIsopen => !prevIsopen)
    }
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen])
    return (
        <nav
            className="pt-[4rem] sm:px-[11rem] sm:mb-[3rem] w-[100vw]  px-[2.5rem]">
            <MaxContainer className="flex items-center justify-between">
                <Logo />

                
                <div
                    className="flex flex-col  sm:flex-row text-white duration-300 ease-in data-[open=true]:translate-x-[100%] sm:data-[open=true]:translate-x-0 translate-y-0 sm:translate-y-0 sm:bg-transparent px-[2rem] sm:px-0 fixed sm:static sm:w-fit w-full z-[101] bg-black/60 backdrop-blur-md h-full sm:h-auto left-0 right-0 pt-[25rem] sm:pt-0 top-0 sm:gap-[2rem] border-[#27282D] gap-[2rem] sm:border-none"
                    data-open={!isOpen}
                >
                    {
                        [
                            {
                                name: "Changelog",
                                link: "",
                            },
                           
                            {
                                name: "Contact Us",
                                link: "#",
                            }
                        ].map((item, index) => {
                            return (
                                <Button
                                    asChild
                                    variant={"ghost"}
                                    key={index}
                                    className="text-[1.4rem] w-full  sm:w-fit bg-[#7EF4FF1A] px-[2rem] py-[1.8rem] rounded-[2rem] border text-[#7EF9FF] font-[300]"
                                >
                                    <Link to={item.link}>
                                        {item.name}
                                    </Link>
                                </Button>
                            )
                        })
                    }
                </div>

                <Button
                    className="bg-white size-[4rem] sm:hidden relative z-[102] shrink-0 items-end justify-center rounded-full flex flex-col gap-[.6rem]"
                    onClick={ToggleNavOpen}
                >
                    <div className="w-full h-[.15rem] bg-[#000000]" />
                    <div className="w-[60%] h-[.15rem] bg-[#000000]" />
                </Button>
            </MaxContainer>
        </nav>
    );
}

export default Nav;