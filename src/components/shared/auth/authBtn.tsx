import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

interface Props {
    text: string
    classname?: string
    onClick?: () => void,
    link?: string,
    loading?: boolean
}

const AuthBtn = ({
    text,
    classname,
    onClick,
    link,
    loading = false,
    ...props
}: Props) => {
    const defaultClass = "w-full mt-[3rem] !font-medium rounded-[2.5rem] py-[2.4rem] text-[1.3rem] shadow-[0px_0.5px_0px_0px_rgba(3,7,18,0.16),0px_0.25px_0px_0px_rgba(3,7,18,0.16),0px_1.75px_0px_0px_rgba(255,255,255,0.16)_inset] bg-[linear-gradient(0deg,#030712,#030712),linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_100%)]"
    return (
        <>
            {
                link?.length ? (
                    <Button
                        className={cn(defaultClass, classname)}
                        onClick={onClick}
                        {...props}
                        asChild
                    >
                        <Link to={link}>
                            {text}
                        </Link>
                    </Button>
                ) : (
                    <Button
                        className={cn(defaultClass, classname)}
                        onClick={onClick}
                        {...props}
                    >
                        {text}
                        {
                            loading && (
                            <LoaderCircle
                                className="mr-l size-[1.5rem] animate-spin"
                            />)
                        }
                    </Button>
                )
            }
        </>
    );
}

export default AuthBtn;