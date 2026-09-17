"use client";
import { useAuthStore } from "@/stores/auth.store";
import React, { useCallback, useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "../shared";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AppRoutes } from "@/constants/app-routes";
import Link from "next/link";
import { EditIcon } from "@/assets/svgs";
import { getProfileDataApiResponseType } from "./profile-card-data";
import { getProfile } from "@/lib/auth/get-profile";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { EditProfileModel } from "../dashboard/edit-profile-model";

export const ProfileCommonTop = () => {
  const [profileData, setProfileData] =
    useState<getProfileDataApiResponseType>();
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const pathname = usePathname();

  const getProfileData = useCallback(async () => {
    try {
      const res = await getProfile();
      setProfileData(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <div className="mx-auto flex w-full max-w-[1081px] flex-col px-4 pt-5 sm:px-6 md:px-8">
      <div className="flex w-full items-start justify-between rounded-tl-xl rounded-tr-xl bg-primary-dark p-3 text-white  md:rounded-xl">
        <div className="flex  w-full items-center gap-4">
          <FaCircleUser className="size-16 text-white" />
          {/* <Image
            src={"/images/profile-image.png"}
            alt="usdt"
            width={73}
            height={73}
            className="shrink-0 rounded-full object-cover"
          /> */}
          <div>
            <h3 className="text-xs text-white">
              {profileData ? `${profileData.Name} ${profileData.Surname}` : ""}
            </h3>
            {/* <p className="text-gray text-xs font-medium">
              Tech Master in Block line 🤫
            </p> */}
          </div>
        </div>

        <button onClick={() => setOpen(true)}>
          <IoSettingsOutline className="size-6 text-white" />
        </button>

        {/* {pathname === AppRoutes.profile.my_profile && (
          <Link
            href="/profile-settings?tab=personal_info"
            className="hidden md:block"
          >
            <IoSettingsOutline className="size-6 text-white" />
            <Button
              className={clsx(
                "w-fit !rounded-full border !border-blue-shade-1 border-gray-400/40 px-4 font-kanit  text-white opacity-90 md:py-2 md:text-sm [&>span]:text-xs",
              )}
              variant="secondary"
              title="Edit Profile"
            />
          </Link>
        )} */}
      </div>
      <div className="flex w-full items-center justify-between rounded-bl-xl rounded-br-xl bg-primary-dark p-3 md:hidden">
        <Link href={AppRoutes.profile.my_profile}>
          <Button
            className={clsx(
              "w-fit rounded-xl border-transparent bg-transparent  px-2 py-1 !font-nexa text-xs !font-normal capitalize text-white opacity-90 md:px-4 md:py-2 [&>span]:!h-[15px] [&>span]:!font-nexa [&>span]:!font-normal md:[&>span]:text-sm",
              pathname === AppRoutes.profile.my_profile &&
                "border !border-green",
            )}
            variant="secondary"
            title="Profile"
            borderRounded="48px"
          />
        </Link>
        <Link href={AppRoutes.profile.my_invoice}>
          <Button
            className={clsx(
              "w-fit rounded-xl border-transparent bg-transparent px-2  py-1 !font-nexa text-xs !font-normal capitalize text-white opacity-90 md:px-4 md:py-2 [&>span]:!h-[15px] [&>span]:!font-nexa [&>span]:!font-normal md:[&>span]:text-sm",
              pathname === AppRoutes.profile.my_invoice &&
                "border !border-green",
            )}
            variant="secondary"
            title="My Invoice"
          />
        </Link>
        <Link href={AppRoutes.profile.terms}>
          <Button
            className={clsx(
              "w-fit rounded-xl border-transparent bg-transparent px-2  py-1 text-xs capitalize  text-white opacity-90 md:px-4 md:py-2 [&>span]:!h-[15px] [&>span]:!font-nexa [&>span]:!font-normal md:[&>span]:text-sm",
              pathname === AppRoutes.profile.terms && "border !border-green",
            )}
            variant="secondary"
            title="Terms and conditions"
          />
        </Link>
      </div>
      <EditProfileModel open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
