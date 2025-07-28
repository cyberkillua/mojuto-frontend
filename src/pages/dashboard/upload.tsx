import { useState, useRef } from "react";
import Insight from "@/components/shared/icons/insight";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Pen from "@/components/shared/icons/pen";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
    const [showUpload, setShowUpload] = useState(false);
    const [addWallet, setAddWallet] = useState(false);


    const handleContinue = () => {
        setShowUpload(true);
    };

    return (
        <>
            <div className="w-full h-[100%] grid place-content-center">
                {!showUpload ? (
                    <NoWallet onContinue={handleContinue} />
                ) : addWallet ? (
                    <AddWallet />
                ) : (
                    <ImportWallets setAddWallet={setAddWallet} />
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

const AddWallet = () => {
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [walletAddresses, setWalletAddresses] = useState<string[]>([]);

    const addWallet = (walletAddress: string) => {
        if(walletAddress.length === 0) {
            toast.error("Please enter a wallet address");
            return;
        }
        if (walletAddresses.includes(walletAddress)) {
            toast.error("Wallet already added");
            return;
        }
        setWalletAddresses(prev => [...prev, walletAddress]);
        setWalletAddress("");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setWalletAddress(newValue);
        console.log(newValue); // Log the new value directly
    }

    const removeWallet = (index: number) => {
        setWalletAddresses(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <div className=" flex flex-col w-[58rem] gap-[2.5rem]">
            <div className="bg-[#131E24] border border-[#192830] rounded-[2rem] w- px-[2rem] py-[1.5rem]">
                <p className="text-[#D5F0FF] text-[1.35rem]">Upload Name</p>
                <Input
                    placeholder="BTC Holders"
                    className="bg-white pl-[1.5rem] !text-[1.6rem] placeholder:text-[1.2rem] h-[4rem] placeholder:text-[#030712] placeholder:font-[500] rounded-[3.5rem] mt-[1.2rem]  focus-visible:ring-none"
                />
            </div>

            <div className="bg-[#131E24] border border-[#192830] rounded-[2rem] w- px-[2rem] py-[1.5rem]">
                <p className="text-[#D5F0FF] text-[1.35rem]">Import Wallets</p>
                <div className="flex gap-[1rem] mt-[1.2rem] items-center">
                    <Input
                        placeholder="7 Digit Wallet Address"
                        className="bg-white pl-[1.5rem] !text-[1.4rem] 
                        placeholder:text-[1.2rem] placeholder:text-[#9CA3AF] h-[4rem] placeholder:font-[500] focus:outline-none rounded-[3.5rem] mt-[1.2rem] focus-visible:ring-none"
                        onChange={handleChange}
                        value={walletAddress}
                    />

                    <Button
                        className="bg-white hover:bg-white cursor-pointer rounded-full size-[4rem]"
                        onClick={() => addWallet(walletAddress)}
                    >
                        <Plus
                            className="size-[1.7rem]  text-[#000000]"
                        />
                    </Button>
                </div>
                <p className="text-[#E11D48] text-[1.2rem] mt-[.9rem]">Max Upload: {10 - (+walletAddresses.length)} /  10</p>

                <div className="">
                    <div className="bg-[#131E24] rounded-[1.5rem] mt-[1.5rem] border border-[#192830]">
                        {
                            walletAddresses.map((item, i) => (
                                <div className="flex rounded-[1.5rem]  pl-[2rem] pr-[1.5rem] items-center justify-between border py-[1.4rem] border-[#192830]" key={i}>
                                    <p className="text-[#D5F0FF] font-[400] text-[1.2rem]">{item}</p>

                                    <div className="flex gap-[1rem]">
                                        <Button className="bg-[#FFFFFF] rounded-full hover:bg-transparent  hover:border hover:border-white size-[3.5rem]">
                                            <SquarePen
                                                className="size-[1.4rem] text-[#131E24]"
                                            />
                                        </Button>

                                        <Button
                                            className="bg-[#AF1100] border border-[#951709] rounded-full size-[3.7rem]"
                                            onClick={() => removeWallet(i)}
                                        >
                                            <Trash2
                                                className="size-[1.4rem] text-white"
                                            />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <Button disabled={walletAddresses.length >= 10 || walletAddresses.length === 0} className="w-full py-[2rem] mt-[2.5rem] text-[1.3rem] hover:bg-transparent hover:border-white hover:border-[1.5px] cursor-pointer hover:text-white rounded-[3rem] bg-white text-[#030712]">Continue</Button>
                </div>
            </div>
        </div>
    )
}

const ImportWallets = ({
    setAddWallet
}: {
    setAddWallet: React.Dispatch<React.SetStateAction<boolean>>
}) => {
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
        <div className="flex flex-col gap-[2rem]">
            <div className="w-full max-w-[45rem] mx-auto">
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
                            <p className="text-[#7FA1B4] max-w-[23rem] mt-[.5rem] text-[1.3rem]">
                                Drag and drop CSV, Txt or PDF files
                                here or click to upload
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="w-[40%] h-[1px] bg-[#7FA1B44D]" />
                <span className="text-[#7FA1B4] text-[1.4rem]">OR</span>
                <div className="w-[40%] h-[1px] bg-[#7FA1B44D]" />
            </div>

            <div
                className="w-full max-w-[45rem] mx-auto"
                onClick={() => setAddWallet(true)}
            >
                <div
                    className={`
                     rounded-lg bg-[#131E24] px-8 py-[3rem] text-center cursor-pointer transition-colors duration-200`}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <div className="">
                            <div className="flex w-fit mx-auto">
                                <Pen
                                    className="size-[1.7rem] mr-[.5rem] text-[#D5F0FF]"
                                />
                                <h3 className="text-[#D5F0FF] text-[1.4rem] font-medium">
                                    Add Wallets Manually
                                </h3>
                            </div>
                            <p className="text-[#7FA1B4] max-w-[25rem] mt-[.5rem] text-[1.3rem]">
                                Paste or manually enter wallet addresses directly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;