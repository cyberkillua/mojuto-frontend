import { useState, useRef } from "react";
import Insight from "@/components/shared/icons/insight";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Analytics = () => {
    const [showUpload, setShowUpload] = useState(false);

    const handleContinue = () => {
        setShowUpload(true);
    };

    return (
        <>
            <div className="w-full h-[100%] grid place-content-center">
                {!showUpload ? (
                    <NoWallet onContinue={handleContinue} />
                ) : (
                    <ImportWallets />
                )}
            </div>
        </>
    );
};

const NoWallet = ({ onContinue }: { onContinue: () => void }) => {
    return (
        <div className="">
            <Insight classname="mx-auto" />
            <div className="w-[16rem]">
                <h2 className="text-[#D5F0FF] text-[1.5rem] text-center">
                    No Wallets Tracked
                </h2>
                <p className="text-[#7FA1B4] text-center mt-[1rem] text-[1.4rem]">
                    Upload a CSV file to start analyzing wallets.
                </p>
            </div>
            <Button
                onClick={onContinue}
                className="px-[5rem] mt-[2.5rem] rounded-[5rem] py-[2rem] bg-white text-[1.3rem] text-[#030712]"
            >
                Continue
            </Button>
        </div>
    );
};

const ImportWallets = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileUpload = (files: FileList) => {
        if (files && files.length > 0) {
            const file = files[0];
            if (file) {
                // Check if file is CSV, TXT, or PDF
                const allowedTypes = ['.csv', '.txt', '.pdf'];
                const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

                if (allowedTypes.includes(fileExtension)) {
                    console.log('File uploaded:', file.name);
                    // Handle file processing here
                    // You can add your file processing logic here
                } else {
                    alert('Please upload a CSV, TXT, or PDF file.');
                }
            }
        }
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFileUpload(e.target.files);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className={`
                     rounded-lg bg-[#131E24] px-8 py-[3rem] text-center cursor-pointer
                    transition-colors duration-200
                    ${dragActive
                        ? 'border-blue-400 bg-blue-50/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="flex flex-col items-center space-y-4">
                    <div className="">
                        <div className="flex w-fit mx-auto">
                            <Download
                                className="size-[1.7rem] mr-[.5rem] text-[#D5F0FF]"
                            />
                            <h3 className="text-[#D5F0FF] text-[1.4rem] font-medium">
                                Import Wallets
                            </h3>
                        </div>
                        <p className="text-[#7FA1B4] mt-[.5rem] text-[1.3rem]">
                            Drag and drop CSV, Txt or PDF files
                            here or click to upload
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;