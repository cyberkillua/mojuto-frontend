import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface  Props {
    text: string
    classname?: string
}

const AuthBtn = ({
    text,
    classname
}: Props) => {
    return ( 
        <Button 
            className={cn("w-full mt-[3rem] !font-medium rounded-[2.5rem] py-[2.4rem] text-[1.3rem]", classname)}
        >
            {text}
        </Button>
    );
}
 
export default AuthBtn;