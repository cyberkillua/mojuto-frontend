import MaxContainer from "../common/maxcontainer";
import Tumb from "../icons/tumb"
import Dia from "../icons/dia"
import Folder from "@/components/shared/icons/folder";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { IO } from "@/animations/observe";

interface UseCaseItem {
    icons: React.ReactElement;
    description: string;
}

const UseCase = () => {
    const useCases: UseCaseItem[] = [
        {
            icons: <Tumb
                className="sm:mb-[3rem] mx-auto sm:mx-0 w-[50%] sm:w-[28rem] h-fit"
            />,
            description: "Complete Financial Analytics",
        },
        {
            icons: <Dia
                className="sm:w-[22.7rem] mx-auto sm:mx-0 w-[50%] h-fit sm:mt-[11.2rem] sm:h-[29.2rem] sm:mb-[3rem]"
            />,
            description: "Bulk Multi-Chain Analysis",
        },
        {
            icons: <Folder
                className="sm:w-[26rem] mx-auto sm:mx-0 w-[50%] h-fit sm:mb-[3rem]"
            />,
            description: "Professional Portfolio Reports",
        },
    ]

    return (
        <div className="sm:px-[7rem] sm:pt-[7rem] px-[2rem]">
            <MaxContainer className="flex flex-col justify-between sm:flex-row gap-[5rem] sm:gap-0">
                {
                    useCases.map((item, index) => {
                        return (
                            <UseCaseItem
                                key={index}
                                item={item}
                                index={index}
                            />
                        )
                    })
                }
            </MaxContainer>
        </div>
    );
}

const UseCaseItem = ({ item, index }: { item: UseCaseItem; index: number }) => {
    const iconRef = useRef(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(iconRef, {
        once: true,
        amount: 0.6
    });

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

                IO(textRef.current, { threshold: 0.6 }).then(() => {
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
        <div className="">
            <motion.div
                ref={iconRef}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: [0.25, 0.1, 0.25, 1]
                }}
            >
                {item.icons}
            </motion.div>
            <p
                ref={textRef}
                className="font-[400] sm:text-[2rem] mt-[2.5rem] sm:mt-0 text-[1.6rem] text-white text-center mx-auto max-w-[18rem] sm:max-w-[22rem]"
            >
                {item.description}
            </p>
        </div>
    );
}

export default UseCase;