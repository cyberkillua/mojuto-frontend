import MaxContainer from "../common/maxcontainer";
import {
    useLayoutEffect,
    useRef,
    useState,
    useEffect
} from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import gsap from "gsap";
import { IO } from "@/animations/observe";

const Offer = () => {
    const items = [
        {
            title: "Risk Distribution",
            img: "/common/risk-distribution.png",
            offers: [
                "Asset allocation percentages by token type",
                "Chain exposure and diversification metrics",
                "Concentration risk warnings for large positions",
                "Volatility indicators for each holding",
            ]
        },
        {
            title: "Total Portfolio Value",
            img: "/common/total-portfolio-value.png",
            offers: [
                "Real-time aggregated balance across all chains.",
                "Historical portfolio performance tracking and charts",
                "Token-level breakdown with current prices",
                "Fiat conversion with multiple currency options"
            ]
        },
        {
            title: "Bulk Analysis",
            img: "/common/bulk-analysis.png",
            offers: [
                "Batch import via CSV or wallet list",
                "Parallel processing for fast multi-wallet scanning",
                "Aggregate insights across entire wallet portfolio",
                "Compare performance metrics between different wallet"
            ]
        },
        {
            title: "Professional Export",
            img: "/common/professional-export.png",
            offers: [
                "CSV, JSON, and Excel export formats",
                "Tax-ready transaction reports with cost basis",
                "Custom date ranges and filtered exports",
                "Scheduled automated reports via email"
            ]
        },

    ]
    const [activeTab, setActiveTab] = useState(items[0].title);
    const tabsListRef = useRef<HTMLDivElement | null>(null);
    const contentContainerRef = useRef<HTMLDivElement | null>(null);
    const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [indicatorStyle, setIndicatorStyle] = useState<{
        width: number;
        translateX: number;
    } | null>(null);

    useEffect(() => {
        // Animate tablist only (not the heading)
        if (tabsListRef.current) {
            gsap.set(tabsListRef.current, {
                y: 60,
                opacity: 0,
            });

            IO(tabsListRef.current, { threshold: 0.3 }).then(() => {
                gsap.to(tabsListRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                });
            });
        }

        // Animate content container
        if (contentContainerRef.current) {
            gsap.set(contentContainerRef.current, {
                y: 60,
                opacity: 0,
            });

            IO(contentContainerRef.current, { threshold: 0.2 }).then(() => {
                gsap.to(contentContainerRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.3,
                });
            });
        }
    }, []);

    useLayoutEffect(() => {
        const activeEl = triggerRefs.current[activeTab];
        const listEl = tabsListRef.current;

        if (!activeEl || !listEl) {
            return;
        }

        const listRect = listEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();

        setIndicatorStyle({
            width: activeRect.width,
            translateX: activeRect.left - listRect.left,
        });
    }, [activeTab]);

    return (
        <section
            className="sm:px-[7rem] sm:mt-[15rem] mt-[6rem] px-[2rem]"
        >
            <MaxContainer>
                <Tabs
                    className=""
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <div className="relative">
                        <div className="sm:flex sm:flex-row flex-col justify-between">
                            {/* Heading - No animation */}
                            <h1
                                className="sm:text-[3rem] text-[2.3rem] text-center sm:text-start text-white"
                                data-animation="paragraph"
                            >
                                What We Offer
                            </h1>

                            {/* TabsList - Animated */}
                            <TabsList
                                ref={tabsListRef}
                                className="relative px-[1rem] w-full mt-[1rem] sm:mt-0 overflow-scroll sm:w-[67rem] sm:py-[1.5rem] rounded-[4rem] !h-fit bg-[#172228] py-[1rem]"
                            >
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none sm:h-[4.1rem] h-[3.5rem] absolute sm:top-[12px] top-[8px] bottom-[6px] left-0 rounded-[3rem] border border-[#253A46] bg-[#1D2A31] transition-[transform,width] duration-300 ease-out"
                                    style={
                                        indicatorStyle
                                            ? {
                                                width: indicatorStyle.width,
                                                transform: `translateX(${indicatorStyle.translateX}px)`,
                                            }
                                            : { opacity: 0 }
                                    }
                                />
                                {
                                    items.map((item, index) => {
                                        return (
                                            <TabsTrigger
                                                key={index}
                                                ref={(el) => { triggerRefs.current[item.title] = el; }}
                                                className="relative z-10 text-[#7FA1B4] data-[state=active]:bg-transparent rounded-[3rem] cursor-pointer data-[state=active]:bg-[linear-gradient(89.37deg,#9EF0FF_-4.84%,#BAFFA2_51.89%,#ADFF9C_93.76%),linear-gradient(0deg,rgba(255,255,255,0.15),rgba(255,255,255,0.15))] data-[state=active]:bg-clip-text data-[state=active]:text-transparent sm:p-[1rem] sm:text-[1.3rem] data-[isFirst=true]:ml-[8rem] sm:data-[isFirst=true]:ml-0 sm:data-[isFirst=true]:mt-0  text-[1rem] p-[.8rem]"
                                                value={item.title}
                                                data-isFirst={index === 0}
                                            >
                                                {item.title}
                                            </TabsTrigger>
                                        )
                                    })
                                }
                            </TabsList>
                        </div>

                        {/* Content Container - Animated */}
                        <div ref={contentContainerRef}>
                            {
                                items.map((item, index) => {
                                    return (
                                        <TabsContent
                                            key={index}
                                            value={item.title}
                                            className="sm:mt-[4rem] data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-500"
                                        >
                                            <div className="mt-[2rem] items-center flex flex-col sm:flex-row justify-between">
                                                <div className="w-full sm:w-fit">
                                                    {
                                                        item.offers.map((offer, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="flex border-b-[0.25px_solid] border-b [border-image:linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(0,234,255,0.6)_50.48%,rgba(255,255,255,0.12)_100%)_1]  sm:w-[40rem] w-full flex-col sm:py-[3rem] py-[2rem]"
                                                                >
                                                                    <p className="text-[#7C8E97] text-[1.2rem] sm:text-[1.5rem]">{offer}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="mt-[2.5rem] sm:mt-0 sm:w-[67rem] w-full h-auto sm:rounded-[5rem] rounded-[3rem]"
                                                />
                                            </div>
                                        </TabsContent>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Tabs>

            </MaxContainer>

        </section>
    );
}

export default Offer;