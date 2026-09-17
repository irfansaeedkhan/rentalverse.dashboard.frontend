"use client";
import React from "react";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../shared";
import { AppRoutes } from "@/constants/app-routes";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export const SettingsCommonTop = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="flex-start flex flex-col items-start justify-between gap-5">
      <div
        className="group flex size-10 cursor-pointer items-center justify-center rounded-full border border-gray-shade-1/10 hover:border-blue-shade-1 hover:bg-gray-shade-1/10"
        onClick={() => router.push(AppRoutes.profile.my_profile)}
      >
        <HiMiniArrowLeft className="text-xl text-white/30 group-hover:text-white" />
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <Link href="/profile-settings?tab=personal_info">
          <Button
            className={clsx(
              "w-fit !rounded-full border-gray-400/40 px-4 py-3 font-kanit text-sm text-white opacity-90",
              pathname === AppRoutes.settings.profile_settings &&
                searchParams.get("tab") === "personal_info" &&
                "border !border-blue-shade-1",
            )}
            variant="secondary"
            title="Personal information"
            borderRounded="48px"
          />
        </Link>
        <Link href="/profile-settings?tab=update_password">
          <Button
            className={clsx(
              "w-fit !rounded-full border-gray-400/40 px-4 py-3 font-kanit text-sm text-white opacity-90",
              pathname === AppRoutes.settings.profile_settings &&
                searchParams.get("tab") === "update_password" &&
                "border !border-blue-shade-1",
            )}
            variant="secondary"
            title="Password"
          />
        </Link>
      </div>
    </div>
  );
};
