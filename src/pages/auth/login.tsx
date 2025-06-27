import Input from "@/components/shared/input";
import AuthBtn from "@/components/shared/auth/authBtn";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SocialLogin from "@/components/shared/auth/socialLogin";

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    return (
        <>
            <h2 className="text-center text-[1.9rem] font-semibold">Log In</h2>
            <div className="flex flex-col mt-[3rem] gap-y-[2.5rem]">
                {
                    Object.keys(formData).map((key) => {
                        return (
                            <div className="" key={key}>
                                <p className="capitalize text-[1.3rem] text-[#667485] mb-[.8rem]">{key}</p>
                                <Input
                                    name={key}
                                    value={formData[key as keyof typeof formData]}
                                    type={key === "email" ? "email" : "password"}
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <AuthBtn
                text="Log In"
                classname="mt-[3rem]"
            />
            <div className="flex mt-[3rem] justify-between">
                <div className="flex items-center gap-x-[1rem]">
                    <Checkbox
                        className="size-[1.7rem] shadow"
                    />
                    <p className="text-[1.3rem] text-[#030712]">Remember Me</p>
                </div>

                <Button
                    variant="ghost"
                    asChild
                    className="text-[1.3rem] text-[#2563EB]"
                >
                    <Link to={""}>
                        Forgot Password?
                    </Link>
                </Button>
            </div>

            <SocialLogin />

            <p className="text-center mt-[3rem] text-grey-300 text-[1.3rem]">Have no Account? <Button className="!p-0 text-grey-300 text-[1.3rem] text-[]" variant={"ghost"}><Link to={""}>Sign Up</Link></Button></p>
        </>
    );
}

export default Login;