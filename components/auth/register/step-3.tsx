import React, { useState } from "react";
import clsx from "clsx";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useFormContext } from "react-hook-form";
import {
  calculatePasswordStrength,
  PasswordStrengthMeter,
} from "./strength-meter";

export const Step3: React.FC<any> = ({ formMethods }) => {
  const {
    register,
    formState: { errors },
  } = formMethods;
  const { watch } = useFormContext();
  const password = watch("password");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Toggle function for showing/hiding password
  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const passwordStrength = calculatePasswordStrength(password);

  return (
    <div className={clsx(inputMain, "gap-4")}>
      <div className={inputMain}>
        <div className={clsx("flex items-center", passwordField)}>
          <input
            autoFocus
            autoComplete="off"
            className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
            placeholder="Choose your password"
            name="password"
            type={showPassword1 ? "text" : "password"}
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
          />
          <span
            className="flex size-5 flex-shrink-0 cursor-pointer items-center justify-center"
            onClick={toggleShowPassword1}
          >
            {showPassword1 ? (
              <FaRegEyeSlash className="size-[18px]" />
            ) : (
              <FaRegEye className="size-[18px]" />
            )}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-shade-4 mt-1 text-xs">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className={inputMain}>
        <div className={clsx("flex items-center", passwordField)}>
          <input
            autoComplete="off"
            className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
            placeholder="Confirm your password"
            name="confirm_password"
            type={showPassword2 ? "text" : "password"}
            {...register("confirm_password", {
              required: "Confirming password is required",
              validate: (value: any) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <span
            className="flex size-5 flex-shrink-0 cursor-pointer items-center justify-center"
            onClick={toggleShowPassword2}
          >
            {showPassword2 ? (
              <FaRegEyeSlash className="size-[18px]" />
            ) : (
              <FaRegEye className="size-[18px]" />
            )}
          </span>
        </div>
        {errors.confirm_password && (
          <p className="text-red-shade-4 mt-1 text-xs">
            {errors.confirm_password.message}
          </p>
        )}
      </div>
      <PasswordStrengthMeter strength={passwordStrength} />
    </div>
  );
};

const inputMain = "flex flex-col";
const passwordField =
  "peer relative w-full bg-primary-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:primary-light focus:ring-2 focus:ring-primary-light focus:drop-shadow-lg py-3 rounded-xl text-base text-white";
