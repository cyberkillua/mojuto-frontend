import MaxContainer from "../common/maxcontainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { IO } from "@/animations/observe";

const CTA = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Animate image
        if (imageRef.current) {
            gsap.set(imageRef.current, {
                y: 60,
                opacity: 0,
            });

            IO(imageRef.current, { threshold: 0.3 }).then(() => {
                gsap.to(imageRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "cubic-bezier(0, 0.55, 0.45, 1)",
                });
            });
        }

        // Animate button
        if (buttonRef.current) {
            gsap.set(buttonRef.current, {
                y: 60,
                opacity: 0,
            });

            IO(buttonRef.current, { threshold: 0.3 }).then(() => {
                gsap.to(buttonRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "cubic-bezier(0, 0.55, 0.45, 1)",
                    delay: 0.2,
                });
            });
        }
    }, []);

    return (
        <section className="sm:px-[7rem] sm:mt-[10rem] mt-[6rem] px-[2rem]">
            <MaxContainer className="flex sm:py-[10rem] py-[6.7rem] relative rounded-[3rem] overflow-hidden flex-col">
                {/* Background Image */}
                <img
                    src="/common/cta_bg.png"
                    alt="CTA background"
                    className="absolute inset-0 w-full h-full object-cover rounded-[3rem] z-0"
                />
                
                {/* Content - positioned above background */}
                <div className="relative z-10 flex flex-col">
                    <img
                        ref={imageRef}
                        src="/common/igo.svg"
                        alt="binoculars"
                        loading="lazy"
                        decoding="async"
                        className="sm:w-[30rem] w-[20rem] mx-auto"
                    />
                    <p data-animation="paragraph" className="text-center mx-auto mt-[4rem] text-[2.2rem] sm:text-[4.4rem] text-white sm:w-[50rem] w-[26rem]">
                        Ready to analyze your wallets for insights?
                    </p>
                    <Button
                        ref={buttonRef}
                        className="px-[3rem] hover:bg-transparent hover:border-[1.5px] hover:border-[#7EF9FF] hover:text-[#7EF9FF] mt-[3.5rem] mx-auto py-[2rem] sm:py-[2.8rem] text-[#030712] text-[1.2rem] sm:text-[1.5rem] font-[600] bg-white rounded-[3rem]"
                    >
                        <Link to="/dashboard">
                            START NOW!
                        </Link>
                    </Button>
                </div>
            </MaxContainer>
        </section>
    );
}

export default CTA;