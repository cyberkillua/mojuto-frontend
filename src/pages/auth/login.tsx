// components/Login.tsx
import AuthBtn from "@/components/shared/auth/authBtn";
import { useState, useRef, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SocialLogin from "@/components/shared/auth/socialLogin";
import { useMutation } from "@tanstack/react-query";
import  { useFetch } from "@/hooks/use-fetch";
import FormField from "@/components/shared/auth/formField";
import { useAuth } from "@/contexts/AuthContexts";
import { toast } from "sonner"; 

interface FormData {
    email: string;
    password: string;
}

interface LoginResponse {
    data: {
        email: string;
        firstName: string;
        lastName: string;
        token: string;
        userId: string;
    };
    message: string;
    success: boolean;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const [showErrors, setShowErrors] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const fieldRefs = useRef<{[key: string]: any}>({});
    const { login } = useAuth();

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberUser');
        if (rememberedUser) {
            try {
                const parsed = JSON.parse(rememberedUser);
                if (parsed.rememberMe) {
                    setFormData(prev => ({ ...prev, email: parsed.email }));
                    setRememberMe(true);
                }
            } catch (error) {
                console.error('Error parsing remembered user:', error);
                localStorage.removeItem('rememberUser');
            }
        }
    }, []);

    const {
        mutate: loginMutation,
        isPending: isLoginPending,
    } = useMutation({
        mutationFn: (): Promise<LoginResponse> => useFetch('/organization/sign-in', { 
            method: "POST",
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            }),
        }),
        onSuccess: (response) => {
            console.log("Login successful:", response);
            
            if (response.success && response.data) {
                const { email, firstName, lastName, token, userId } = response.data;
                
                login(
                    { email, firstName, lastName, userId },
                    token,
                    rememberMe
                );
                
                toast.success("Login successful!");
            } else {
                toast.error("Login failed. Please try again.");
            }
        },
        onError: (error: any) => {
            console.error("Login error:", error);
            
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               "Login failed. Please check your credentials.";
            
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
        const fieldsToValidate = ["email", "password"];

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

            console.log("Login data:", formData);
            loginMutation();
        }, 0);
    };

    const formFields = [
        { name: "email", required: true, type: "email" as const },
        { name: "password", required: true, type: "password" as const }
    ];

    return (
        <>
            <h2 className="text-center text-[1.9rem] font-semibold">Log In</h2>
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
            
            <AuthBtn
                text="Log In"
                classname="mt-[3rem]"
                onClick={handleSubmit}
                loading={isLoginPending}
            />
            
            <div className="flex mt-[3rem] justify-between">
                <div className="flex items-center gap-x-[1rem]">
                    <Checkbox
                        className="size-[1.7rem] shadow"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <p className="text-[1.3rem] text-[#030712]">Remember Me</p>
                </div>

                <Button
                    variant="ghost"
                    asChild
                    className="text-[1.3rem] hover:text-blue-600 hover:bg-transparent  text-[#008188]"
                >
                    <Link to={"/forgot-password"}>
                        Forgot Password?
                    </Link>
                </Button>
            </div>

            <SocialLogin />

            <p className="text-center mt-[3rem] text-[#008188] text-[1.3rem]">
                {"Have no Account? "}
               <Button
                  className="!p-0  hover:text-blue-600 hover:bg-transparent text-[#008188] text-[1.3rem]"
                  variant={"ghost"}
                >
                    <Link to={"/signup"}> Sign Up</Link>
                </Button>
            </p>
        </>
    );
}

export default Login;