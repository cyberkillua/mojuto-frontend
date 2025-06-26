import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface Props {
    name: string;
    value: string;
    onChange: (e: any) => void;
    placeholder?: string;
    type?: string;
    className?: string;
}

const SharedInput = ({
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    className,
    ...props
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const renderInput = () => {
        switch (type) {
            case "password":
                return (
                    <div className="relative">
                        <Input
                            name={name}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            type={showPassword ? "text" : "password"}
                            className={cn("h-[4.9rem] !text-[1.3rem] px-[1.4rem] pr-[3.5rem] rounded-[4rem] shadow focus-visible:bg-[#F9FAFB] focus-visible:border-[#E5E7EB] focus-visible:ring-0", className)}
                            {...props}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-[1.4rem] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff
                                    size={20}
                                    className="text-fg-muted"
                                />
                            ) : (
                                <Eye
                                    size={20}
                                    className="text-fg-muted"
                                />
                            )}
                        </button>
                    </div>
                );
            default:
                return (
                    <Input
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        type={type}
                        className={cn("h-[4.9rem] !text-fg-base !text-[1.3rem] px-[1.4rem] rounded-[4rem] shadow focus-visible:bg-[#F9FAFB] focus-visible:border-[#E5E7EB] focus-visible:ring-0", className)}
                        {...props}
                    />
                );
        }
    };

    return renderInput();
};

export default SharedInput;