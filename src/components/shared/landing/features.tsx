import MaxContainer from "../common/maxcontainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useMotionValue, useVelocity, animate, } from "framer-motion";
import AnimatedNetworksSVG from "@/components/shared/icons/animatedSVG.js"

import SplitType from "split-type";
import { IO } from "@/animations/observe";
import gsap from "gsap";

interface Feature {
    icons?: React.ReactNode;
    title?: string | React.ReactNode;
    pargragh?: string;
    classNames?: string;
}

const Features = () => {
    const textRef = useRef<HTMLParagraphElement>(null);


    useEffect(() => {
        let splitParagraph: SplitType | null = null;

        if (textRef.current) {
            splitParagraph = new SplitType(textRef.current, {
                types: "lines,words"
            });
            const words = splitParagraph.words;

            if (words && words.length > 0) {
                gsap.set(words, {
                    yPercent: 105,
                    opacity: 0,
                    rotateX: 50,
                    transformStyle: "preserve-3d",
                });

                IO(textRef.current, { threshold: 0.1 }).then(() => {
                    const elem = Array.from(textRef.current!.querySelectorAll(".word")) as HTMLElement[];
                    if (elem.length > 0) {
                        gsap.to(elem, {
                            opacity: 1,
                            rotateX: 0,
                            yPercent: 0,
                            stagger: elem.length > 100 ? 0.02 : 0.03,
                            duration: elem.length > 100 ? 0.65 : 0.75,
                            ease: "easeOut",
                            delay: 0.5,
                        });
                    }
                });
            }
        }

        return () => {
            if (splitParagraph) {
                splitParagraph.revert();
            }
        };
    }, []);

    return (
        <section
            className="sm:px-[7rem] px-[2.5rem]"
        >
            <MaxContainer
                className="mt-[10rem]"
            >
                <h2
                    className="font-[400] text-center sm:text-start sm:text-[2.6rem] text-[2.4rem] text-white"
                    ref={textRef}
                >
                    Features
                </h2>

                <div
                    className="sm:grid sm:grid-cols-2  mt-[2rem] gap-[2rem] sm:mt-[3rem] sm:gap-[3rem]"
                >
                    <EnterpriseCollaboration />
                    <PeriodicOnchainStatement />
                    <MultiChainSupport />
                </div>
            </MaxContainer>
        </section>
    );
}

const EnterpriseCollaboration = () => {
    return (
        <div
            className="rounded-[2rem] bg-[url(/common/card-bg.png)] bg-no-repeat bg-[length:100%_100%] sm:px-[3rem] px-[1.5rem] py-[2.5rem]"
        >
          {/*   <img
                src="/common/enterprise-collaboration.svg"
                alt="enterprise-collaboration"
                className="sm:size-[38rem] size-[26rem] mx-auto"
            /> */}
            <AnimatedNetworksSVG />
            <FeatureContent
                title="Enterprise Collaboration"
                pargragh="Share wallet analytics and reports across your team.  Collaborate on portfolio tracking, enable multi-user workspaces & maintain unified visibility across organizational wallets."
                classNames="max-w-[35rem] w-full mt-[4rem]"
            />
        </div>
    )
}


