import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedSVGComponent = (props: React.SVGProps<SVGSVGElement>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
     <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <svg
          width={576}
          height={498}
          viewBox="0 0 288 249"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <defs>
            {/* Animated gradients for organic shapes */}
            <radialGradient id="animatedCyanGradient" cx="50%" cy="50%" r="80%">
              <motion.stop
                offset="0%"
                animate={{
                  stopColor: ["#3AEFFF", "#00D4FF", "#7EF4FF", "#3AEFFF"],
                  stopOpacity: [1, 0.9, 1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2 : 0,
                }}
              />
              <motion.stop
                offset="50%"
                animate={{
                  stopColor: ["#00D4FF", "#7EF4FF", "#3AEFFF", "#00D4FF"],
                  stopOpacity: [0.7, 0.8, 0.6, 0.7],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2.5 : 0.5,
                }}
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: ["#7EF4FF", "#3AEFFF", "#00D4FF", "#7EF4FF"],
                  stopOpacity: [0.3, 0.4, 0.2, 0.3],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 3 : 1,
                }}
              />
            </radialGradient>

            <radialGradient id="animatedGreenGradient" cx="50%" cy="50%" r="80%">
              <motion.stop
                offset="0%"
                animate={{
                  stopColor: ["#B8FF71", "#7EF4FF", "#B8FF71", "#3AEFFF"],
                  stopOpacity: [1, 0.9, 1, 0.9],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2.2 : 0.2,
                }}
              />
              <motion.stop
                offset="60%"
                animate={{
                  stopColor: ["#7EF4FF", "#B8FF71", "#7EF4FF", "#B8FF71"],
                  stopOpacity: [0.6, 0.7, 0.5, 0.6],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2.8 : 0.8,
                }}
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: ["#B8FF71", "#7EF4FF", "#3AEFFF", "#B8FF71"],
                  stopOpacity: [0.2, 0.3, 0.1, 0.2],
                }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 3.2 : 1.2,
                }}
              />
            </radialGradient>

            {/* Animated border gradients */}
            <linearGradient
              id="animatedBorderGradient1"
              x1={127.224}
              y1={8.64123}
              x2={149.332}
              y2={100.967}
              gradientUnits="userSpaceOnUse"
            >
              <motion.stop
                animate={{
                  stopColor: ["#00EAFF", "#44F9D2", "#337552", "#97FF67", "#00EAFF"],
                  stopOpacity: [0.6, 0.8, 0.4, 0.7, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2 : 0,
                }}
              />
              <motion.stop
                offset={0.408462}
                animate={{
                  stopColor: ["#44F9D2", "#337552", "#97FF67", "#00EAFF", "#44F9D2"],
                  stopOpacity: [0.45, 0.6, 0.3, 0.5, 0.45],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2.2 : 0.2,
                }}
              />
              <motion.stop
                offset={0.624247}
                animate={{
                  stopColor: ["#337552", "#97FF67", "#00EAFF", "#44F9D2", "#337552"],
                  stopOpacity: [0.1, 0.3, 0.15, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2.5 : 0.5,
                }}
              />
              <motion.stop
                offset={1}
                animate={{
                  stopColor: ["#97FF67", "#00EAFF", "#44F9D2", "#337552", "#97FF67"],
                  stopOpacity: [0, 0.2, 0.1, 0.05, 0],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2.8 : 0.8,
                }}
              />
            </linearGradient>

            <linearGradient
              id="animatedBorderGradient2"
              x1={23.9426}
              y1={166.478}
              x2={254.904}
              y2={136.117}
              gradientUnits="userSpaceOnUse"
            >
              <motion.stop
                animate={{
                  stopOpacity: [0, 0.3, 0.1, 0.2, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2.5 : 1.5,
                }}
                style={{ stopColor: "#00EAFF" }}
              />
              <motion.stop
                offset={0.0652543}
                animate={{
                  stopOpacity: [0.14, 0.4, 0.2, 0.3, 0.14],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 2.8 : 1.8,
                }}
                style={{ stopColor: "#00EAFF" }}
              />
              <motion.stop
                offset={0.18336}
                animate={{
                  stopOpacity: [0.8, 1, 0.6, 0.9, 0.8],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 3 : 2,
                }}
                style={{ stopColor: "#00EAFF" }}
              />
              <motion.stop
                offset={0.439551}
                animate={{
                  stopOpacity: [0.8, 0.9, 0.5, 0.7, 0.8],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 3.2 : 2.2,
                }}
                style={{ stopColor: "#00EAFF" }}
              />
              <motion.stop
                offset={1}
                animate={{
                  stopOpacity: [0, 0.2, 0.05, 0.1, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: isInView ? 3.5 : 2.5,
                }}
                style={{ stopColor: "#00EAFF" }}
              />
            </linearGradient>

            {/* Static filters and clipPaths */}
            <filter
              id="filter0_f_1397_32035"
              x={0.205788}
              y={39.2807}
              width={286.838}
              height={176.351}
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
                result="effect1_foregroundBlur_1397_32035"
              />
            </filter>
            <filter
              id="filter1_f_1397_32035"
              x={72.9342}
              y={53.9214}
              width={202.199}
              height={157.353}
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
                result="effect1_foregroundBlur_1397_32035"
              />
            </filter>
            <clipPath
              id="bgblur_0_1397_32035_clip_path"
              transform="translate(7.72168 -38.0631)"
            >
              <path d="M205.718 191.863C216.527 191.863 226.014 184.776 228.896 174.501L255.917 76.9446C257.959 69.3857 252.194 62.0631 244.388 62.0631H66.8914C56.0831 62.0631 46.5958 69.1495 43.7135 79.4248L16.6927 176.981C14.6511 184.54 20.4156 191.863 28.2216 191.863H205.718Z" />
            </clipPath>
            
            {/* Clip path for folder border to prevent overflow */}
            <clipPath id="folderBorderClip">
              <path d="M37.4795 9.26624H79.0312C81.0411 9.26624 82.002 9.27307 83.0205 9.61487C84.0544 9.9619 85.1741 10.6646 87.4131 12.191L105.531 27.3815V27.3824C108.74 30.0645 111.177 32.8297 115.9 32.8297H205.489C218.366 32.8297 228.883 43.1645 228.883 55.7682V100.893L226.564 185.654C226.466 189.253 223.409 192.057 219.814 191.843L198.267 190.565L198.248 190.564H26.499L19.1846 189.07C16.2171 188.464 14.086 185.853 14.0859 182.824V32.2047C14.0861 19.6012 24.6032 9.26624 37.4795 9.26624Z" />
            </clipPath>
          </defs>

          {/* Animated organic shapes with gradient animation */}
          <g filter="url(#filter0_f_1397_32035)">
            <path
              d="M44.8058 164.272C70.1365 78.2587 75.405 118.417 84.5439 95.9962C93.6829 73.575 209.511 90.7491 239.921 83.8807C261.494 97.5462 138.124 112.802 120.257 156.636C94.2126 144.173 84.1498 186.974 44.8058 164.272Z"
              fill="url(#animatedCyanGradient)"
            />
          </g>
          <g filter="url(#filter1_f_1397_32035)">
            <path
              d="M122.935 157.538C105.191 111.763 136.418 119.033 141.512 106.536C146.605 94.0399 207.449 97.0493 226.94 109.396C246.431 121.744 180.263 130.092 180.263 130.092C175.169 142.589 182.905 185.136 122.935 157.538Z"
              fill="url(#animatedGreenGradient)"
            />
          </g>

          {/* Animated border paths with clipping */}
          <g clipPath="url(#folderBorderClip)">
            <motion.path
              d="M37.4795 9.26624H79.0312C81.0411 9.26624 82.002 9.27307 83.0205 9.61487C84.0544 9.9619 85.1741 10.6646 87.4131 12.191L105.531 27.3815V27.3824C108.74 30.0645 111.177 32.8297 115.9 32.8297H205.489C218.366 32.8297 228.883 43.1645 228.883 55.7682V100.893L226.564 185.654C226.466 189.253 223.409 192.057 219.814 191.843L198.267 190.565L198.248 190.564H26.499L19.1846 189.07C16.2171 188.464 14.086 185.853 14.0859 182.824V32.2047C14.0861 19.6012 24.6032 9.26624 37.4795 9.26624Z"
              fill="#004B52"
              fillOpacity={0.05}
              stroke="url(#animatedBorderGradient1)"
              strokeWidth={1.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { 
                pathLength: 1, 
                opacity: 1 
              } : {}}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 0.5, ease: "easeOut" }
              }}
            />
          </g>

          {/* Static elements */}
          <foreignObject x={-7.72168} y={38.0631} width={288.053} height={177.8}>
            <div
              style={{
                backdropFilter: "blur(12px)",
                clipPath: "url(#bgblur_0_1397_32035_clip_path)",
                height: "100%",
                width: "100%",
              }}
            />
          </foreignObject>
          
          <path
            d="M205.718 191.863C216.527 191.863 226.014 184.776 228.896 174.501L255.917 76.9446C257.959 69.3857 252.194 62.0631 244.388 62.0631H66.8914C56.0831 62.0631 46.5958 69.1495 43.7135 79.4248L16.6927 176.981C14.6511 184.54 20.4156 191.863 28.2216 191.863H205.718Z"
            fill="#7EF4FF"
            fillOpacity={0.1}
          />

          <motion.path
            d="M266.916 62.0632L62.4015 62.0631C52.6564 62.0631 44.3023 68.9093 42.5444 78.336L41.8574 82.0196L16.2783 176.347"
            stroke="url(#animatedBorderGradient2)"
            strokeWidth={1.5}
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { 
              pathLength: 1, 
              opacity: 1 
            } : {}}
            transition={{
              pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
              opacity: { duration: 0.3, ease: "easeOut", delay: 0.5 }
            }}
          />
        </svg>
      </motion.div>
  );
};

export default AnimatedSVGComponent;