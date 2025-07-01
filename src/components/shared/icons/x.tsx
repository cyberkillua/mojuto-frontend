import { cn } from "@/lib/utils";


const X = ({
    className,
    fill = "black",
}: {
    className?: string
    fill?: string
}) => {
    return (
        <svg className={cn("size-[1.2rem]", className)} width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.225098 0.794922H6.13135L10.3323 6.65677L15.4126 0.794922H17.6626L11.3508 8.07781L18.2251 17.6699H12.3188L8.11786 11.8081L3.0376 17.6699H0.787598L7.09944 10.387L0.225098 0.794922ZM13.1855 15.9824L3.51058 2.48242H5.26461L14.9396 15.9824H13.1855Z" fill={fill} />
        </svg>

    );
}

export default X;