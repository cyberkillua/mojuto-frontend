// src/animations/text.ts
import SplitType from "split-type";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { IO } from "./observe";

gsap.registerPlugin(ScrollTrigger);

export const split = () => {
    const textStagger = document.querySelectorAll("[data-animation-id = 'text-fade-up']");
    const p = document.querySelectorAll("[data-animation = 'paragraph']");
    const H = document.querySelectorAll("[data-animation ='header']");

    textStagger.forEach((item) => {
        const text = new SplitType(item as HTMLElement).lines;
        if (text) {
            text.forEach((line) => { // Renamed 'word' to 'line' for clarity
                const chars = Array.from(line.querySelectorAll(".char")) as HTMLElement[];
                if (chars.length > 0) {
                    gsap.to(chars, {
                        y: "-30",
                        delay: 1,
                        opacity: "0",
                        duration: 0.5,
                        ease: "ease-in",
                        stagger: {
                            each: 0.05,
                        },
                        scrollTrigger: {
                            scrub: true,
                        },
                    });
                }
            });
        }
    });

    p.forEach((item) => {
        const splitParagraph = new SplitType(item as HTMLElement, { types: "lines,words", });
        const words = splitParagraph.words;

        if (words && words.length > 0) {
            gsap.set(words, { // Removed incorrect cast
                yPercent: 105,
                opacity: 0,
                rotateX: 50,
                transformStyle: "preserve-3d",
            });
        }

        IO(item as HTMLElement, { threshold: 0.9 }).then(() => {
            const elem = Array.from(item.querySelectorAll(".word")) as HTMLElement[];
            if (elem.length > 0) {
                gsap.to(elem, {
                    yPercent: 0,
                    opacity: 1,
                    rotateX: 0,
                    stagger: elem.length > 100 ? 0.02 : 0.03,
                    duration: elem.length > 100 ? 0.65 : 0.75,
                    ease: "easeOut",
                });
            }
        });
    });

    H.forEach((item) => {
        // Split text into lines
        const splitHeader = new SplitType(item as HTMLElement, { types: "lines" });
        const lines = splitHeader.lines;

        if (lines) {
            // Set initial state for each line: moved down and transparent
            gsap.set(lines, {
                opacity: 0,
                yPercent: 100, // Move lines down by 100% of their height
                transformStyle: "preserve-3d", // Ensure 3D transforms work
            });

            // Animate lines into view with stagger
            IO(item as HTMLElement, { // Observe the parent element to trigger animation for all lines
                threshold: 0.5, // Trigger when 50% of the parent is visible
            }).then(() => {
                gsap.to(lines, {
                    opacity: 1,
                    yPercent: 0, // Animate lines back to their original Y position
                    stagger: lines.length > 1 ? 0.2 : 0, // Stagger effect for lines (more obvious for multiple lines)
                    duration: 0.8, // Duration for each line's animation
                    ease: "easeOut",
                });
            });
        }
    });
};