const PeriodicOnchainStatement = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const PeriodicStatements = [

        "/common/_altcoin.png",
        "/common/_nft.png",
        "/common/_native.png",
    ]

    const { scrollY, scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scrollVelocity = useVelocity(scrollY);
    const [lastDirection, setLastDirection] = useState<"up" | "down">("up");

    const autoY = useMotionValue(0);

    const scrollY_transform = useTransform(scrollYProgress, [0, 1], [200, -800]);

    const y = useMotionValue(0);

    useEffect(() => {
        const unsubscribe = scrollVelocity.on("change", (latest) => {
            if (Math.abs(latest) > 0) {
                setIsScrolling(true);

                if (latest > 0) {
                    setLastDirection("down");
                } else if (latest < 0) {
                    setLastDirection("up");
                }

                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current);
                }

                scrollTimeout.current = setTimeout(() => {
                    setIsScrolling(false);
                }, 150); 
            }
        });

        return () => {
            unsubscribe();
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [scrollVelocity]);

    useEffect(() => {
        const unsubscribe = scrollY_transform.on("change", (latest) => {
            if (isScrolling) {
                y.set(latest);
                autoY.set(latest); 
            }
        });

        return () => unsubscribe();
    }, [isScrolling, scrollY_transform, y, autoY]);

    useEffect(() => {
        if (!isScrolling) {
            const direction = lastDirection === "down" ? -1 : 1;
            const startValue = autoY.get();
            const distance = 1000; 
            const duration = 20; 

            const animation = animate(autoY, startValue + (direction * distance), {
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                onUpdate: (latest) => {
                    y.set(latest);
                }
            });

            return () => animation.stop();
        }
    }, [isScrolling, lastDirection, autoY, y]);

    return (
        <div
            className="rounded-[2rem] bg-[url(/common/card-bg.png)] mt-[3rem] sm:mt-0 bg-no-repeat sm:px-[3rem] px-[1.5rem] py-[2.5rem]"
        >
            <div
                ref={containerRef}
                className="w-full h-[40rem] overflow-hidden rounded-[1rem] relative"
            >

                <motion.div
                    style={{ y }}
                    className="flex flex-col mt-[-30rem]"
                >
                    {[...Array(8)].map((_, setIndex) => (
                        <div key={setIndex} className="flex flex-col">
                            {PeriodicStatements.map((item, index) => (
                                <div key={`${setIndex}-${index}`} className={`py-[1rem]`}>
                                    <img
                                        src={item}
                                        alt={`statement-${index}`}
                                        className="w-full rounded-[1rem]"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
            <FeatureContent
                title="Periodic Onchain Statement"
                pargragh="Monthly reports summarizing your onchain activity, including DEX/CEX volumes, transaction statistics, chains & protocols interacted with, gas spent, & key portfolio metrics. "
                classNames="max-w-[35rem] mt-[4rem]"
            />
        </div>
    )
}

const MultiChainSupport = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            gsap.set(buttonRef.current, {
                y: 40,
                opacity: 0,
            });

            IO(buttonRef.current, { threshold: 0.3 }).then(() => {
                gsap.to(buttonRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "cubic-bezier(0, 0.55, 0.45, 1)",
                    delay: 0.5,
                });
            });
        }
    }, []);

    return (
        <div
            className="flex sm:flex-row flex-col items-center mt-[3rem] sm:mt-0 col-span-2 bg-[url(/common/last-card-bg.png)] bg-no-repeat bg-[length:100%_100%] rounded-[3rem] justify-between pt-[3rem] sm:pt-0  sm:px-[3rem] px-[1.5rem]"
        >
            <div className="flex flex-col">
                <FeatureContent
                    title="Multi-Chain Support"
                    pargragh="Track and analyze wallet activity across multiple blockchains from a single dashboard. "
                    classNames="max-w-[24rem] text-center sm:text-start"
                />

                <Button
                    ref={buttonRef}
                    asChild
                    className="bg-white w-fit rounded-[3rem] font-[700] mx-auto sm:mx-0 text-[1.2rem] mt-[3rem] uppercase text-[#030712] sm:py-[2.4rem] h-[5rem] py-[2rem] px-[2.2rem]"
                >
                    <Link to="/dashboard">
                        Try Mojuto
                    </Link>
                </Button>
            </div>

            <img
                src="/common/multi-chain-support.svg"
                alt="multi-chain-support"
                className="sm:w-[64rem]"
            />
        </div>
    )
}

const FeatureContent = ({ title, pargragh, classNames = "" }: Feature) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        let titleSplit: SplitType | null = null;
        let paragraphSplit: SplitType | null = null;

        if (titleRef.current) {
            titleSplit = new SplitType(titleRef.current, {
                types: "lines,words",
            });
            const words = titleSplit.words;

            if (words && words.length > 0) {
                gsap.set(words, {
                    yPercent: 105,
                    opacity: 0,
                    rotateX: 50,
                    transformStyle: "preserve-3d",
                });

                IO(titleRef.current, { threshold: 0.1 }).then(() => {
                    const elem = Array.from(
                        titleRef.current!.querySelectorAll(".word")
                    ) as HTMLElement[];
                    if (elem.length > 0) {
                        gsap.to(elem, {
                            opacity: 1,
                            rotateX: 0,
                            yPercent: 0,
                            stagger: elem.length > 100 ? 0.02 : 0.03,
                            duration: elem.length > 100 ? 0.65 : 0.75,
                            ease: "easeOut",
                            delay: 0.5,
                        });
                    }
                });
            }
        }

        if (paragraphRef.current) {
            paragraphSplit = new SplitType(paragraphRef.current, {
                types: "lines,words",
            });
            const words = paragraphSplit.words;

            if (words && words.length > 0) {
                gsap.set(words, {
                    yPercent: 105,
                    opacity: 0,
                    rotateX: 50,
                    transformStyle: "preserve-3d",
                });

                IO(paragraphRef.current, { threshold: 0.1 }).then(() => {
                    const elem = Array.from(
                        paragraphRef.current!.querySelectorAll(".word")
                    ) as HTMLElement[];
                    if (elem.length > 0) {
                        gsap.to(elem, {
                            opacity: 1,
                            rotateX: 0,
                            yPercent: 0,
                            stagger: elem.length > 100 ? 0.02 : 0.03,
                            duration: elem.length > 100 ? 0.65 : 0.75,
                            ease: "easeOut",
                            delay: 0.5,
                        });
                    }
                });
            }
        }

        return () => {
            if (titleSplit) {
                titleSplit.revert();
            }
            if (paragraphSplit) {
                paragraphSplit.revert();
            }
        };
    }, []);

    return (
        <div className={classNames}>
            <h3
                ref={titleRef}
                className="text-[#FFFFFF] sm:text-[2rem] text-[1.8rem] font-[400]"
            >
                {title}
            </h3>
            <p
                ref={paragraphRef}
                className="text-[#7C8E97] w-full sm:text-[1.4rem] text-[1.2rem] mt-[.4rem] font-[400]"
            >
                {pargragh}
            </p>
        </div>
    );
}

export default Features;