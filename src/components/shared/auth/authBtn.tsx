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
            className={cn("w-full mt-[3rem] !font-medium rounded-[2.5rem] py-[2.4rem] text-[1.3rem]", classname)}
            onClick={onClick}  // Pass onClick to Button
        >
            {text}
        </Button>
    );
}
 
export default AuthBtn;