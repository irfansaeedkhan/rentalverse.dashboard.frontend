import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useAuthStore } from "@/stores/auth.store";
import { AppRoutes } from "@/constants/app-routes";
import { Button } from "../../shared";
import { CgSpinner } from "react-icons/cg";
import { VerifyAccountPopup } from "./verify-account-popup";

interface IFormInput {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore(useShallow((state) => state.actions));

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setErrorMessage("");
    setIsLoading("loading");
    if (data.email === "" || data.password === "") {
      setErrorMessage("Email and Password are required");
      setIsLoading("loaded");
      return;
    }

    try {
      await login(data.email, data.password);
      toast.success("Logged in successfully");
      setIsLoading("loaded");
      router.push(AppRoutes.dashboard.index);
    } catch (error: any) {
      setIsLoading("loaded");
      // toast.error(error.message);
      setErrorMessage(error.message);
      if (error.message === "complete email verification first") {
        setVerifyAccount(true);
        setErrorMessage(" ");
      }
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(inputMain, "gap-4")}>
          <div className={inputMain}>
            <input
              autoComplete="off"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
              className={clsx(
                inputField,
                errors.email && "!border-red-shade-4",
              )}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-shade-4 text-xs font-medium">
                {errors.email.type === "required"
                  ? "Email is required"
                  : "Invalid email address"}
              </p>
            )}
          </div>
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
                {...register("password", { required: true })}
                className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                placeholder="Password"
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
          </div>
          <div className="flex w-full justify-end">
            <Link
              href={AppRoutes.passwords.forgot_password}
              className="cool-link-green text-gradient text-base"
            >
              Forgot Password
            </Link>
          </div>
          <span className="text-xs text-red-shade-2">{errorMessage}</span>
          <Button
            type="submit"
            title="Login"
            loaderIcon={
              isLoading === "loading" && (
                <CgSpinner className="mx-auto size-5 animate-spin" />
              )
            }
            disabled={
              errors.email ||
              errors.password ||
              watch("email") === "" ||
              watch("password") === "" ||
              isLoading === "loading"
                ? true
                : false
            }
            className="mt-4 text-sm md:text-base"
          />
        </div>
      </form>
      <div className="mt-6 rounded-xl border border-gray-shade-1/10 bg-primary-dark p-4 text-white">
        <p className="text-sm font-semibold">Demo account</p>
        <p className="mt-1 text-xs text-white/70">
          Explore the demo dashboard with the public demo account below. This
          demo build signs in with any password; no real funds are involved.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-primary px-3 py-2 text-xs font-medium">
            demo@altaria.com
          </span>
          <button
            type="button"
            onClick={() => {
              setValue("email", "demo@altaria.com", {
                shouldValidate: true,
              });
            }}
            className="rounded-md border border-gray-shade-1/10 px-3 py-2 text-xs font-medium hover:text-green"
          >
            Fill demo email
          </button>
          <button
            type="button"
            onClick={copyDemoEmail}
            className="rounded-md border border-gray-shade-1/10 px-3 py-2 text-xs font-medium hover:text-green"
          >
            Copy email
          </button>
        </div>
      </div>
      <VerifyAccountPopup
        email={watch("email")}
        open={verifyAccount}
        onClose={() => setVerifyAccount(false)}
      />
    </div>
  );
};

const copyDemoEmail = async () => {
  try {
    await navigator.clipboard.writeText("demo@altaria.com");
    toast.success("Demo email copied");
  } catch {
    toast.error("Could not copy demo email");
  }
};

const inputMain = "flex flex-col";
const inputField =
  "peer relative w-full bg-primary-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:primary-light focus:ring-2 focus:ring-primary-light focus:drop-shadow-lg py-3 rounded-xl text-base text-white";
const passwordField =
  "peer relative w-full bg-primary-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:primary-light focus:ring-2 focus:ring-primary-light focus:drop-shadow-lg py-3 rounded-xl  text-base text-white";
