import Logo from "../icons/logo";

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
                <ul className="sm:flex  hidden gap-x-[2rem]">
                    {
                        navItems.map((navItem, idx) => {
                            return (
                                <li key={idx} className="font-rubik bg-off-white  px-[2.5rem] rounded-[3rem] py-[1.2rem] text-[#ffffff] text-[1.3rem] font-light backdrop-blur-[1rem]">
                                    <a href={navItem.link}>{navItem.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Nav;