const Dia = ({ className }: { className?: string }) => {
    return (
        <svg
            width={228}
            height={299}
            className={className}
            viewBox="0 0 228 299"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_f_1651_22849)">
                <path
                    d="M113.885 254.126C59.1871 224.394 73.8376 165.088 64.2652 147.108C54.6928 129.128 78.9463 78.9847 101.632 72.4105C124.317 65.8362 145.006 74.7768 163.72 109.929C173.292 127.909 153.748 240.939 113.885 254.126Z"
                    fill="#3AEFFF"
                />
            </g>
            <foreignObject x={-40} y={75.7529} width={307.733} height={170.92}>
                <div
                    style={{
                        backdropFilter: "blur(20px)",
                        clipPath: "url(#bgblur_0_1651_22849_clip_path)",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </foreignObject>
            <path
                data-figma-bg-blur-radius={40}
                d="M0 160.412L112.645 115.753L227.734 160.412L112.645 206.673L0 160.412Z"
                fill="#004B52"
                fillOpacity={0.05}
            />
            <foreignObject x={72.6445} y={-40} width={195.089} height={275.057}>
                <div
                    style={{
                        backdropFilter: "blur(20px)",
                        clipPath: "url(#bgblur_1_1651_22849_clip_path)",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </foreignObject>
            <path
                data-figma-bg-blur-radius={40}
                d="M112.645 0V195.057L227.733 146.193L112.645 0Z"
                fill="#7EF4FF"
                fillOpacity={0.1}
            />
            <foreignObject x={-12.9} y={-12.9} width={138.446} height={220.857}>
                <div
                    style={{
                        backdropFilter: "blur(6.45px)",
                        clipPath: "url(#bgblur_2_1651_22849_clip_path)",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </foreignObject>
            <path
                data-figma-bg-blur-radius={12.9}
                d="M0 147.594L112.645 195.057V0L0 147.594Z"
                fill="#7EF4FF"
                fillOpacity={0.1}
            />
            <foreignObject x={-15} y={145.409} width={142.646} height={162.575}>
                <div
                    style={{
                        backdropFilter: "blur(7.5px)",
                        clipPath: "url(#bgblur_3_1651_22849_clip_path)",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </foreignObject>
            <path
                data-figma-bg-blur-radius={15}
                d="M0 160.409L112.645 206.67V292.984L0 160.409Z"
                fill="#7EF4FF"
                fillOpacity={0.1}
            />
            <foreignObject x={72.6445} y={120.409} width={195.089} height={212.575}>
                <div
                    style={{
                        backdropFilter: "blur(20px)",
                        clipPath: "url(#bgblur_4_1651_22849_clip_path)",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </foreignObject>
            <path
                data-figma-bg-blur-radius={40}
                d="M112.645 206.67L227.733 160.409L112.645 292.984V206.67Z"
                fill="#7EF4FF"
                fillOpacity={0.1}
            />
            <defs>
                <filter
                    id="filter0_f_1651_22849"
                    x={17.5201}
                    y={25.8131}
                    width={193.201}
                    height={272.913}
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
                        result="effect1_foregroundBlur_1651_22849"
                    />
                </filter>
                <clipPath
                    id="bgblur_0_1651_22849_clip_path"
                    transform="translate(40 -75.7529)"
                >
                    <path d="M0 160.412L112.645 115.753L227.734 160.412L112.645 206.673L0 160.412Z" />
                </clipPath>
                <clipPath
                    id="bgblur_1_1651_22849_clip_path"
                    transform="translate(-72.6445 40)"
                >
                    <path d="M112.645 0V195.057L227.733 146.193L112.645 0Z" />
                </clipPath>
                <clipPath
                    id="bgblur_2_1651_22849_clip_path"
                    transform="translate(12.9 12.9)"
                >
                    <path d="M0 147.594L112.645 195.057V0L0 147.594Z" />
                </clipPath>
                <clipPath
                    id="bgblur_3_1651_22849_clip_path"
                    transform="translate(15 -145.409)"
                >
                    <path d="M0 160.409L112.645 206.67V292.984L0 160.409Z" />
                </clipPath>
                <clipPath
                    id="bgblur_4_1651_22849_clip_path"
                    transform="translate(-72.6445 -120.409)"
                >
                    <path d="M112.645 206.67L227.733 160.409L112.645 292.984V206.67Z" />
                </clipPath>
            </defs>
        </svg>
    );
}
export default Dia;
