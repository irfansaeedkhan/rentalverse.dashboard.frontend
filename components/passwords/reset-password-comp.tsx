"use client";
import React, { useState, useEffect, useCallback } from "react";
import EmailSent from "@/components/passwords/email-sent";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/shared";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { CreateNewPassword } from "@/lib/auth/create-new-password";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { axiosAPI } from "@/utils/axios";
import DisplayMessage from "../display-message";
import Link from "next/link";
import { AppRoutes } from "@/constants/app-routes";
import {
  calculatePasswordStrength,
  PasswordStrengthMeter,
} from "../auth/register/strength-meter";

interface IFormInput {
  password: string;
  confirmPassword: string;
}

export const ResetPasswordComp = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const params = useSearchParams();
  const email = params.get("Email");
  const token = params.get("ResetToken");

  const [isLoading, setIsLoading] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState<string>("");
  //UseEffect to make axios request and check if the token is valid
  const checkToken = useCallback(async () => {
    try {
      let res = await axiosAPI.post(
        `auth/forget-password/verify-email/${token}`,
      );
      setUserId(res.data);
      toast.success("Token verified");
      setIsTokenVerified(true);
    } catch (error: any) {
      //
      const errorMessage = "Failed to verify token";
      if (error.response?.status === 500) {
        toast.error(error.response?.data?.message ?? errorMessage);
      } else {
        toast.error("Invalid Token");
      }
      //TODO: Disable the form
      setIsTokenVerified(false);
    }
  }, [token]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { password, confirmPassword } = data;
    setIsLoading("loading");
    try {
      await CreateNewPassword(
        password,
        email!,
        userId!,
        token!,
        confirmPassword!,
      );
      setEmailSent(true);
      setIsLoading("success");
    } catch (error) {
      setIsLoading("loaded");
      console.log(error);
      toast.error("Failed to create new password");
    }
  };

  if (!isTokenVerified) {
    return (
      <DisplayMessage
        title="Token Not Verified"
        description="token not verified, please try again"
      >
        <Link href={AppRoutes.passwords.forgot_password} className="w-full">
          <Button type="submit" title="Reset Password" className="w-full" />
        </Link>
      </DisplayMessage>
    );
  }
  if (emailSent) {
    return (
      <EmailSent
        title="Password Changed"
        description="You have successfully changed your Password."
      />
    );
  }
  const password = watch("password");
  const passwordStrength = calculatePasswordStrength(password);

  return (
    <div className="flex w-full max-w-[566px] flex-col gap-4 px-6">
      <div className="mt-8 flex flex-col items-center justify-center gap-3">
        <h2 className="text-gradient font-kanit text-[1.85rem] font-normal leading-[2.62rem]">
          Create new pasword
        </h2>
        <span className="font-nexa text-sm font-normal text-white">
          Enter a strong and unique password.
        </span>
      </div>
      <div className="mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(inputMain, "gap-4")}>
            <div className={inputMain}>
              <div
                className={clsx(
                  "flex items-center",
                  passwordField,
                  errors.password && "!border-red-shade-4",
                )}
              >
                <input
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                      message:
                        "Password must include upper, lower, number, and special character",
                    },
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Enter your new password"
                />
                <span
                  className="flex size-5 flex-shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-shade-4 mt-1 text-xs font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className={inputMain}>
              <div
                className={clsx(
                  "flex items-center",
                  passwordField,
                  errors.confirmPassword && "!border-red-shade-4",
                )}
              >
                <input
                  autoComplete="off"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirming password is required",
                    validate: (value: any) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Re-enter your password"
                />
                <span
                  className="flex size-5 flex-shrink-0 cursor-pointer items-center justify-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-shade-4 mt-1 text-xs font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <PasswordStrengthMeter strength={passwordStrength} />
            <Button
              type="submit"
              title="Reset Password"
              disabled={
                isLoading === "loading" ||
                errors.password ||
                errors.confirmPassword ||
                !watch("password") ||
                !watch("confirmPassword")
                  ? true
                  : false
              }
              loaderIcon={
                isLoading === "loading" && (
                  <CgSpinner className="mx-auto size-5 animate-spin" />
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const inputMain = "flex flex-col";
const passwordField =
  "peer relative w-full bg-primary-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:primary-light focus:ring-2 focus:ring-primary-light focus:drop-shadow-lg py-3 rounded-xl text-base text-white";
