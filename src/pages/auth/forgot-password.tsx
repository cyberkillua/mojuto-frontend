// components/ForgotPassword.tsx
import AuthBtn from "@/components/shared/auth/authBtn";
import { Button } from "@/components/ui/button";
import CheckIcon from "@/components/shared/icons/check";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "@/hooks/use-fetch";
import FormField from "@/components/shared/auth/formField";
import { toast } from "sonner";

interface FormData {
    email: string;
}

interface ForgotPasswordResponse {
    data?: any;
    message: string;
    success: boolean;
}

const ForgotPassword = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    
    return (
        <>
            {isSuccess ? (
                <Success />
            ) : (
                <Default setIsSuccess={setIsSuccess} />
            )}
        </>
    );
};

const Success = () => {
    return (
        <div className="">
            <CheckIcon
              className="mx-auto mt-[1.5rem]"
            />

            <div className="mt-[4.5rem]">
                <h2 className="text-[1.8rem] font-semibold text-center">
                    Password Reset Link Sent
                </h2>
                <p className="text-[#9CA3AF] mt-[.5rem] max-w-[32rem] sm:text-[1.5rem] text-[1.3rem] mx-auto text-center">
                    We've sent a password reset link to your email address.
                    <br />
                    Please check your inbox and follow the instructions.
                </p>
            </div>

            <AuthBtn
                text="Back to Login"
                classname="mt-[3rem]"
                link="/login"
            />
        </div>
    );
};

const Default = ({
    setIsSuccess
}: {
    setIsSuccess: (value: boolean) => void;
}) => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
    });
    const [showErrors, setShowErrors] = useState(false);
    const [resendCount, setResendCount] = useState(0);
    const fieldRefs = useRef<{[key: string]: any}>({});

    const {
        mutate: forgotPasswordMutation,
        isPending: isForgotPasswordPending,
    } = useMutation({
        mutationFn: (): Promise<ForgotPasswordResponse> => useFetch('/user/forgot-password', {
            method: "POST",
            body: JSON.stringify({
                email: formData.email
            }),
        }),
        onSuccess: (response) => {
            console.log("Forgot password request successful:", response);
            
            if (response.success) {
                setIsSuccess(true);
                toast.success("Password reset link sent to your email!");
            } else {
                toast.error(response.message || "Failed to send reset link. Please try again.");
            }
        },
        onError: (error: any) => {
            console.error("Forgot password error:", error);
            
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               "Failed to send reset link. Please try again.";
            
            toast.error(errorMessage);
        },
    });

    const {
        mutate: resendLinkMutation,
        isPending: isResendPending,
    } = useMutation({
        mutationFn: (): Promise<ForgotPasswordResponse> => useFetch('/organization/forgot-password', {
            method: "POST",
            body: JSON.stringify({
                email: formData.email
            }),
        }),
        onSuccess: (response) => {
            if (response.success) {
                setResendCount(prev => prev + 1);
                toast.success("Reset link resent successfully!");
            } else {
                toast.error(response.message || "Failed to resend link. Please try again.");
            }
        },
        onError: (error: any) => {
            console.error("Resend link error:", error);
            
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               "Failed to resend link. Please try again.";
            
            toast.error(errorMessage);
        },
    });

    const handleInputChange = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const fieldsToValidate = ["email"];

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

            console.log("Forgot password data:", formData);
            forgotPasswordMutation();
        }, 0);
    };

    const handleResendLink = () => {
        if (!formData.email) {
            toast.error("Please enter your email address first.");
            return;
        }

        const isValid = validateForm();
        if (!isValid) {
            setShowErrors(true);
            return;
        }

        resendLinkMutation();
    };

    const formFields = [
        { name: "email", required: true, type: "email" as const }
    ];

    return (
        <>
            <h2 className="text-center text-[1.9rem] font-semibold">Forgot Password</h2>
            <p className="text-center text-[#9CA3AF] text-[1.2rem] sm:text-[1.5rem] mt-[.5rem] mx-auto sm:max-w-[30rem] max-w-[26rem]">
                Enter your email address below and we'll send you a link to reset your password.
            </p>

            <div className="flex flex-col mt-[3rem] gap-y-[2.5rem]">
                {formFields.map((field) => (
                    <FormField
                        key={field.name}
                        ref={(el) => { fieldRefs.current[field.name] = el; }}
                        name={field.name}
                        value={formData[field.name as keyof FormData]}
                        type={field.type}
                        onChange={handleInputChange(field.name as keyof FormData)}
                        required={field.required}
                        showError={showErrors}
                    />
                ))}
            </div>

            <div className="flex flex-col mt-[3rem]">
                <AuthBtn
                    text="Send Reset Link"
                    onClick={handleSubmit}
                    loading={isForgotPasswordPending}
                />
                <AuthBtn
                    text="Back to Login"
                    classname="mt-[2rem] font-semibold text-[#030712] bg-white bg-[linear-gradient(180deg,rgba(40,40,40,0.16)_0%,rgba(40,40,40,0)_100%)]"
                    link="/login"
                />
            </div>

            <p className="text-center !text-[#008188] mt-[3rem] !text-[1.3rem]">
                Didn't Get the Link?{" "}
                <Button 
                    variant={"ghost"} 
                    className="!p-0 !text-[1.3rem]"
                    onClick={handleResendLink}
                    disabled={isResendPending || !formData.email}
                >
                    {isResendPending ? "Resending..." : "Resend Link"}
                    {resendCount > 0 && ` (${resendCount})`}
                </Button>
            </p>
        </>
    );
};

export default ForgotPassword;