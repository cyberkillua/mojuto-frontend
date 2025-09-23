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
            className="pt-[4rem] sm:px-[11rem] w-[100vw]  px-[2.5rem]">
            <MaxContainer className="flex justify-between">
                <Logo />

                <div
                    className="flex flex-col duration-300 ease-in data-[open=true]:translate-y-[-100%] translate-y-0 px-[2rem] sm:px-0 sm:flex-row border rounded-b-[2rem] shadow-2xl fixed w-full z-[101] bg-[#000000] h-[35rem] left-0 right-0 top-0 sm:gap-[8.1rem] border-[#27282D] justify-center gap-[2rem] sm:border-none"
                    data-open={!isOpen}
                >
                    {
                        [
                            {
                                name: "Changelog",
                                link: "#",
                            },
                            {
                                name: "FAQs",
                                link: "#",
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
                                    className="text-[1.4rem] w-fit text-[#FFFFFF] font-[300]"
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
                    className="bg-white size-[4rem] relative z-[102] shrink-0 items-end justify-center rounded-full flex flex-col gap-[.6rem]"
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