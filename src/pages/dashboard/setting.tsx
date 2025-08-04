import Avatar from "@/components/shared/icons/avater";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Plus, LoaderCircle } from "lucide-react";
import { TeamManagementColumns } from "@/components/shared/tables/columns/team-management";
import { DataTable } from "@/components/shared/tables/data-table";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface AccountDetailsFormData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface EditPasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const Settings = () => {
    // Fetch user data and team data
    const {
        data: userData,
        isLoading: isUserDataLoading,
    } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await useFetch("/user/get-logged-in-user"); // placeholder endpoint
            return response.data;
        },
    });


    const {
        data: teamData,
        isLoading: isTeamDataLoading,
        refetch: refetchTeamData,
    } = useQuery({
        queryKey: ["teamData"],
        queryFn: async () => {
            const response = await useFetch(`/user/all?organizationId=${userData?.organizationId}`); // placeholder endpoint
            return response.data;
        },
        enabled: userData?.userType === "ENTERPRISE", // only fetch if enterprise user
    });


    const isEnterprise = userData?.userType === "ENTERPRISE";

    return (
        <div className="w-full h-full pl-[3.8rem] pt-[3.2rem] pb-[4rem]">
            <div className="max-w-[98rem] flex flex-col gap-[3rem] w-[100%]">
                <div className="flex gap-[3rem]">
                    <Profile
                        userData={userData}
                        isLoading={isUserDataLoading}
                    />
                    <AccountDetails
                        userData={userData}
                        isLoading={isUserDataLoading}
                    />
                    <EditPassword />
                </div>

                {/* Only show team management for enterprise users */}
                {isEnterprise && (
                    <TeamManagement
                        teamData={teamData}
                        isLoading={isTeamDataLoading}
                        refetchTeamData={refetchTeamData}
                    />
                )}
            </div>
        </div>
    );
}

const Profile = ({ userData, isLoading }: { userData: any, isLoading: boolean }) => {
    const {
        mutate: uploadProfileImage,
        isPending: isUploadingImage,
    } = useMutation({
        mutationFn: (file: File) => {
            const formData = new FormData();
            formData.append('profileImage', file);

            return useFetch('/user/upload-profile-image', { // placeholder endpoint
                method: "POST",
                body: formData,
            });
        },
        onSuccess: () => {
            toast.success("Profile image updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to upload profile image");
        },
    });

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (allowedTypes.includes(file.type)) {
                uploadProfileImage(file);
            } else {
                toast.error("Please upload a valid image file (JPEG, PNG)");
            }
        }
    };

    return (
        <Card>
            <div className="flex flex-col">
                <h2 className="text-[1.6rem] text-[#EDEEF0]">Profile Image</h2>
                <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">Personalize your account with a profile photo.</p>

                {isLoading ? (
                    <Skeleton className="mx-auto my-[2.5rem] size-[11rem] bg-[#21343F] rounded-full" />
                ) : (
                    <Avatar
                        className="mx-auto my-[2.5rem] size-[11rem]"
                        src={userData?.profileImage}
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="profile-upload"
                />

                <Button
                    className="bg-white hover:bg-[white] hover:cursor-pointer py-[2rem] rounded-[3rem] text-[#030712] text-[1.3rem]"
                    onClick={() => document.getElementById('profile-upload')?.click()}
                    disabled={isUploadingImage}
                >
                    {isUploadingImage ? (
                        <>
                            <LoaderCircle className="animate-spin mr-2" />
                            Uploading...
                        </>
                    ) : (
                        "Upload Profile Image"
                    )}
                </Button>
            </div>
        </Card>
    )
}

const AccountDetails = ({ userData, isLoading }: { userData: any, isLoading: boolean }) => {
    const [formData, setFormData] = useState<AccountDetailsFormData>({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        role: userData?.role || "",
    });

    // Update form when userData changes
    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
                role: userData.role || "",
            });
        }
    }, [userData]);

    const {
        mutate: updateProfile,
        isPending: isUpdatingProfile,
    } = useMutation({
        mutationFn: () => useFetch('/user/edit-profile', { // placeholder endpoint
            method: "PUT",
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            }),
        }),
        onSuccess: () => {
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        },
    });

    const handleSubmit = () => {
        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast.error("Please fill in all required fields");
            return;
        }
        updateProfile();
    };

    return (
        <Card>
            <div className="flex flex-col">
                <h2 className="text-[1.6rem] text-[#EDEEF0]">Account Details</h2>
                <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">View and update your personal information.</p>

                <div className="flex flex-col gap-[1.5rem] mt-[2.5rem]">
                    {isLoading ? (
                        <>
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i}>
                                    <Skeleton className="w-[6rem] h-[1.5rem] bg-[#21343F] mb-[.8rem]" />
                                    <Skeleton className="h-[4rem] w-[27rem] bg-[#21343F] rounded-[3rem]" />
                                </div>
                            ))}
                        </>
                    ) : (
                        (Object.keys(formData) as Array<keyof AccountDetailsFormData>).map((key, index) => (
                            <div key={index} className="">
                                <Label className="capitalize mb-[.8rem] text-[#667485] text-[1.3rem]">
                                    {key === 'firstName' ? 'First Name' :
                                        key === 'lastName' ? 'Last Name' : key}
                                </Label>
                                <Input
                                    type={key === 'email' ? 'email' : 'text'}
                                    id={key}
                                    value={formData[key]}
                                    className="h-[4.4rem] w-[27rem] bg-[#21343F] !text-[1.4rem] border-none pl-[1.2rem] rounded-[3rem]"
                                    disabled={key === 'role'} // role should not be editable
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            [key]: e.target.value
                                        })}
                                />
                            </div>
                        ))
                    )}
                </div>

                <Button
                    className="bg-white hover:bg-[white] hover:cursor-pointer mt-[2rem] py-[2rem] rounded-[3rem] text-[#030712] text-[1.3rem]"
                    onClick={handleSubmit}
                    disabled={isUpdatingProfile || isLoading}
                >
                    {isUpdatingProfile ? (
                        <>
                            <LoaderCircle className="animate-spin mr-2" />
                            Updating...
                        </>
                    ) : (
                        "Edit Profile"
                    )}
                </Button>
            </div>
        </Card>
    )
}

