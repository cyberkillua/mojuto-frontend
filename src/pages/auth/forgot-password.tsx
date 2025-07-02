import SharedInput from "@/components/shared/common/input";
import AuthBtn from "@/components/shared/auth/authBtn";
import { Button } from "@/components/ui/button";
import CheckIcon from "@/components/shared/icons/check";
import { useState } from "react";

const ForgotPassword = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    return (
        <>
            {
                isSuccess
                    ? <Success />
                    : <Default
                        setIsSuccess={setIsSuccess}
                    />
            }
        </>
    );
}

const Success = () => {
    return (
        <div className="">
            <CheckIcon
                className="mx-auto mt-[1.5rem]"
            />

            <div className="mt-[4.5rem]">
                <h2 className="text-[1.8rem] font-semibold text-center">Password Reset Successful</h2>
                <p className="text-[#9CA3AF] mt-[.5rem] max-w-[32rem] sm:text-[1.5rem] text-[1.3rem] mx-auto text-center">Your password has been updated.<br></br>
                    You can now log in with your new password.</p>
            </div>

            <AuthBtn
                text="Log In"
            />
        </div>
    )
}

const Default = ({
    setIsSuccess
}: {
    setIsSuccess: (value: boolean) => void;
}) => {
    return (
        <>
            <h2 className="text-center text-[1.9rem] font-semibold">Forgot Password</h2>
            <p className="text-center text-[#9CA3AF] text-[1.2rem] sm:text-[1.5rem] mt-[.5rem] mx-auto sm:max-w-[30rem] max-w-[26rem]">Enter your email address below and we’ll send you a link to reset your password.</p>

            <div className="mt-[3rem]">
                <p className="capitalize text-[1.3rem] text-[#667485] font-normal mb-[.8rem]">Email</p>
                <SharedInput
                    name="email"
                    value=""
                    onChange={() => { }}
                    type="email"
                />
            </div>

            <div className="flex flex-col mt-[.8rem]">
                <AuthBtn
                    text="Send Reset Link"
                    onClick={() => setIsSuccess(true)}
                />
                <AuthBtn
                    text="Back to Login"
                    classname="mt-[2rem] font-semibold text-[#030712] bg-white bg-[linear-gradient(180deg,rgba(40,40,40,0.16)_0%,rgba(40,40,40,0)_100%)]"
                    
                />
            </div>

            <p className="text-center !text-[#008188] mt-[3rem] !text-[1.3rem]">Didn’t Get the Link? <Button variant={"ghost"} className="!p-0 !text-[1.3rem]">Resend Link</Button></p>
        </>
    )
}

export default ForgotPassword;