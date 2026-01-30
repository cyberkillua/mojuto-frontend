const Folder = ({ className }: { className?: string }) => {
  return (
    <svg
      width={259}
      height={212}
      viewBox="0 0 259 212"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_f_1651_22858)">
        <path
          d="M44.5996 144.421C66.0281 58.408 63.3547 109.775 71.0858 87.3538C78.8169 64.9326 177.6 94.2221 203.325 87.3538C221.575 101.019 175.678 122.799 160.564 166.633C138.531 154.17 77.8826 167.123 44.5996 144.421Z"
          fill="#3AEFFF"
        />
      </g>
      <path
        d="M29.4688 0.625H71.0205C73.0303 0.625 73.9913 0.631838 75.0098 0.973633C76.0436 1.32067 77.1634 2.02333 79.4023 3.5498L97.5205 18.7402V18.7412C100.73 21.4233 103.166 24.1885 107.89 24.1885H197.479C210.355 24.1885 220.872 34.5233 220.872 47.127V92.1455L191.26 177.635C190.371 180.202 187.953 181.923 185.236 181.923H18.4883L11.1738 180.429C8.20641 179.822 6.07528 177.211 6.0752 174.183V23.5635C6.07533 10.9599 16.5925 0.625 29.4688 0.625Z"
        fill="#7EF4FF"
        fillOpacity={0.1}
        stroke="url(#paint0_linear_1651_22858)"
        strokeWidth={1.25}
      />
      <foreignObject x={-15.7324} y={29.4219} width={288.054} height={177.8}>
        <div
          style={{
            backdropFilter: "blur(12px)",
            clipPath: "url(#bgblur_0_1651_22858_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius={24}
        d="M197.708 183.221C208.516 183.221 218.003 176.135 220.886 165.86L247.906 68.3034C249.948 60.7445 244.184 53.4219 236.378 53.4219H58.8807C48.0723 53.4219 38.585 60.5083 35.7028 70.7836L8.68197 168.34C6.64039 175.899 12.4048 183.221 20.2109 183.221H197.708Z"
        fill="#7EF4FF"
        fillOpacity={0.1}
      />
      <path
        d="M258.905 53.422L54.3907 53.4219C44.6457 53.4219 36.2916 60.268 34.5336 69.6947L33.8467 73.3783L8.26758 167.706"
        stroke="url(#paint1_linear_1651_22858)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_f_1651_22858"
          x={-0.000389099}
          y={34.15}
          width={252.148}
          height={177.083}
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
            result="effect1_foregroundBlur_1651_22858"
          />
        </filter>
        <clipPath
          id="bgblur_0_1651_22858_clip_path"
          transform="translate(15.7324 -29.4219)"
        >
          <path d="M197.708 183.221C208.516 183.221 218.003 176.135 220.886 165.86L247.906 68.3034C249.948 60.7445 244.184 53.4219 236.378 53.4219H58.8807C48.0723 53.4219 38.585 60.5083 35.7028 70.7836L8.68197 168.34C6.64039 175.899 12.4048 183.221 20.2109 183.221H197.708Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_1651_22858"
          x1={119.213}
          y1={-0.00000422461}
          x2={141.321}
          y2={92.3261}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00EAFF" stopOpacity={0.6} />
          <stop offset={0.408462} stopColor="#44F9D2" stopOpacity={0.45} />
          <stop offset={0.624247} stopColor="#337552" stopOpacity={0.1} />
          <stop offset={1} stopColor="#97FF67" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1651_22858"
          x1={15.9318}
          y1={157.837}
          x2={246.893}
          y2={127.476}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00EAFF" stopOpacity={0} />
          <stop offset={0.0652543} stopColor="#00EAFF" stopOpacity={0.14} />
          <stop offset={0.18336} stopColor="#00EAFF" stopOpacity={0.8} />
          <stop offset={0.439551} stopColor="#00EAFF" stopOpacity={0.8} />
          <stop offset={1} stopColor="#00EAFF" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
export default Folder;
