import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const SocialLogin = ({
    classname
}: {
    classname?: string
}) => {
    const socialLogins = [
        {
            icon: '/auth/telegram.svg'
        },
        {
            icon: '/auth/twitter.svg'
        },
        {
            icon: '/auth/janto.svg'
        }
    ]

    return (
        <div className={cn("flex gap-x-[2rem] mt-[3rem]", classname)}>
            {
                socialLogins.map((socialLogin, idx) => {
                    return (
                        <Button
                            variant={"outline"}
                            key={idx}
                            className="!h-[5rem] shadow px-[6rem] rounded-[4.5rem]"
                        >
                            <img
                                src={socialLogin.icon} 
                                alt="social-login"
                                className={idx % 2 ? "size-[2rem]" : "size-[2.5rem]"}
                            />
                        </Button>
                    )
                })
            }
        </div>
    );
}

export default SocialLogin;