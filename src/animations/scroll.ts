import Lenis from 'lenis';

export default function scroll() {
    const lenis = new Lenis({
        duration: 2,
        easing: (t: number) => 1 - Math.pow(1 - t, 5),
        infinite: false,
        smooth: true,
    });

    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}


export const resetScroll = () => {
    const lenis = new Lenis({
        duration: 2,
        easing: (t: number) => 1 - Math.pow(1 - t, 5),
        infinite: false,
        smooth: true,
    });
    lenis.scrollTo(0, { immediate: true });
};
