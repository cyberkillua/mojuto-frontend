import MaxContainer from "../common/maxcontainer";

const Footer = () => {
    return (
        <footer className="sm:px-[7rem] px-[2rem] bg-[url(/common/footer-bg-mobile.png)] sm:bg-[url(/common/footer-bg.png)] bg-no-repeat bg-[length:100%_100%] pt-[4rem] sm:mt-[20rem] mt-[7rem] sm:pb-[6rem] pb-[5rem]">
            <MaxContainer>
                <div className="flex flex-col sm:flex-row justify-between">
                    <img
                        src="/common/footer-logo.png"
                        alt="mojuto-logo"
                        className="size-[26rem] mx-auto sm:mx-0"
                    />

                    <div className="grid sm:grid-cols-3 mt-[6.6rem] sm:mt-0 grid-cols-2 sm:gap-[7rem]">
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

                                                            className="sm:text-[1.5rem] text-[1.2rem] text-[#637A7A] sm:mb-[1.5rem] mb-[1.2rem]">{item.text}</p>
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

                <div className="grid grid-cols-4 w-[17rem] ml-auto sm:gap-[2.5rem] mt-[1.4rem] sm:mt-0 gap-[2.5rem]">
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
            </MaxContainer>
        </footer>
    );
}

export default Footer;