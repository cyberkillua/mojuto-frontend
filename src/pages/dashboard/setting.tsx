import Avatar from "@/components/shared/icons/avater";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { TeamManagementColumns } from "@/components/shared/tables/columns/team-management";
import { DataTable } from "@/components/shared/tables/data-table";

interface AccountDetailsFormData {
    name: string;
    email: string;
    role: string;
}

interface EditPasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const Settings = () => {
    return (
        <div className="w-full h-full pl-[3.8rem] pt-[3.2rem] pb-[4rem]">
            <div className="max-w-[98rem] flex flex-col gap-[3rem] w-[100%]">
                <div className="flex gap-[3rem]">
                    <Profile />
                    <AccountDetails />
                    <EditPassword />
                </div>
                <TeamManagement />
            </div>
        </div>
    );
}

const Profile = () => {
    return (
        <Card>
            <div className="flex flex-col">
                <h2 className="text-[1.6rem] text-[#EDEEF0]">Profile Image</h2>
                <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">Personalize your account with a profile photo.</p>

                <Avatar
                    className="mx-auto my-[2.5rem] size-[11rem]"
                />
                <Button
                    className="bg-white hover:bg-[white] hover:cursor-pointer py-[2rem] rounded-[3rem] text-[#030712] text-[1.3rem] "
                >Upload Profile Image</Button>
            </div>
        </Card>
    )
}

const AccountDetails = () => {
    const [formData, setFormData] = useState<AccountDetailsFormData>({
        "name": "",
        "email": "",
        "role": "",
    })

    return (
        <Card>
            <div className="flex flex-col">
                <h2 className="text-[1.6rem] text-[#EDEEF0]">Account Details</h2>
                <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">View and update your personal information.</p>

                <div className="flex flex-col gap-[1.5rem] mt-[2.5rem]">
                    {
                        (Object.keys(formData) as Array<keyof AccountDetailsFormData>).map((key, index) => (
                            <div key={index} className="">
                                <Label className="capitalize mb-[.8rem] text-[#667485] text-[1.3rem]">{key}</Label>
                                <Input
                                    type="text"
                                    id={key}
                                    value={formData[key]}
                                    className="h-[4rem] w-[27rem] bg-[#21343F] border-none rounded-[3rem]"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            [key]: e.target.value
                                        })}
                                />
                            </div>
                        ))
                    }
                </div>
                <Button className="bg-white hover:bg-[white] hover:cursor-pointer mt-[2rem] py-[2rem] rounded-[3rem] text-[#030712] text-[1.3rem]">Edit Profile</Button>
            </div>
        </Card>
    )
}

const EditPassword = () => {

    const [formData, setFormData] = useState<EditPasswordFormData>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    return (
        <Card>
            <div className="flex flex-col">
                <h2 className="text-[1.6rem] text-[#EDEEF0]">Change Password</h2>
                <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">Keep your account secure.</p>

                <div className="flex flex-col gap-[1.5rem] mt-[2.5rem]">
                    {
                        (Object.keys(formData) as Array<keyof EditPasswordFormData>).map((key, index) => (
                            <div key={index} className="">
                                <Label className="capitalize mb-[.8rem] text-[#667485] text-[1.3rem]">{key}</Label>
                                <Input
                                    type="text"
                                    id={key}
                                    value={formData[key]}
                                    className="h-[4rem] w-[27rem] bg-[#21343F] border-none rounded-[3rem]"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            [key]: e.target.value
                                        })}
                                />
                            </div>
                        ))
                    }
                </div>
                <Button className="bg-white hover:bg-[white] hover:cursor-pointer mt-[2rem] py-[2rem] rounded-[3rem] text-[#030712] text-[1.3rem]">Update Password</Button>
            </div>
        </Card>
    )
}

const TeamManagement = () => {
    const data = [
        {
            id: "1",
            name: "Abdullah Adam",
            email: "motolayahya@gmail.com",
            role: "Admin",
        },
        {
            id: "2",
            name: "Mukhtar Omotola Yahya",
            email: "Ilemobayo99@yahoo.com",
            role: "User",
        },
        {
            id: "3",
            name: "Moshood Alimi Abiola",
            email: "abdy@mojuto.com",
            role: "User",
        },
        {
            id: "4",
            name: "Abdullahi Alimi XXVII",
            email: "ymcmb@mojuto.com",
            role: "User",
        },
    ]
    return (
        <Card>
            <div className="">
                <div className="flex justify-between mb-[3rem] items-center">
                    <div className="">
                        <h2 className="text-[1.6rem] text-[#EDEEF0]">Team Management</h2>
                        <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">Manage your team’s access and roles.</p>
                    </div>

                    <Button className="bg-white hover:bg-[white] hover:cursor-pointer text-[1.3rem] !px-[2rem] rounded-[2rem] !py-[1.9rem] text-[#030712]">Add User <Plus className="!size-[1.5rem]" /></Button>
                </div>

                <div className="w-[64rem]">
                    <DataTable
                        columns={TeamManagementColumns}
                        data={data}
                        isLoading={false}
                    />
                </div>
            </div>
        </Card>
    )
}

const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="border-[#253A46] h-fit w-fit p-[2rem] rounded-[3rem] text-[#D5F0FF] bg-[#131E24] border">
            {children}
        </div>
    )
}

export default Settings;