const EditPassword = () => {
    const [formData, setFormData] = useState<EditPasswordFormData>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const {
        mutate: changePassword,
        isPending: isChangingPassword,
    } = useMutation({
        mutationFn: () => useFetch('/user/change-password', { // placeholder endpoint
            method: "PUT",
            body: JSON.stringify({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            }),
        }),
        onSuccess: () => {
            toast.success("Password updated successfully!");
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update password");
        },
    });

    const handleSubmit = () => {
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        changePassword();
    };

    return (
        <Card>
            <div className="flex flex-col">
                <h2 className="text-[1.6rem] text-[#EDEEF0]">Change Password</h2>
                <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">Keep your account secure.</p>

                <div className="flex flex-col gap-[1.5rem] mt-[2.5rem]">
                    {(Object.keys(formData) as Array<keyof EditPasswordFormData>).map((key, index) => (
                        <div key={index} className="">
                            <Label className="capitalize mb-[.8rem] text-[#667485] text-[1.3rem]">
                                {key === 'oldPassword' ? 'Old Password' :
                                    key === 'newPassword' ? 'New Password' :
                                        'Confirm Password'}
                            </Label>
                            <Input
                                type="password"
                                id={key}
                                value={formData[key]}
                                className="h-[4.4rem] !text-[1.4rem] w-[27rem] pl-[1.4rem] bg-[#21343F] border-none rounded-[3rem]"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [key]: e.target.value
                                    })}
                            />
                        </div>
                    ))}
                </div>

                <Button
                    className="bg-white hover:bg-[white] hover:cursor-pointer mt-[2rem] py-[2rem] rounded-[3rem] text-[#030712] text-[1.3rem]"
                    onClick={handleSubmit}
                    disabled={isChangingPassword}
                >
                    {isChangingPassword ? (
                        <>
                            <LoaderCircle className="animate-spin mr-2" />
                            Updating...
                        </>
                    ) : (
                        "Update Password"
                    )}
                </Button>
            </div>
        </Card>
    )
}

