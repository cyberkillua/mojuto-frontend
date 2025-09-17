import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedNodeNetwork = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      }
    }
  };

  // Node entrance animations
  const nodeVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      y: 20 
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  // Connection line animations
  const lineVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0 
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  // Floating animation for active nodes
  const floatingAnimation = {
    y: [0, -8, 0],
    x: [0, 4, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center p-8">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative"
      >
        <svg
          width={736}
          height={732}
          viewBox="0 0 368 366"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
          {...props}
        >
          <defs>
            {/* Animated gradients */}
            <radialGradient id="animatedCyanGradient" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(88.4818 90.0625) rotate(90) scale(116.832 156.905)">
              <motion.stop 
                offset={0.182692} 
                animate={isInView ? {
                  stopColor: ["#010F10", "#001F22", "#010F10"],
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ stopColor: "#010F10" }}
              />
              <motion.stop 
                offset={1} 
                animate={isInView ? {
                  stopColor: ["#00EAFF", "#3DEFFF", "#7EF4FF", "#00EAFF"],
                } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ stopColor: "#00EAFF" }}
              />
            </radialGradient>

            <radialGradient id="animatedGreenGradient1" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(299.58 92.9663) rotate(90) scale(27 36.8)">
              <motion.stop 
                animate={isInView ? {
                  stopColor: ["#B8FF71", "#7EF4FF", "#B8FF71"],
                } : {}}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{ stopColor: "#B8FF71" }}
              />
              <motion.stop 
                offset={1} 
                animate={isInView ? {
                  stopOpacity: [0.92, 0.7, 0.92],
                } : {}}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{ stopColor: "white", stopOpacity: 0.92 }}
              />
            </radialGradient>

            <radialGradient id="animatedGreenGradient2" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(303.824 334.83) rotate(90) scale(52.8 70.4)">
              <motion.stop 
                animate={isInView ? {
                  stopColor: ["#B8FF71", "#7EF4FF", "#B8FF71"],
                } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ stopColor: "#B8FF71" }}
              />
              <motion.stop 
                offset={1} 
                animate={isInView ? {
                  stopOpacity: [0.92, 0.8, 0.92],
                } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ stopColor: "white", stopOpacity: 0.92 }}
              />
            </radialGradient>

            <radialGradient id="animatedGreenGradient3" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(41.5404 247.191) rotate(90) scale(39.6 54.1714)">
              <motion.stop 
                animate={isInView ? {
                  stopColor: ["#B8FF71", "#7EF4FF", "#B8FF71"],
                } : {}}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                style={{ stopColor: "#B8FF71" }}
              />
              <motion.stop 
                offset={1} 
                animate={isInView ? {
                  stopOpacity: [0.92, 0.75, 0.92],
                } : {}}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                style={{ stopColor: "white", stopOpacity: 0.92 }}
              />
            </radialGradient>

            {/* All the original filters */}
            <filter id="filter0_i_1397_33110" x={18.9814} y={-7.63867} width={139} height={146} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feMorphology radius={5} operator="dilate" in="SourceAlpha" result="effect1_innerShadow_1397_33110" />
              <feOffset dy={-8} />
              <feGaussianBlur stdDeviation={15} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.723865 0 0 0 0 0.788931 0 0 0 0.43 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1397_33110" />
            </filter>
            {/* Additional filters abbreviated for brevity */}
            <filter id="filter1_di_1397_33110" x={28.0818} y={87.0625} width={120.8} height={107.6} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={17} />
              <feGaussianBlur stdDeviation={2.4} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0388729 0 0 0 0 0.755555 0 0 0 0 0.818791 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1397_33110" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1397_33110" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={-8} />
              <feGaussianBlur stdDeviation={1.5} />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1397_33110" />
            </filter>
            {/* More filters... */}
            <clipPath id="clip0_1397_33110">
              <rect x={18.9814} y={0.361328} width={139} height={138} rx={69} fill="white" />
            </clipPath>
            <clipPath id="clip1_1397_33110">
              <rect x={290.73} y={58.7354} width={46} height={45} rx={22.5} transform="rotate(17.7771 290.73 58.7354)" fill="white" />
            </clipPath>
            <clipPath id="clip2_1397_33110">
              <rect x={259.824} y={277.63} width={88} height={88} rx={44} fill="white" />
            </clipPath>
            <clipPath id="clip3_1397_33110">
              <rect x={0.115234} y={209.011} width={67.7143} height={66} rx={33} transform="rotate(-7.17648 0.115234 209.011)" fill="white" />
            </clipPath>
          </defs>

          {/* Main Node (Top Left) */}
          <motion.g
            variants={nodeVariants}
            custom={0}
            filter="url(#filter0_i_1397_33110)"
          >
            <motion.g 
              clipPath="url(#clip0_1397_33110)"
              animate={isInView ? floatingAnimation : {}}
            >
              <rect x={18.9814} y={0.361328} width={139} height={138} rx={69} fill="#3DEFFF" fillOpacity={0.05} />
              <g filter="url(#filter1_di_1397_33110)">
                <ellipse cx={88.4818} cy={131.462} rx={55.6} ry={41.4} fill="url(#animatedCyanGradient)" fillOpacity={0.5} shapeRendering="crispEdges" />
              </g>
              <g filter="url(#filter2_i_1397_33110)">
                <motion.ellipse 
                  cx={88.4816} 
                  cy={55.5617} 
                  rx={27.8} 
                  ry={27.6} 
                  fill="#021213" 
                  fillOpacity={0.3}
                  animate={isInView ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </g>
            </motion.g>
          </motion.g>

          {/* Small Node (Top Right) */}
          <motion.g
            variants={nodeVariants}
            custom={1}
            filter="url(#filter3_i_1397_33110)"
          >
            <motion.g 
              clipPath="url(#clip1_1397_33110)"
              animate={isInView ? floatingAnimation : {}}
              style={{ originX: "307px", originY: "82px" }}
            >
              <rect x={290.73} y={58.7354} width={46} height={45} rx={22.5} transform="rotate(17.7771 290.73 58.7354)" fill="#B8FF71" fillOpacity={0.1} />
              <g filter="url(#filter4_di_1397_33110)">
                <ellipse cx={299.58} cy={106.466} rx={18.4} ry={13.5} transform="rotate(17.7771 299.58 106.466)" fill="url(#animatedGreenGradient1)" shapeRendering="crispEdges" />
              </g>
              <g filter="url(#filter5_di_1397_33110)">
                <motion.ellipse 
                  cx={307.137} 
                  cy={82.8987} 
                  rx={9.2} 
                  ry={9} 
                  transform="rotate(17.7771 307.137 82.8987)" 
                  fill="#B8FF71"
                  animate={isInView ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.5
                  }}
                />
              </g>
            </motion.g>
          </motion.g>

          {/* Medium Node (Bottom Right) */}
          <motion.g
            variants={nodeVariants}
            custom={2}
            filter="url(#filter6_i_1397_33110)"
          >
            <motion.g 
              clipPath="url(#clip2_1397_33110)"
              animate={isInView ? floatingAnimation : {}}
            >
              <rect x={259.824} y={277.63} width={88} height={88} rx={44} fill="#B8FF71" fillOpacity={0.1} />
              <g filter="url(#filter7_di_1397_33110)">
                <ellipse cx={303.824} cy={361.23} rx={35.2} ry={26.4} fill="url(#animatedGreenGradient2)" shapeRendering="crispEdges" />
              </g>
              <g filter="url(#filter8_di_1397_33110)">
                <motion.circle 
                  cx={303.825} 
                  cy={312.83} 
                  r={17.6} 
                  fill="#B8FF71"
                  animate={isInView ? {
                    scale: [1, 1.15, 1],
                  } : {}}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                  }}
                />
              </g>
            </motion.g>
          </motion.g>

          {/* Small Node (Bottom Left) */}
          <motion.g
            variants={nodeVariants}
            custom={3}
            filter="url(#filter13_i_1397_33110)"
          >
            <motion.g 
              clipPath="url(#clip3_1397_33110)"
              animate={isInView ? floatingAnimation : {}}
            >
              <rect x={0.115234} y={209.011} width={67.7143} height={66} rx={33} transform="rotate(-7.17648 0.115234 209.011)" fill="#B8FF71" fillOpacity={0.1} />
              <g filter="url(#filter14_di_1397_33110)">
                <ellipse cx={41.5404} cy={266.991} rx={27.0857} ry={19.8} transform="rotate(-7.17648 41.5404 266.991)" fill="url(#animatedGreenGradient3)" shapeRendering="crispEdges" />
              </g>
              <g filter="url(#filter15_di_1397_33110)">
                <motion.ellipse 
                  cx={37.0057} 
                  cy={230.974} 
                  rx={13.5429} 
                  ry={13.2} 
                  transform="rotate(-7.17648 37.0057 230.974)" 
                  fill="#B8FF71"
                  animate={isInView ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3.5
                  }}
                />
              </g>
            </motion.g>
          </motion.g>

          {/* Animated Connection Lines */}
          <motion.g filter="url(#filter9_d_1397_33110)">
            <motion.path
              d="M75.5507 137.448C60.8142 170.024 60.9075 170.628 46.1709 203.204"
              stroke="#00EAFF"
              strokeOpacity={0.25}
              strokeLinecap="round"
              strokeDasharray="2 2"
              shapeRendering="crispEdges"
              variants={lineVariants}
              animate={isInView ? {
                strokeOpacity: [0.25, 0.8, 0.25],
                strokeDashoffset: [0, -20, 0],
              } : {}}
              transition={{
                strokeOpacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            />
          </motion.g>

          <motion.g filter="url(#filter10_d_1397_33110)">
            <motion.path
              d="M259.292 323.009C183.772 299.587 140.261 281.976 64.7407 258.555"
              stroke="#00EAFF"
              strokeOpacity={0.25}
              strokeLinecap="round"
              strokeDasharray="2 2"
              shapeRendering="crispEdges"
              variants={lineVariants}
              animate={isInView ? {
                strokeOpacity: [0.25, 0.7, 0.25],
                strokeDashoffset: [0, -20, 0],
              } : {}}
              transition={{
                strokeOpacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                strokeDashoffset: { duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }
              }}
            />
          </motion.g>

          <motion.g filter="url(#filter11_d_1397_33110)">
            <motion.path
              d="M307.655 277.435L307.655 217.117C307.481 176.955 307.231 149.896 307.057 109.734"
              stroke="#00EAFF"
              strokeOpacity={0.25}
              strokeLinecap="round"
              strokeDasharray="2 2"
              shapeRendering="crispEdges"
              variants={lineVariants}
              animate={isInView ? {
                strokeOpacity: [0.25, 0.9, 0.25],
                strokeDashoffset: [0, -20, 0],
              } : {}}
              transition={{
                strokeOpacity: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 },
                strokeDashoffset: { duration: 2.8, repeat: Infinity, ease: "linear", delay: 1 }
              }}
            />
          </motion.g>

          <motion.g filter="url(#filter12_d_1397_33110)">
            <motion.path
              d="M281.8 84.0845L224.759 85.3221C196.06 85.9958 184.809 85.9921 156.11 86.6658"
              stroke="#00EAFF"
              strokeOpacity={0.25}
              strokeLinecap="round"
              strokeDasharray="2 2"
              shapeRendering="crispEdges"
              variants={lineVariants}
              animate={isInView ? {
                strokeOpacity: [0.25, 0.6, 0.25],
                strokeDashoffset: [0, -20, 0],
              } : {}}
              transition={{
                strokeOpacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }
              }}
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Ambient glow effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 234, 255, 0.03) 0%, transparent 70%)'
        }}
        animate={isInView ? {
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedNodeNetwork;