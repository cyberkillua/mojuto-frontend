import Logo from "../icons/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MaxContainer from "../common/maxcontainer";
const Nav = () => {
    return (
        <nav className="pt-[4rem] px-[11rem]">
            <MaxContainer className="flex justify-between">
                <Logo />


                <div className="flex gap-[8.1rem]">
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
                                    className="text-[1.4rem] text-[#FFFFFF] font-[300]"
                                >
                                    <Link to={item.link}>
                                        {item.name}
                                    </Link>
                                </Button>
                            )
                        })
                    }
                </div>
            </MaxContainer>
        </nav>
    );
}

export default Nav;