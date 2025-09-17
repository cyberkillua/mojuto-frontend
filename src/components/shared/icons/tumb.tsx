import { motion } from 'framer-motion';

const AnimatedCircleFlare = ({ className }: {
    className?: string
}) => {
    return (
        <svg
            width={353}
            height={350}
            viewBox="0 0 353 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                {/* Seamless animated mesh gradients - no gaps */}
                <radialGradient id="meshGradient1" cx="50%" cy="50%" r="100%">
                    <motion.stop
                        offset="0%"
                        animate={{
                            stopColor: ["#7EF4FF", "#B8FF71", "#3AEFFF", "#7EF4FF"],
                            stopOpacity: [0.9, 0.8, 1, 0.9],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.stop
                        offset="30%"
                        animate={{
                            stopColor: ["#B8FF71", "#3AEFFF", "#7EF4FF", "#B8FF71"],
                            stopOpacity: [0.7, 0.9, 0.6, 0.7],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                    <motion.stop
                        offset="60%"
                        animate={{
                            stopColor: ["#3AEFFF", "#7EF4FF", "#B8FF71", "#3AEFFF"],
                            stopOpacity: [0.4, 0.5, 0.3, 0.4],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                    />
                    <motion.stop
                        offset="90%"
                        animate={{
                            stopColor: ["#7EF4FF", "#B8FF71", "#3AEFFF", "#7EF4FF"],
                            stopOpacity: [0.2, 0.3, 0.1, 0.2],
                        }}
                        transition={{
                            duration: 3.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                    />
                    <motion.stop
                        offset="100%"
                        animate={{
                            stopColor: ["#3AEFFF", "#7EF4FF", "#B8FF71", "#3AEFFF"],
                            stopOpacity: [0.05, 0.08, 0.03, 0.05]
                        }}
                        transition={{
                            duration: 4.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5,
                        }}
                    />
                </radialGradient>

                <radialGradient id="meshGradient2" cx="30%" cy="70%" r="100%">
                    <motion.stop
                        offset="0%"
                        animate={{
                            stopColor: ["#3AEFFF", "#7EF4FF", "#B8FF71", "#3AEFFF"],
                            stopOpacity: [0.8, 0.7, 0.9, 0.8],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                    />
                    <motion.stop
                        offset="35%"
                        animate={{
                            stopColor: ["#B8FF71", "#7EF4FF", "#3AEFFF", "#B8FF71"],
                            stopOpacity: [0.6, 0.8, 0.5, 0.6],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5,
                        }}
                    />
                    <motion.stop
                        offset="65%"
                        animate={{
                            stopColor: ["#7EF4FF", "#3AEFFF", "#B8FF71", "#7EF4FF"],
                            stopOpacity: [0.3, 0.4, 0.2, 0.3],
                        }}
                        transition={{
                            duration: 5.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2.2,
                        }}
                    />
                    <motion.stop
                        offset="85%"
                        animate={{
                            stopColor: ["#B8FF71", "#3AEFFF", "#7EF4FF", "#B8FF71"],
                            stopOpacity: [0.15, 0.2, 0.1, 0.15],
                        }}
                        transition={{
                            duration: 3.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.8,
                        }}
                    />
                    <motion.stop
                        offset="100%"
                        animate={{
                            stopColor: ["#7EF4FF", "#B8FF71", "#3AEFFF", "#7EF4FF"],
                            stopOpacity: [0.04, 0.07, 0.02, 0.04]
                        }}
                        transition={{
                            duration: 4.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.8,
                        }}
                    />
                </radialGradient>

                {/* Enhanced mesh blur filter */}
                <filter id="meshBlur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Original clip paths */}
                <clipPath
                    id="bgblur_0_1397_32011_clip_path"
                    transform="translate(-12.2528 -11.4872)"
                >
                    <path d="M256.78 80.7792C239.04 65.8351 217.443 56.1384 194.441 52.7903C171.439 49.4422 147.955 52.5769 126.654 61.8383C105.353 71.0998 87.0901 86.1169 73.9385 105.184C60.787 124.252 53.274 146.605 52.2528 169.707L116.049 172.497C116.546 161.263 120.199 150.392 126.595 141.12C132.99 131.847 141.872 124.545 152.23 120.041C162.589 115.537 174.009 114.012 185.195 115.641C196.381 117.269 206.883 121.984 215.51 129.252L256.78 80.7792Z" />
                </clipPath>
                <clipPath
                    id="bgblur_1_1397_32011_clip_path"
                    transform="translate(-172.777 -40.814)"
                >
                    <path d="M251.157 273.965C266.07 262.81 278.268 248.458 286.844 231.975C295.421 215.491 300.157 197.298 300.701 178.745C301.245 160.193 297.584 141.756 289.988 124.803C282.392 107.85 271.057 92.8151 256.822 80.814L215.532 129.269C222.454 135.105 227.967 142.416 231.661 150.661C235.354 158.905 237.135 167.871 236.87 176.893C236.606 185.915 234.303 194.762 230.132 202.778C225.961 210.794 220.03 217.773 212.777 223.198L251.157 273.965Z" />
                </clipPath>
                <clipPath
                    id="bgblur_2_1397_32011_clip_path"
                    transform="translate(-18.1903 -135.759)"
                >
                    <path d="M52.3076 169.759C51.2857 193.148 56.9598 216.345 68.6702 236.652C80.3805 256.959 97.6458 273.542 118.458 284.473C139.271 295.404 162.775 300.233 186.238 298.399C209.701 296.565 232.159 288.143 251 274.113L212.729 223.264C203.567 230.087 192.646 234.183 181.236 235.075C169.825 235.967 158.395 233.618 148.274 228.302C138.153 222.987 129.757 214.922 124.062 205.047C118.368 195.172 115.608 183.891 116.105 172.517L52.3076 169.759Z" />
                </clipPath>
                <filter
                    id="filter3_f_1397_32011"
                    x={213.524}
                    y={85.2848}
                    width={102.638}
                    height={196.715}
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
                        stdDeviation={15}
                        result="effect1_foregroundBlur_1397_32011"
                    />
                </filter>
                <filter
                    id="filter4_f_1397_32011"
                    x={42.6696}
                    y={37.2313}
                    width={214.44}
                    height={148.63}
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
                        stdDeviation={15}
                        result="effect1_foregroundBlur_1397_32011"
                    />
                </filter>
            </defs>

            {/* Fixed foreignObject elements */}
            <foreignObject x={12.2528} y={11.4872} width={284.527} height={201.01}>
                <div
                    style={{
                        backdropFilter: "blur(20px)",
                        clipPath: "url(#bgblur_0_1397_32011_clip_path)",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </foreignObject>

            {/* Main paths with seamless gradient animation */}
            <motion.path
                d="M256.78 80.7792C239.04 65.8351 217.443 56.1384 194.441 52.7903C171.439 49.4422 147.955 52.5769 126.654 61.8383C105.353 71.0998 87.0901 86.1169 73.9385 105.184C60.787 124.252 53.274 146.605 52.2528 169.707L116.049 172.497C116.546 161.263 120.199 150.392 126.595 141.12C132.99 131.847 141.872 124.545 152.23 120.041C162.589 115.537 174.009 114.012 185.195 115.641C196.381 117.269 206.883 121.984 215.51 129.252L256.78 80.7792Z"
                fill="url(#meshGradient1)"
                filter="url(#meshBlur)"
                animate={{
                    fillOpacity: [0.4, 0.7, 0.3, 0.6, 0.4],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <foreignObject x={172.777} y={40.814} width={167.977} height={273.151}>
                <div
                    style={{
                        backdropFilter: "blur(20px)",
                        clipPath: "url(#bgblur_1_1397_32011_clip_path)",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </foreignObject>

            <motion.path
                d="M251.157 273.965C266.07 262.81 278.268 248.458 286.844 231.975C295.421 215.491 300.157 197.298 300.701 178.745C301.245 160.193 297.584 141.756 289.988 124.803C282.392 107.85 271.057 92.8151 256.822 80.814L215.532 129.269C222.454 135.105 227.967 142.416 231.661 150.661C235.354 158.905 237.135 167.871 236.87 176.893C236.606 185.915 234.303 194.762 230.132 202.778C225.961 210.794 220.03 217.773 212.777 223.198L251.157 273.965Z"
                fill="url(#meshGradient2)"
                filter="url(#meshBlur)"
                animate={{
                    fillOpacity: [0.3, 0.6, 0.4, 0.7, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <foreignObject x={18.1903} y={135.759} width={266.809} height={197.02}>
                <div
                    style={{
                        backdropFilter: "blur(17px)",
                        clipPath: "url(#bgblur_2_1397_32011_clip_path)",
                        height: "100%",
                        width: "100%",
                    }}
                />
            </foreignObject>

            <motion.path
                d="M52.3076 169.759C51.2857 193.148 56.9598 216.345 68.6702 236.652C80.3805 256.959 97.6458 273.542 118.458 284.473C139.271 295.404 162.775 300.233 186.238 298.399C209.701 296.565 232.159 288.143 251 274.113L212.729 223.264C203.567 230.087 192.646 234.183 181.236 235.075C169.825 235.967 158.395 233.618 148.274 228.302C138.153 222.987 129.757 214.922 124.062 205.047C118.368 195.172 115.608 183.891 116.105 172.517L52.3076 169.759Z"
                fill="url(#meshGradient1)"
                filter="url(#meshBlur)"
                animate={{
                    fillOpacity: [0.35, 0.5, 0.25, 0.45, 0.35],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Enhanced flare elements */}
            <g filter="url(#filter3_f_1397_32011)">
                <motion.path
                    d="M259.408 115.285C274.526 132.203 286.53 163.381 286.153 179.034C272.546 226.172 242.438 272.007 243.554 242.869C244.529 217.404 245.998 217.253 259.408 179.034C263.561 136.774 238.621 151.47 259.408 115.285Z"
                    fill="url(#meshGradient1)"
                    filter="url(#meshBlur)"
                    animate={{
                        opacity: [0.9, 0.5, 1, 0.7, 0.9],
                        scale: [1, 1.08, 0.94, 1.03, 1],
                    }}
                    style={{
                        transformOrigin: "260px 190px",
                    }}
                    transition={{
                        opacity: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                        scale: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        },
                    }}
                />
            </g>

            <g filter="url(#filter4_f_1397_32011)">
                <motion.path
                    d="M72.6697 154.766C76.8355 115.406 120.18 86.0969 133.196 77.2926C168.601 65.8987 201.919 60.307 226.566 81.96C232.814 99.5686 183.955 92.0395 144.905 103.433C101.76 127.23 114.322 162.535 72.6697 154.766Z"
                    fill="url(#meshGradient2)"
                    filter="url(#meshBlur)"
                    animate={{
                        opacity: [1, 0.6, 0.9, 0.7, 1],
                        scale: [1, 0.96, 1.06, 0.99, 1],
                    }}
                    style={{
                        transformOrigin: "150px 120px",
                    }}
                    transition={{
                        opacity: {
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.8,
                        },
                        scale: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.2,
                        },
                    }}
                />
            </g>
        </svg>
    );
};

export default AnimatedCircleFlare;