import Tabs from "@/components/shared/common/tabs";
import { useState } from "react";
import Input from "@/components/shared/common/input";
import AuthBtn from "@/components/shared/auth/authBtn";
import SocialLogin from "@/components/shared/auth/socialLogin";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <>
            <h2 className="text-center text-[1.9rem] font-semibold">Sign Up</h2>
            <Tabs
                options={["Single User","As Enterprise" ]}
                content={[
                    <SingleUser />,
                    <Enterprise />
                ]}
            />
        </>
    );
}

export default SignUp;

const Enterprise = () => {
    const [formData, setFormData] = useState({
        "FirstName": "",
        "LastName": "",
        "Email": "",
        "Company": "",
        "Country": "",
        "Message": "",
    });

    const formatKey = (key: string) => {
        return key.replace(/([A-Z])/g, (letter, index) => {
            return index === 0 ? letter : ` ${letter}`;
        });
    }

    const formKeys = Object.keys(formData);
    const regularFields = formKeys.slice(0, -1);
    const lastField = formKeys[formKeys.length - 1];

    return (
        <div className="mt-[3.5rem]">
            <div className="grid sm:grid-cols-2 gap-y-[2.5rem] gap-x-[2rem] mb-[2.5rem]">
                {
                    regularFields.map((key) => {
                        const isEmail = key === "Email";
                        
                        return (
                            <div 
                                className={`${isEmail ? 'sm:col-span-2' : ''}`} 
                                key={key}
                            >
                                <p className="capitalize text-[1.3rem] text-[#667485] font-normal mb-[.8rem]">
                                    {formatKey(key)}
                                </p>
                                <Input
                                    name={key}
                                    value={formData[key as keyof typeof formData]}
                                    type="text"
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <div className="">
                <p className="capitalize font-normal text-[1.3rem] text-[#667485] mb-[.8rem]">
                    Message (Optional)
                </p>
                <Input
                    name={lastField}
                    value={formData[lastField as keyof typeof formData]}
                    type="textarea"
                    onChange={(e) => setFormData({ ...formData, [lastField]: e.target.value })}
                />
            </div>

            <AuthBtn
                text="continue"
            />

            <SocialLogin />

            <p className="text-center !text-[#008188] mt-[3rem] text-[1.3rem]"> 
                <Button className="!p-0 text-[1.3rem]" variant={"ghost"}>
                    Already have an Account? <Link to={"/login"}>Log In</Link>
                </Button>
            </p>
        </div>
    )
}

const SingleUser = () => {
    const [formData, setFormData] = useState({
        "FirstName": "",
        "LastName": "",
        "Email": "",
        "Password": "",
        "Re-enterPassword": "",
    });

    const formatKey = (key: string) => {
        return key.replace(/([A-Z])/g, (letter, index) => {
            return index === 0 ? letter : ` ${letter}`;
        });
    }

    const formKeys = Object.keys(formData);

    return (
        <div className="mt-[3.5rem]">
            <div className="grid sm:grid-cols-2 gap-y-[2.5rem] gap-x-[2rem] mb-[2.5rem]">
                {
                    formKeys.map((key) => {
                        // Email takes full width, others follow normal grid
                        const isEmail = key === "Email";
                        // const isPasswordField = key === "Password" || key === "Re-enterPassword";
                        
                        return (
                            <div 
                                className={`${isEmail ? 'sm:col-span-2' : ''}`} 
                                key={key}
                            >
                                <p className="capitalize text-[1.3rem] text-[#667485] font-normal mb-[.8rem]">
                                    {formatKey(key)}
                                </p>
                                <Input
                                    name={key}
                                    value={formData[key as keyof typeof formData]}
                                    type={key == "Password" || key == "Re-enterPassword" ? "password" : "text"}
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <AuthBtn
                text="Create Account"
            />

            <SocialLogin />

            <p className="text-center !text-[#008188] mt-[3rem] text-[1.3rem]"> 
                <Button className="!p-0 text-[1.3rem]" variant={"ghost"}>
                    Already have an Account? <Link to={"/login"}>Log In</Link>
                </Button>
            </p>
        </div>
    )
}