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
        <div className={cn("flex justify-between sm:gap-x-[2rem] mt-[3rem]", classname)}>
            {
                socialLogins.map((socialLogin, idx) => {
                    return (
                        <Button
                            variant={"outline"}
                            key={idx}
                            className="sm:!h-[5rem] !h-[3.9rem] shadow sm:px-[5rem] px-[3.5rem] rounded-[4.5rem]"
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