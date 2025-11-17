"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";
import { useLoginMutation } from "@/src/app/redux/features/auth/authAPI";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/src/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [login] = useLoginMutation();

  const email = watch("email");

  useEffect(() => {
    if (!email) {
      setValue("password", "");
      return;
    }

    const savedPassword = localStorage.getItem(`password_for_${email}`);
    if (savedPassword) {
      setValue("password", atob(savedPassword));
    } else {
      setValue("password", "");
    }
  }, [email, setValue]);

  const onSubmit = async (data: LoginFormValues) => {
    const toastId = toast.loading("Please Wait..");

    try {
      const res = await login(data).unwrap();

      if (res.access) {
        dispatch(setAccessToken(res.access));
        Cookies.set("access_token", res.access, { expires: 7 });

        if (data.rememberMe) {
          localStorage.setItem(
            `password_for_${data.email}`,
            btoa(data.password)
          );
        } else {
          localStorage.removeItem(`password_for_${data.email}`);
        }

        toast.success("Login successful", { id: toastId });
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.detail || "An unexpected error occurred.", {
        id: toastId,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">Email</label>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          className="border-gray-200 py-5"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
            className="border-gray-200 pr-10 py-5"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
      >
        Log In
      </Button>
    </form>
  );
}
