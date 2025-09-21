import MaxContainer from "../common/maxcontainer";

const Footer = () => {
    return (
        <footer className="sm:px-[7rem] mt-[20rem] sm:pb-[6rem]">
            <MaxContainer>
                <div className="flex justify-between">
                    <p className="text-[#7EF9FF] text-[3.2rem]">
                        Analyze Wallets
                        <br></br>
                        Satisfied BS
                    </p>

                    <div className="grid sm:grid-cols-3 sm:gap-[7rem]">
                        {
                            [
                                {
                                    title: "Support",
                                    items: [
                                        {
                                            text: "Terms of Service",
                                            link: ""
                                        },
                                        {
                                            text: "Privacy Policy",
                                            link: ""
                                        },
                                    ]
                                },
                                {
                                    title: "Solutions",
                                    items: [
                                        {
                                            text: "Chat with us",
                                            link: ""
                                        },
                                        {
                                            text: "Mojuto Experts",
                                            link: ""
                                        },
                                        {
                                            text: "Changelog",
                                            link: ""
                                        },
                                    ]
                                },
                                {
                                    title: "Contact",
                                    items: [
                                        {
                                            text: "Hello@mojuto.com",
                                            link: ""
                                        },
                                        {
                                            text: "+234 908 2514 5653",
                                            link: ""
                                        },
                                    ]
                                },

                            ].map((item, index) => {
                                return (
                                    <div className="" key={index}>
                                        <h3 className="text-[#7EF9FF] text-[1.6rem] mb-[1.5rem]">{item.title}</h3>
                                        {
                                            item.items.map((item, index) => {
                                                return (
                                                    <a href={item.link} key={index} className="">
                                                        <p

                                                            className="text-[1.5rem] text-[#637A7A] mb-[1.5rem]">{item.text}</p>
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex justify-between sm:mt-[6.8rem] items-center">
                    <p className="text-[1.6rem] text-[#637A7A]">2025 Mojuto</p>

                    <div className="grid sm:grid-cols-4 sm:gap-[2.5rem]">
                        {
                            [
                                {
                                    link: "",
                                    icon: "/common/in.svg",
                                },
                                {
                                    link: "",
                                    icon: "/common/x.svg",
                                },
                                {
                                    link: "",
                                    icon: "/common/github.svg",
                                },
                                {
                                    link: "",
                                    icon: "/common/ig.svg",
                                },

                            ].map((item, index) => (
                                <a href={item.link} className="size-fit">
                                    <img
                                        src={item.icon}
                                        alt="social icon"
                                        key={index}
                                        className="size-[1.5rem]"
                                    />
                                </a>
                            ))
                        }
                    </div>
                </div>
            </MaxContainer>
        </footer>
    );
}

export default Footer;