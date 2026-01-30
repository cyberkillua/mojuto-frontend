import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Actions = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [1.3, 1]);

    return (
        <section className="sm:mt-[13rem] px-[2rem] mt-[6rem]">
            <h2
                data-animation="paragraph"
                className="text-center text-[#FFFFFF] sm:text-[3rem] text-[2rem]">
                Mojuto In Action
            </h2>
            <div
                ref={containerRef}
                className="flex flex-col sm:mt-[3rem] mt-[2rem]"
            >
                <div className="mx-auto w-full  flex justify-center">
                    <motion.img
                        ref={imageRef}
                        src="/common/_dash.png"
                        alt="dashboard"
                        loading="lazy"
                        decoding="async"
                        className="max-w-[94rem] w-full"
                        style={{
                            scale,
                            transformOrigin: "top center",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default Actions;

