import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const PureGradientAnimation = ({
    className
}: {
    className?: string
}) => {
    return (
        <svg
            width="456"
            height="588"
            viewBox="0 0 228 294"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("relative z-10", className)}
        >
            <defs>
                {/* Animated Cyan Gradient */}
                <radialGradient id="animated-cyan-gradient" cx="50%" cy="50%" r="70%">
                    <motion.stop
                        offset="0%"
                        animate={{
                            stopColor: ["#3AEFFF", "#00D4FF", "#7EF4FF", "#3AEFFF"],
                            stopOpacity: [1, 0.9, 1, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.stop
                        offset="40%"
                        animate={{
                            stopColor: ["#00D4FF", "#7EF4FF", "#3AEFFF", "#00D4FF"],
                            stopOpacity: [0.8, 0.9, 0.7, 0.8]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />
                    <motion.stop
                        offset="100%"
                        animate={{
                            stopColor: ["#7EF4FF", "#3AEFFF", "#00D4FF", "#7EF4FF"],
                            stopOpacity: [0.3, 0.4, 0.2, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                </radialGradient>

                {/* Animated Green Gradient */}
                <radialGradient id="animated-green-gradient" cx="50%" cy="50%" r="70%">
                    <motion.stop
                        offset="0%"
                        animate={{
                            stopColor: ["#B8FF71", "#7EF4FF", "#B8FF71", "#7EF4FF"],
                            stopOpacity: [1, 0.9, 1, 0.9]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.stop
                        offset="50%"
                        animate={{
                            stopColor: ["#7EF4FF", "#B8FF71", "#7EF4FF", "#B8FF71"],
                            stopOpacity: [0.7, 0.8, 0.6, 0.7]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                    <motion.stop
                        offset="100%"
                        animate={{
                            stopColor: ["#B8FF71", "#7EF4FF", "#3AEFFF", "#B8FF71"],
                            stopOpacity: [0.2, 0.3, 0.1, 0.2]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />
                </radialGradient>

                {/* Static filters */}
                <filter id="filter0_f_1397_32023" x="28.4036" y="75.6231" width="162.276" height="215.585" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="22.3" result="effect1_foregroundBlur_1397_32023" />
                </filter>

                <filter id="filter1_f_1397_32023" x="37.5468" y="31.6703" width="148.989" height="187.464" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="22.3" result="effect1_foregroundBlur_1397_32023" />
                </filter>

                {/* Static clip paths */}
                <clipPath id="bgblur_0_1397_32023_clip_path" transform="translate(40 -76.6133)">
                    <path d="M0 161.272L112.645 116.613L227.734 161.272L112.645 207.533L0 161.272Z" />
                </clipPath>
                <clipPath id="bgblur_1_1397_32023_clip_path" transform="translate(-72.6444 39.1396)">
                    <path d="M112.644 0.860352V195.917L227.733 147.053L112.644 0.860352Z" />
                </clipPath>
                <clipPath id="bgblur_2_1397_32023_clip_path" transform="translate(12.9002 12.0396)">
                    <path d="M-0.000244141 148.455L112.645 195.917V0.860352L-0.000244141 148.455Z" />
                </clipPath>
                <clipPath id="bgblur_3_1397_32023_clip_path" transform="translate(15 -146.27)">
                    <path d="M0 161.27L112.645 207.53V293.844L0 161.27Z" />
                </clipPath>
                <clipPath id="bgblur_4_1397_32023_clip_path" transform="translate(-72.6445 -121.27)">
                    <path d="M112.645 207.53L227.733 161.27L112.645 293.844V207.53Z" />
                </clipPath>
            </defs>

            {/* Main shapes with animated gradients only */}
            <g filter="url(#filter0_f_1397_32023)">
                <path
                    d="M116.359 246.608C67.1683 227.22 81.6935 186.304 74.6286 173.034C67.5638 159.764 84.4758 129.107 107.161 122.533C129.847 115.959 125.86 123.01 139.672 148.954C146.737 162.224 156.419 233.792 116.359 246.608Z"
                    fill="url(#animated-cyan-gradient)"
                />
            </g>

            <g filter="url(#filter1_f_1397_32023)">
                <path
                    d="M111.896 174.535C68.5497 159.081 89.4526 160.498 83.5694 149.448C77.6862 138.397 90.6653 82.9922 111.162 77.0522C131.659 71.1122 126.533 100.275 138.034 121.879C143.917 132.93 148.131 163.029 111.896 174.535Z"
                    fill="url(#animated-green-gradient)"
                />
            </g>

            {/* Static background elements - no animation */}
            <foreignObject x="-40" y="76.6133" width="307.734" height="170.92">
                <div style={{ backdropFilter: 'blur(20px)', clipPath: 'url(#bgblur_0_1397_32023_clip_path)', height: '100%', width: '100%' }} />
            </foreignObject>
            <path d="M0 161.272L112.645 116.613L227.734 161.272L112.645 207.533L0 161.272Z" fill="#004B52" fillOpacity="0.05" />

            <foreignObject x="72.6444" y="-39.1396" width="195.088" height="275.057">
                <div style={{ backdropFilter: 'blur(20px)', clipPath: 'url(#bgblur_1_1397_32023_clip_path)', height: '100%', width: '100%' }} />
            </foreignObject>
            <path d="M112.644 0.860352V195.917L227.733 147.053L112.644 0.860352Z" fill="#7EF4FF" fillOpacity="0.1" />

            <foreignObject x="-12.9002" y="-12.0396" width="138.445" height="220.857">
                <div style={{ backdropFilter: 'blur(6.45px)', clipPath: 'url(#bgblur_2_1397_32023_clip_path)', height: '100%', width: '100%' }} />
            </foreignObject>
            <path d="M-0.000244141 148.455L112.645 195.917V0.860352L-0.000244141 148.455Z" fill="#7EF4FF" fillOpacity="0.1" />

            <foreignObject x="-15" y="146.27" width="142.645" height="162.575">
                <div style={{ backdropFilter: 'blur(7.5px)', clipPath: 'url(#bgblur_3_1397_32023_clip_path)', height: '100%', width: '100%' }} />
            </foreignObject>
            <path d="M0 161.27L112.645 207.53V293.844L0 161.27Z" fill="#7EF4FF" fillOpacity="0.1" />

            <foreignObject x="72.6445" y="121.27" width="195.088" height="212.575">
                <div style={{ backdropFilter: 'blur(20px)', clipPath: 'url(#bgblur_4_1397_32023_clip_path)', height: '100%', width: '100%' }} />
            </foreignObject>
            <path d="M112.645 207.53L227.733 161.27L112.645 293.844V207.53Z" fill="#7EF4FF" fillOpacity="0.1" />
        </svg>
    );
};

export default PureGradientAnimation;