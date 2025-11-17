"use client";

import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/src/app/redux/features/auth/authAPI";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiCheck } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "sonner";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contact_number: string;
  birthday: string;
  profile_image: string;
}

export default function AccountForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { data: userProfile, isLoading, error } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      contact_number: "",
      birthday: "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        firstName: userProfile.first_name || "",
        lastName: userProfile.last_name || "",
        email: userProfile.email || "",
        address: userProfile.address || "",
        contact_number: userProfile.contact_number || "",
        birthday: userProfile.birthday || "",
      });

      if (userProfile.profile_image) {
        setProfileImage(userProfile.profile_image);
      }
    }
  }, [userProfile, reset]);

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toastId = toast.loading("Please wait...");
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
        toast.success(
          "Photo Selected Successfully,After click save change button it will upload ",
          { id: toastId, duration: 5000 }
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    const toastId = toast.loading("Please wait...");
    try {
      const formData = new FormData();

      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("contact_number", data.contact_number);
      formData.append("birthday", data.birthday);

      if (fileInputRef.current?.files?.[0]) {
        formData.append("profile_image", fileInputRef.current.files[0]);
      }

      const res = await updateProfile(formData).unwrap();

      toast.success("Changes saved successfully!", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error saving changes", { id: toastId, duration: 3000 });
    }
  };

  const handleCancel = () => {
    reset();
    toast.info("Changes cancelled");
  };

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  return (
    <div className="min-h-screen bg-white rounded-2xl p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Account Information
          </h1>
          <hr className="border-b border-blue-500 w-[28%]" />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-200">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0">
              {profileImage ? (
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg font-medium transition-colors hover:bg-secondaryHover "
              >
                <MdOutlineFileUpload size={20} />
                Upload New Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.firstName && (
                  <span className="text-sm text-red-600">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.lastName && (
                  <span className="text-sm text-red-600">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                disabled
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 outline-none transition"
              />
              {errors.email && (
                <span className="text-sm text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.address && (
                  <span className="text-sm text-red-600">
                    {errors.address.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Contact Number
                </label>
                <input
                  type="tel"
                  {...register("contact_number", {
                    required: "Contact number is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.contact_number && (
                  <span className="text-sm text-red-600">
                    {errors.contact_number.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Birthday
              </label>
              <input
                type="date"
                {...register("birthday", { required: "Birthday is required" })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              {errors.birthday && (
                <span className="text-sm text-red-600">
                  {errors.birthday.message}
                </span>
              )}
            </div>

            <div className="flex flex-col justify-center md:flex-row gap-4 pt-6">
              <button
                onClick={handleSubmit(onSubmit)}
                className=" px-4 w-[200px] h-10 py-2 bg-secondary hover:bg-secondaryHover text-white font-medium rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border w-[200px] h-10 border-gray-300 bg-[#8CA3CD] text-white font-medium rounded-lg hover:bg-[#7A8FB8] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
