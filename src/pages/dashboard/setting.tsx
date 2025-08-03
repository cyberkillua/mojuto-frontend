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
            const response = await useFetch("/user/profile"); // placeholder endpoint
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
            const response = await useFetch("/user/team"); // placeholder endpoint
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

const TeamManagement = ({ 
    teamData, 
    isLoading, 
    refetchTeamData 
}: { 
    teamData: any, 
    isLoading: boolean,
    refetchTeamData: () => void 
}) => {
    const {
        mutate: addTeamMember,
        isPending: isAddingMember,
    } = useMutation({
        mutationFn: (memberData: { email: string, role: string }) => 
            useFetch('/user/add-team-member', { // placeholder endpoint
                method: "POST",
                body: JSON.stringify(memberData),
            }),
        onSuccess: () => {
            toast.success("Team member added successfully!");
            refetchTeamData();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to add team member");
        },
    });

    const handleAddUser = () => {
        // This would typically open a modal or form
        // For now, just a placeholder
        const email = prompt("Enter email address:");
        const role = prompt("Enter role (Admin/User):");
        
        if (email && role) {
            addTeamMember({ email, role });
        }
    };

    return (
        <Card>
            <div className="">
                <div className="flex justify-between mb-[3rem] items-center">
                    <div className="">
                        <h2 className="text-[1.6rem] text-[#EDEEF0]">Team Management</h2>
                        <p className="text-[1.2rem] mt-[.3rem] font-[400] text-[#D5F0FF]">Manage your team's access and roles.</p>
                    </div>

                    <Button 
                        className="bg-white hover:bg-[white] hover:cursor-pointer text-[1.3rem] !px-[2rem] rounded-[2rem] !py-[1.9rem] text-[#030712]"
                        onClick={handleAddUser}
                        disabled={isAddingMember}
                    >
                        {isAddingMember ? (
                            <LoaderCircle className="animate-spin !size-[1.5rem]" />
                        ) : (
                            <>
                                Add User <Plus className="!size-[1.5rem]" />
                            </>
                        )}
                    </Button>
                </div>

                <div className="w-[64rem]">
                    <DataTable
                        columns={TeamManagementColumns}
                        data={teamData?.teamMembers?.map((member: any) => ({
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