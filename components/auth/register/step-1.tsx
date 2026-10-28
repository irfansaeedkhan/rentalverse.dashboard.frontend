"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { AppRoutes } from "@/constants/app-routes";
import { useRouter, useSearchParams } from "next/navigation";

export const Step1: React.FC<any> = ({ formMethods }) => {
  const {
    register,
    formState: { errors },
  } = formMethods;
  const searchParams = useSearchParams();
  const [isReferralEditable, setIsReferralEditable] = useState(true);
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      formMethods.setValue("referral_code", ref);
      setIsReferralEditable(false);
    }
  }, [searchParams, formMethods]);

  return (
    <div className={clsx(inputMain, "gap-4")}>
      <div className={inputMain}>
        <input
          autoFocus
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Email"
          type="email"
          id="email"
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email address",
            },
            maxLength: {
              value: 50,
              message: "Email cannot exceed 50 characters",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-shade-4">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Name"
          type="text"
          required
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long",
            },
            maxLength: {
              value: 50,
              message: "Name cannot exceed 50 characters",
            },
          })}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-shade-4">{errors.name.message}</p>
        )}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Surname"
          type="text"
          id="surname"
          {...register("surname", {
            required: "Surname is required",
            minLength: {
              value: 2,
              message: "Surname must be at least 2 characters long",
            },
            maxLength: {
              value: 50,
              message: "Surname cannot exceed 50 characters",
            },
          })}
          required
        />
        {errors.surname && (
          <p className="mt-1 text-xs text-red-shade-4">
            {errors.surname.message}
          </p>
        )}
      </div>
      <div className={inputMain}>
        <input
          autoComplete="off"
          className={clsx(inputField)}
          placeholder="Referral Code (optional)"
          type="text"
          readOnly={!isReferralEditable}
          id="referral_code"
          {...register("referral_code", {
            maxLength: {
              value: 50,
              message: "Referral code cannot exceed 50 characters",
            },
          })}
        />
        <p className="mt-1 text-xs text-white/60">
          Optional. If someone invited you, enter their code here, or open
          this page from their referral link and it fills in automatically.
          Leave it blank to continue without one.
        </p>
        {errors.referral_code && (
          <p className="mt-1 text-xs text-red-shade-4">
            {errors.referral_code.message}
          </p>
        )}
      </div>
      <div className={inputMain}>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            {...register("terms", { required: "You must agree to continue" })}
            className="focus:primary-light peer relative h-5 w-5 shrink-0 rounded-sm bg-primary-light text-white outline-none drop-shadow-sm focus:ring-2 focus:ring-primary-light focus:drop-shadow-lg"
          />
          <label
            htmlFor="checkbox"
            className="block min-h-5 text-xs font-normal text-white sm:h-3 md:text-sm"
          >
            By proceeding, you agree to RentalVerse&apos;s{" "}
            <Link
              href={AppRoutes.privacy_policy}
              className="cool-link cursor-pointer font-semibold"
            >
              Terms of Use & Privacy Policy.
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-xs text-red-shade-4">
            {errors.terms.message}
          </p>
        )}
      </div>
    </div>
  );
};

const inputMain = "flex flex-col";
const inputLabel = "text-xs font-medium text-white pb-1";
const inputField =
  "peer relative w-full bg-primary-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:primary-light focus:ring-2 focus:ring-primary-light focus:drop-shadow-lg py-3 rounded-xl text-base text-white";
