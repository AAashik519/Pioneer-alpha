"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSignupMutation } from "@/src/app/redux/features/auth/authAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
 

// Zod Validation Schema
const formSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "First name is required")
      .regex(/^[A-Za-z\s]+$/, "Please enter a valid name format."),
    last_name: z
      .string()
      .min(1, "Last name is required")
      .regex(/^[A-Za-z\s]+$/, "Please enter a valid name format."),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {

  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
const router = useRouter();
  const [signup, { isLoading, isError, data }] = useSignupMutation();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const toastId = toast.loading("Please Wait..");
    try {
      const res = await signup(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Account Created Successfully", {
          id: toastId,
          duration: 3000,
        });
         router.push("/auth/login");
      }
    } catch (error: any) {
      if (error?.data?.detail) {
        toast.error(error.data.detail, { id: toastId, duration: 3000 });
      } else {
        toast.error("An unexpected error occurred.", {
          id: toastId,
          duration: 3000,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            First Name
          </label>
          <Input {...register("first_name")} className=" border-gray-200" />
          {errors.first_name && (
            <p className="text-sm text-red-600">{errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Last Name</label>
          <Input {...register("last_name")} className=" border-gray-200" />
          {errors.last_name && (
            <p className="text-sm text-red-600">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">Email</label>
        <Input
          type="email"
          {...register("email")}
          className="border border-gray-300 focus:border-blue-500 focus:ring-0 rounded-m "
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

     {/* Password */}
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-900">Password</label>

  <div className="relative">
    <Input
      type={showPassword ? "text" : "password"}
      {...register("password")}
      className="border-gray-200 pr-10"
    />

    {/* Toggle Button */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showPassword ?  <IoMdEye size={20}  /> : <IoMdEyeOff size={20} />}
    </button>
  </div>

  {errors.password && (
    <p className="text-sm text-red-600">{errors.password.message}</p>
  )}
</div>

{/* Confirm Password */}
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-900">
    Confirm Password
  </label>

  <div className="relative">
    <Input
      type={showConfirmPassword ? "text" : "password"}
      {...register("confirmPassword")}
      className="border-gray-200 pr-10"
    />

    {/* Toggle Button */}
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showConfirmPassword ?  <IoMdEye size={20}  /> : <IoMdEyeOff size={20} /> }
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="text-sm text-red-600">
      {errors.confirmPassword.message}
    </p>
  )}
</div>


      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
