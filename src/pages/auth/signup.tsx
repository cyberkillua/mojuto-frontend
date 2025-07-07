import Tabs from "@/components/shared/common/tabs";
import { useState, useRef } from "react";
import AuthBtn from "@/components/shared/auth/authBtn";
import SocialLogin from "@/components/shared/auth/socialLogin";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useFetch from "@/hooks/use-fetch";
import FormField from "@/components/shared/auth/formField";


const SignUp = () => {
    return (
        <>
            <h2 className="text-center text-[1.9rem] font-semibold">Sign Up</h2>
            <Tabs
                options={["Single User", "As Enterprise"]}
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
    interface EnterpriseFormData {
        FirstName: string;
        LastName: string;
        Email: string;
        Company: string;
        Country: string;
        Message: string;
        Password: string;
        "Re-enterPassword": string;
    }

    interface TransformedEnterpriseData {
        companyName: string;
        country: string;
        adminEmail: string;
        adminFirstName: string;
        adminLastName: string;
        password: string;
        message?: string;
    }

    const [step, setStep] = useState(1);
    const [showErrors, setShowErrors] = useState(false);
    const [formData, setFormData] = useState<EnterpriseFormData>({
        FirstName: "",
        LastName: "",
        Email: "",
        Company: "",
        Country: "",
        Message: "",
        Password: "",
        "Re-enterPassword": "",
    });

    const fieldRefs = useRef<{[key: string]: any}>({});

    const transformFormData = (formData: EnterpriseFormData): TransformedEnterpriseData => {
        return {
            companyName: formData.Company,
            country: formData.Country,
            adminEmail: formData.Email,
            adminFirstName: formData.FirstName,
            adminLastName: formData.LastName,
            password: formData.Password,
            ...(formData.Message && { message: formData.Message })
        };
    };

    const {
        mutate: signupMutation,
        isPending: isSignupPending,
    } = useMutation({
        mutationFn: () => useFetch('/organization/sign-up-enterprise', { 
            method: "POST",
            body: JSON.stringify(transformFormData(formData)),
        }),
        onSuccess: (data) => {
            console.log("Success:", data);
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    const validateCurrentStep = (): boolean => {
        let isValid = true;
        const fieldsToValidate = step === 1 
            ? ["FirstName", "LastName", "Email", "Company", "Country"]
            : ["Password", "Re-enterPassword"];

        fieldsToValidate.forEach(fieldName => {
            const fieldRef = fieldRefs.current[fieldName];
            if (fieldRef) {
                const validation = fieldRef.validate();
                if (!validation.isValid) {
                    isValid = false;
                }
            }
        });

        return isValid;
    };

    const handleContinue = () => {
        setShowErrors(true);

        setTimeout(() => {
            const isValid = validateCurrentStep();
            
            if (!isValid) {
                return;
            }

            if (step === 1) {
                setStep(2);
                setShowErrors(false);
            } else {
                console.log("Final form data:", transformFormData(formData));
                signupMutation();
            }
        }, 0);
    };

    const handleInputChange = (field: keyof EnterpriseFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const step1Fields = [
        { name: "FirstName", required: true },
        { name: "LastName", required: true },
        { name: "Email", required: true, type: "email" as const },
        { name: "Company", required: true },
        { name: "Country", required: true },
        { name: "Message", required: false, type: "textarea" as const }
    ];

    const step2Fields = [
        { name: "Password", required: true, type: "password" as const },
        { name: "Re-enterPassword", required: true, type: "password" as const, validatePassword: true }
    ];

    return (
        <div className="mt-[3.5rem]">
            {step === 1 ? (
                <>
                    <div className="grid sm:grid-cols-2 gap-y-[2.5rem] gap-x-[2rem] mb-[2.5rem]">
                        {step1Fields.slice(0, -1).map((field) => (
                            <FormField
                                key={field.name}
                                ref={(el) => { fieldRefs.current[field.name] = el; }}
                                name={field.name}
                                value={formData[field.name as keyof EnterpriseFormData]}
                                type={field.type || "text"}
                                onChange={handleInputChange(field.name as keyof EnterpriseFormData)}
                                required={field.required}
                                showError={showErrors}
                                className={field.name === "Email" ? "sm:col-span-2" : ""}
                            />
                        ))}
                    </div>

                    <FormField
                        ref={(el) => { fieldRefs.current["Message"] = el; }}
                        name="Message"
                        value={formData.Message}
                        type="textarea"
                        onChange={handleInputChange("Message")}
                        required={false}
                        showError={showErrors}
                        className="mb-[2.5rem]"
                    />

                    <AuthBtn
                        text="Continue"
                        onClick={handleContinue}
                    />

                    <SocialLogin />
                </>
            ) : (
                <>
                    <div className="grid gap-y-[2.5rem] gap-x-[2rem] mb-[2.5rem]">
                        {step2Fields.map((field) => (
                            <FormField
                                key={field.name}
                                ref={(el) => { fieldRefs.current[field.name] = el; }}
                                name={field.name}
                                value={formData[field.name as keyof EnterpriseFormData]}
                                type={field.type}
                                onChange={handleInputChange(field.name as keyof EnterpriseFormData)}
                                required={field.required}
                                showError={showErrors}
                                validatePassword={field.validatePassword}
                                passwordToMatch={field.validatePassword ? formData.Password : undefined}
                            />
                        ))}
                    </div>

                    <AuthBtn
                        text="Create Account"
                        onClick={handleContinue}
                        classname="flex-1"
                        loading={isSignupPending}
                    />
                </>
            )}

            <p className="text-center !text-[#008188] mt-[3rem] text-[1.3rem]">
                <Button className="!p-0 text-[1.3rem]" variant={"ghost"}>
                    Already have an Account? <Link to={"/login"}>Log In</Link>
                </Button>
            </p>
        </div>
    );
};

const SingleUser = () => {
    interface SingleUserFormData {
        FirstName: string;
        LastName: string;
        Email: string;
        Password: string;
        "Re-enterPassword": string;
    }

    interface TransformedSingleUserData {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
    }

    const [formData, setFormData] = useState<SingleUserFormData>({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        "Re-enterPassword": "",
    });

    const [showErrors, setShowErrors] = useState(false);
    const fieldRefs = useRef<{[key: string]: any}>({});

    const transformFormData = (formData: SingleUserFormData): TransformedSingleUserData => {
        return {
            email: formData.Email,
            firstName: formData.FirstName,
            lastName: formData.LastName,
            password: formData.Password
        };
    };

    const {
        mutate: signupMutation,
        isPending: isSignupPending,
    } = useMutation({
        mutationFn: () => useFetch('/organization/sign-up-single-user', { 
            method: "POST",
            body: JSON.stringify(transformFormData(formData)),
        }),
        onSuccess: (data) => {
            console.log("Success:", data);
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    const handleInputChange = (field: keyof SingleUserFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const fieldsToValidate = ["FirstName", "LastName", "Email", "Password", "Re-enterPassword"];

        fieldsToValidate.forEach(fieldName => {
            const fieldRef = fieldRefs.current[fieldName];
            if (fieldRef) {
                const validation = fieldRef.validate();
                if (!validation.isValid) {
                    isValid = false;
                }
            }
        });

        return isValid;
    };

    const handleSubmit = () => {
        setShowErrors(true);
        
        setTimeout(() => {
            const isValid = validateForm();
            
            if (!isValid) {
                return;
            }

            console.log("Form data:", transformFormData(formData));
            signupMutation();
        }, 0);
    };

    const formFields = [
        { name: "FirstName", required: true },
        { name: "LastName", required: true },
        { name: "Email", required: true, type: "email" as const },
        { name: "Password", required: true, type: "password" as const },
        { name: "Re-enterPassword", required: true, type: "password" as const, validatePassword: true }
    ];

    return (
        <div className="mt-[3.5rem]">
            <div className="grid sm:grid-cols-2 gap-y-[2.5rem] gap-x-[2rem] mb-[2.5rem]">
                {formFields.map((field) => (
                    <FormField
                        key={field.name}
                        ref={(el) => { fieldRefs.current[field.name] = el; }}
                        name={field.name}
                        value={formData[field.name as keyof SingleUserFormData]}
                        type={field.type || "text"}
                        onChange={handleInputChange(field.name as keyof SingleUserFormData)}
                        required={field.required}
                        showError={showErrors}
                        className={field.name === "Email" ? "sm:col-span-2" : ""}
                        validatePassword={field.validatePassword}
                        passwordToMatch={field.validatePassword ? formData.Password : undefined}
                    />
                ))}
            </div>

            <AuthBtn
                text="Create Account"
                onClick={handleSubmit}
                loading={isSignupPending}
            />

            <SocialLogin />

            <p className="text-center !text-[#008188] mt-[3rem] text-[1.3rem]">
                <Button className="!p-0 text-[1.3rem]" variant={"ghost"}>
                    Already have an Account? <Link to={"/login"}>Log In</Link>
                </Button>
            </p>
        </div>
    );
};