interface TeamMemberFormData {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

const TeamManagement = ({
    teamData,
    isLoading,
    refetchTeamData
}: {
    teamData: any,
    isLoading: boolean,
    refetchTeamData: () => void
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState<TeamMemberFormData>({
        email: "",
        firstName: "",
        lastName: "",
        role: "USER ",
    });

    const {
        mutate: addTeamMember,
        isPending: isAddingMember,
    } = useMutation({
        mutationFn: (memberData: TeamMemberFormData) =>
            useFetch('/user/invite-user', {
                method: "POST",
                body: JSON.stringify(memberData),
            }),
        onSuccess: () => {
            toast.success("Team member added successfully!");
            refetchTeamData();
            setIsDialogOpen(false);
            setFormData({
                email: "",
                firstName: "",
                lastName: "",
                role: "USER",
            });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to add team member");
        },
    });

    const handleInputChange = (field: keyof TeamMemberFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // Validate form data
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Trigger the mutation
        addTeamMember({
            email: formData.email.trim(),
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            role: formData.role,
        });
    };

    const handleResendInvite = () => {
        // You can implement resend functionality here
        toast.info("Resend invite functionality not implemented yet");
    };

    return (
        <Card>
            <div className="">
                <div className="flex justify-between mb-[3rem] items-center">
                    <div className="">
                        <h2 className="text-[1.6rem] text-[#EDEEF0]">Team Management</h2>
                        <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">Manage your team's access and roles.</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-white hover:bg-[white] hover:cursor-pointer text-[1.3rem] !px-[2rem] rounded-[2rem] !py-[1.9rem] text-[#030712]"
                            >
                                Add User <Plus className="!size-[1.5rem]" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-[1.5rem] px-[2.5rem] py-[2rem]">
                            <DialogHeader>
                                <DialogTitle className="!text-[1.6rem]">Add New User</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-[3.2rem] mt-[2rem]">
                                <div className="grid gap-3">
                                    <Label className="text-[1.3rem] text-[#667485]">First Name</Label>
                                    <Input
                                        id="email"
                                        name="Email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="h-[4rem] rounded-[3rem] pl-[1.5rem] focus-visible:ring-0 !text-[1.3rem]"
                                        placeholder="Enter first name"
                                        disabled={isAddingMember}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="text-[1.3rem] text-[#667485]">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        className="h-[4rem] rounded-[3rem] pl-[1.5rem] focus-visible:ring-0 !text-[1.3rem]"
                                        placeholder="Enter first name"
                                        disabled={isAddingMember}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Label className="text-[1.3rem] text-[#667485]">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        className="h-[4rem] rounded-[3rem] pl-[1.5rem] focus-visible:ring-0 !text-[1.3rem]"
                                        placeholder="Enter last name"
                                        disabled={isAddingMember}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Label className="text-[1.3rem] text-[#667485]">Role</Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value) => handleInputChange("role", value)}
                                        disabled={isAddingMember}
                                    >
                                        <SelectTrigger className="w-full !h-[4rem] rounded-[3rem] pl-[1.2rem] text-[1.3rem]">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-[1.5rem] shadow-[0px_8px_16px_0px_#03071214]">
                                            <SelectGroup>
                                                <SelectItem
                                                    value="ADMIN"
                                                    className="!text-[1.3rem] pl-[1.5rem] py-[1rem]"
                                                >
                                                    ADMIN
                                                </SelectItem>
                                                <SelectItem
                                                    value="USER"
                                                    className="!text-[1.3rem] pl-[1.5rem] py-[1rem]"
                                                >
                                                    USER
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <DialogFooter className="mt-[3rem] flex flex-col gap-[1.5rem]">
                                <div className="flex flex-col w-full">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isAddingMember || !formData.firstName.trim() || !formData.lastName.trim()}
                                        className="w-full hover:bg-[#030712] text-white py-[2.2rem] rounded-[3rem] text-[1.3rem] shadow-[0_0.5px_0_0_#03071229,0_0.25px_0_0_#03071229,inset_0_1.75px_0_0_#FFFFFF29] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isAddingMember ? (
                                            <>
                                                <LoaderCircle className="animate-spin mr-2" />
                                                Sending Invite...
                                            </>
                                        ) : (
                                            "Send Invite"
                                        )}
                                    </Button>

                                    <p className="text-[1.3rem] mt-[1.5rem] text-[#098289]">
                                        Link not received?{" "}
                                        <Button
                                            variant="ghost"
                                            onClick={handleResendInvite}
                                            disabled={isAddingMember}
                                            className="p-0 text-[#098289] text-[1.3rem] hover:bg-transparent disabled:opacity-50"
                                        >
                                            Resend
                                        </Button>
                                    </p>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="w-[64rem]">
                    <DataTable
                        columns={TeamManagementColumns}
                        data={teamData?.map((member: any) => ({
                            ...member,
                            name: `${member.firstName} ${member.lastName}`,
                        })) || []}
                        isLoading={isLoading}
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