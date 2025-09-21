import { useState, useEffect, useRef } from 'react';

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

const AnimatedCrystalSVG = ({
    className
}: {
    className?: string;
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const svgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        if (svgRef.current) {
            observer.observe(svgRef.current);
        }

        return () => {
            if (svgRef.current) {
                observer.unobserve(svgRef.current);
            }
        };
    }, []);

    return (
        <div ref={svgRef}>
            <svg
                width={280}
                height={348}
                viewBox="0 0 280 348"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("", className)}
            >
                <foreignObject x={25.2783} y={17.875} width={234.517} height={339.128}>
                    <div
                        style={{
                            backdropFilter: "blur(5px)",
                            clipPath: "url(#bgblur_0_1397_34189_clip_path)",
                            height: "100%",
                            width: "100%",
                            transition: "all 1s ease-out",
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "scale(1)" : "scale(0.95)",
                        }}
                    />
                </foreignObject>

                <path
                    data-figma-bg-blur-radius={10}
                    d="M249.342 27.875L249.796 217.039C249.828 228.555 241.724 242.592 231.702 248.378L52.3379 344.511C42.304 350.304 35.311 345.649 35.2783 334.133V154.346L142.971 90.6115C184.745 66.4931 207.568 51.9934 249.342 27.875Z"
                    fill="url(#paint0_linear_1397_34189)"
                    fillOpacity={0.2}
                    className={`transition-all duration-1200 ease-out ${
                        isVisible
                            ? 'opacity-100 transform scale-100'
                            : 'opacity-0 transform scale-75'
                    }`}
                    style={{
                        transformOrigin: '142px 186px',
                        transitionDelay: isVisible ? '0.2s' : '0s'
                    }}
                />

                <g
                    filter="url(#filter1_f_1397_34189)"
                    className={`transition-all duration-1000 ease-out ${
                        isVisible
                            ? 'opacity-100 transform scale-100'
                            : 'opacity-0 transform scale-50'
                    }`}
                    style={{
                        transformOrigin: '140px 203px',
                        transitionDelay: isVisible ? '0.4s' : '0s'
                    }}
                >
                    <path
                        d="M45.1838 280.354C74.9801 195.674 40.2425 204.574 50.7716 178.742C61.3007 152.911 175.246 85.2085 230.352 127.501C255.206 143.245 181.412 201.95 160.828 252.452C150.298 278.284 114.751 313.259 45.1838 280.354Z"
                        fill="#3AEFFF"
                        className={isVisible ? 'animate-pulse' : ''}
                        style={{ animationDuration: '3s' }}
                    />
                </g>

                <g
                    filter="url(#filter2_f_1397_34189)"
                    className={`transition-all duration-1000 ease-out ${
                        isVisible
                            ? 'opacity-100 transform scale-100'
                            : 'opacity-0 transform scale-50'
                    }`}
                    style={{
                        transformOrigin: '185px 157px',
                        transitionDelay: isVisible ? '0.6s' : '0s'
                    }}
                >
                    <path
                        d="M145.5 226.309C125.056 173.571 185.654 195.32 191.522 180.922C197.391 166.524 207.606 64.5045 230.063 78.7297C214.207 202.322 232.692 189.114 221.219 217.262C215.35 231.659 186.168 250.645 145.5 226.309Z"
                        fill="#B8FF71"
                        className={isVisible ? 'animate-pulse' : ''}
                        style={{ animationDuration: '3s', animationDelay: '0.5s' }}
                    />
                </g>

                <g
                    className={`transition-all duration-800 ease-out ${
                        isVisible
                            ? 'opacity-100 transform translate-y-0'
                            : 'opacity-0 transform translate-y-8'
                    }`}
                    style={{ transitionDelay: isVisible ? '0.8s' : '0s' }}
                >
                    <path
                        d="M38.3576 344.665L21.3423 328.268C19.3184 326.374 18.9233 322.508 18.9132 316.785L35.458 332.819C35.4681 338.542 36.3337 342.771 38.3576 344.665Z"
                        fill="#00EAFF"
                        fillOpacity={0.2}
                    />
                    <path
                        d="M35.4956 332.835L18.8906 316.616L20.144 138.854L35.4956 154.799V332.835Z"
                        fill="#00EAFF"
                        fillOpacity={0.2}
                    />
                </g>

                <foreignObject x={7.34355} y={-12.1701} width={249.5} height={179.659}>
                    <div
                        style={{
                            backdropFilter: "blur(6.4px)",
                            clipPath: "url(#bgblur_1_1397_34189_clip_path)",
                            height: "100%",
                            width: "100%",
                            transition: "all 1s ease-out",
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(-20px)",
                            transitionDelay: isVisible ? '0.3s' : '0s'
                        }}
                    />
                </foreignObject>

                <g
                    data-figma-bg-blur-radius={12.8}
                    className={`transition-all duration-1000 ease-out ${
                        isVisible
                            ? 'opacity-100 transform scale-100'
                            : 'opacity-0 transform scale-75'
                    }`}
                    style={{
                        transformOrigin: '140px 80px',
                        transitionDelay: isVisible ? '0.5s' : '0s'
                    }}
                >
                    <path
                        d="M223.496 1.85563L244.044 12.1928C240.743 10.2744 236.172 10.5437 231.128 13.4554L210.581 3.11825C215.624 0.206578 220.195 -0.0627664 223.496 1.85563Z"
                        fill="#00EAFF"
                        fillOpacity={0.14}
                    />
                    <path
                        d="M35.4065 154.689L20.1437 138.839L20.1436 131.506L35.4064 147.355L35.4065 154.689Z"
                        fill="#00EAFF"
                        fillOpacity={0.14}
                    />
                    <path
                        d="M53.5067 116.019L38.2438 100.169L210.594 3.12429L231.141 13.4614L53.5067 116.019Z"
                        fill="#00EAFF"
                        fillOpacity={0.14}
                    />
                    <path
                        d="M35.4065 147.358L20.1437 131.509C20.111 119.993 28.2032 105.963 38.2371 100.17L53.5 116.019C43.466 121.812 35.3739 135.843 35.4065 147.358Z"
                        fill="#00EAFF"
                        fillOpacity={0.14}
                    />
                </g>

                <foreignObject x={30.4014} y={5.96094} width={223.939} height={153.739}>
                    <div
                        style={{
                            backdropFilter: "blur(2.5px)",
                            clipPath: "url(#bgblur_2_1397_34189_clip_path)",
                            height: "100%",
                            width: "100%",
                            transition: "all 1.2s ease-out",
                            opacity: isVisible ? 1 : 0,
                            transitionDelay: isVisible ? '0.7s' : '0s'
                        }}
                    />
                </foreignObject>

                <path
                    data-figma-bg-blur-radius={5}
                    d="M231.129 13.4493C241.151 7.66315 249.308 12.3117 249.341 23.8276V27.8633L35.4015 154.7V147.346C35.3688 135.83 43.461 121.8 53.4949 116.006L231.129 13.4493Z"
                    fill="#00EAFF"
                    fillOpacity={0.15}
                    className={`transition-all duration-1000 ease-out ${
                        isVisible
                            ? 'opacity-100 transform scale-100'
                            : 'opacity-0 transform scale-95'
                    }`}
                    style={{
                        transformOrigin: '142px 84px',
                        transitionDelay: isVisible ? '0.9s' : '0s'
                    }}
                />

                <defs>
                    <clipPath
                        id="bgblur_0_1397_34189_clip_path"
                        transform="translate(-25.2783 -17.875)"
                    >
                        <path d="M249.342 27.875L249.796 217.039C249.828 228.555 241.724 242.592 231.702 248.378L52.3379 344.511C42.304 350.304 35.311 345.649 35.2783 334.133V154.346L142.971 90.6115C184.745 66.4931 207.568 51.9934 249.342 27.875Z" />
                    </clipPath>
                    <filter
                        id="filter1_f_1397_34189"
                        x={0.583717}
                        y={69.3268}
                        width={279.424}
                        height={269.007}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feGaussianBlur
                            stdDeviation={22.3}
                            result="effect1_foregroundBlur_1397_34189"
                        />
                    </filter>
                    <filter
                        id="filter2_f_1397_34189"
                        x={96.7038}
                        y={32.7733}
                        width={177.959}
                        height={249.822}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feGaussianBlur
                            stdDeviation={22.3}
                            result="effect1_foregroundBlur_1397_34189"
                        />
                    </filter>
                    <clipPath
                        id="bgblur_1_1397_34189_clip_path"
                        transform="translate(-7.34355 12.1701)"
                    >
                        <path d="M223.496 1.85563L244.044 12.1928C240.743 10.2744 236.172 10.5437 231.128 13.4554L210.581 3.11825C215.624 0.206578 220.195 -0.0627664 223.496 1.85563Z" />
                        <path d="M35.4065 154.689L20.1437 138.839L20.1436 131.506L35.4064 147.355L35.4065 154.689Z" />
                        <path d="M53.5067 116.019L38.2438 100.169L210.594 3.12429L231.141 13.4614L53.5067 116.019Z" />
                        <path d="M35.4065 147.358L20.1437 131.509C20.111 119.993 28.2032 105.963 38.2371 100.17L53.5 116.019C43.466 121.812 35.3739 135.843 35.4065 147.358Z" />
                    </clipPath>
                    <clipPath
                        id="bgblur_2_1397_34189_clip_path"
                        transform="translate(-30.4014 -5.96094)"
                    >
                        <path d="M231.129 13.4493C241.151 7.66315 249.308 12.3117 249.341 23.8276V27.8633L35.4015 154.7V147.346C35.3688 135.83 43.461 121.8 53.4949 116.006L231.129 13.4493Z" />
                    </clipPath>
                    <linearGradient
                        id="paint0_linear_1397_34189"
                        x1={193.254}
                        y1={69.7118}
                        x2={141.961}
                        y2={347.004}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#3DEFFF" />
                        <stop offset={1} stopColor="#3DEFFF" stopOpacity={0.5} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default AnimatedCrystalSVG;