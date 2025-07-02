import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
    text: string
    classname?: string
    onClick?: () => void  // Add onClick prop
}

const AuthBtn = ({
    text,
    classname,
    onClick  // Destructure onClick
}: Props) => {
    return ( 
        <Button 
            className={cn("w-full mt-[3rem] !font-medium rounded-[2.5rem] py-[2.4rem] text-[1.3rem] shadow-[0px_0.5px_0px_0px_rgba(3,7,18,0.16),0px_0.25px_0px_0px_rgba(3,7,18,0.16),0px_1.75px_0px_0px_rgba(255,255,255,0.16)_inset] bg-[linear-gradient(0deg,#030712,#030712),linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_100%)]", classname)}
            onClick={onClick}  // Pass onClick to Button
        >
            {text}
        </Button>
    );
}
 
export default AuthBtn;