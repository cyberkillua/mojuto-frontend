import Input from "@/components/shared/common/input";
import { useState, forwardRef, useImperativeHandle } from "react";

interface FormFieldProps {
    name: string;
    value: string;
    type?: "text" | "password" | "textarea" | "email";
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    label?: string;
    placeholder?: string;
    className?: string;
    validatePassword?: boolean;
    passwordToMatch?: string;
    onValidation?: (isValid: boolean, errorMessage?: string) => void;
    showError?: boolean;
}

interface FormFieldRef {
    validate: () => { isValid: boolean; errorMessage?: string };
}

const FormField = forwardRef<FormFieldRef, FormFieldProps>(({
    name,
    value,
    type = "text",
    onChange,
    required = false,
    label,
    placeholder,
    className = "",
    validatePassword = false,
    passwordToMatch = "",
    onValidation,
    showError = false
}, ref) => {
    const [error, setError] = useState<string>("");

    const formatKey = (key: string) => {
        return key.replace(/([A-Z])/g, (letter, index) => {
            return index === 0 ? letter : ` ${letter}`;
        });
    };

    const validateField = (): { isValid: boolean; errorMessage?: string } => {
        // Check if required field is empty
        if (required && !value.trim()) {
            const fieldName = label || formatKey(name);
            return {
                isValid: false,
                errorMessage: `${fieldName} is required`
            };
        }

       
        if (type === "email" && value.trim()) {
           
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(value)) {
                return {
                    isValid: false,
                    errorMessage: "Please enter a valid email address"
                };
            }
        }

        // Password validation
        if (type === "password" && value.trim()) {
            if (value.length < 7) {
                return {
                    isValid: false,
                    errorMessage: "Password must be at least 7 characters long"
                };
            }
        }

        // Password confirmation validation
        if (validatePassword && passwordToMatch && value.trim()) {
            if (value !== passwordToMatch) {
                return {
                    isValid: false,
                    errorMessage: "Passwords do not match"
                };
            }
        }

        return { isValid: true };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e);

        // Clear error when user starts typing
        if (error) {
            setError("");
        }
    };

    const handleBlur = () => {
        if (showError) {
            const validation = validateField();
            const errorMessage = validation.errorMessage || "";
            setError(errorMessage);

            if (onValidation) {
                onValidation(validation.isValid, errorMessage);
            }
        }
    };

    // Expose validation function for external use
    useImperativeHandle(ref, () => ({
        validate: () => {
            const validation = validateField();
            const errorMessage = validation.errorMessage || "";
            setError(showError ? errorMessage : "");

            if (onValidation) {
                onValidation(validation.isValid, errorMessage);
            }

            return validation;
        }
    }));

    const displayLabel = label || formatKey(name);
    const isOptional = !required && (name === "Message" || displayLabel.toLowerCase().includes("optional"));

    return (
        <div className={className}>
            <p className="capitalize text-[1.3rem] text-[#667485] font-normal mb-[.8rem]">
                {displayLabel} {isOptional && "(Optional)"}
            </p>
            <Input
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {error && showError && (
                <p className="text-red-500 text-[1.1rem] mt-[.5rem]">
                    {error}
                </p>
            )}
        </div>
    );
});

export default FormField;