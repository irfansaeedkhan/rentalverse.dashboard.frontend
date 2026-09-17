"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Logout } from "@/assets/svgs";
import { SidebarData } from "./sidebar-data";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import toast from "react-hot-toast";
import { AppRoutes } from "@/constants/app-routes";
import { SidebarContext } from "./sidebar-context";
import cn from "@/utils/cn";
import { FaCircleUser } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { getProfileDataApiResponseType } from "../profile/profile-card-data";
import { getProfile } from "@/lib/auth/get-profile";

import { Button } from "../shared";
import MobileMenu from "../mobile-menu";

export const Sidebar = ({ toggle, setToggle }: any) => {
  const [profileData, setProfileData] =
    useState<getProfileDataApiResponseType>();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const { logout } = useAuthStore((state) => state.actions);

  const logoutHandler = async () => {
    try {
      logout();
      toast.success("Logged out successfully");
      router.push(AppRoutes.auth.login);
    } catch (error) {
      router.push(AppRoutes.auth.login);
    }
  };

  const handleClose = () => {
    setToggle(false);
  };

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

  useEffect(() => {
    SidebarData.forEach((item) => {
      router.prefetch(item.link);
    });
    router.prefetch(AppRoutes.profile.my_profile);
    router.prefetch(AppRoutes.profile.my_invoice);
    router.prefetch(AppRoutes.settings.profile_settings);
  }, [router]);

  return (
    <div className="overflow-x-hidden lg:overflow-visible">
      {/* desktop */}
      <div className="hidden h-full items-center justify-center md:flex md:p-[0.625rem]">
        <div className="relative hidden h-full w-full flex-shrink-0 flex-col justify-between rounded-lg bg-primary-light p-[0.625rem] lg:flex  lg:w-[183px]">
          <div className="flex w-full flex-col items-center lg:items-start">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={107}
              height={36}
              className="mx-auto shrink-0 object-cover pt-6"
              onClick={() => router.push(AppRoutes.dashboard.index)}
            />
            <div className="mb-8 mt-6 h-[2px] w-full bg-primary" />
            <div className="w-full">
              <div className="flex flex-col items-center justify-center gap-2 pb-5">
                {/* {true && (
                  <Link href={AppRoutes.profile.my_profile}>
                    <FaCircleUser className="size-16 text-white" />
                    <Image
                      src={"/images/profile-image.png"}
                      alt="usdt"
                      width={73}
                      height={73}
                      className="shrink-0 rounded-full object-cover"
                    />
                  </Link>
                )}
                {false && (
                  <FaCircleUser className="size-16 shrink-0 rounded-full border-2 border-blue-shade-1" />
                )} */}
                <Link href={AppRoutes.profile.my_profile}>
                  <FaCircleUser className="size-16 text-white" />
                </Link>
                <div className="flex flex-col gap-6">
                  {profileData && (
                    <Link
                      href={AppRoutes.profile.my_profile}
                      className="flex min-w-max flex-col items-center gap-px  text-sm font-semibold text-white"
                    >
                      {`${profileData?.Name ?? ""} ${profileData?.Surname ?? ""}`}
                      <span
                        className={clsx(
                          "text-gradient flex-shrink-0 pt-1  text-xs font-medium",
                        )}
                      >
                        View Profile
                      </span>
                    </Link>
                  )}

                  <Button
                    title="logout"
                    className="w-full lg:!py-2"
                    onClick={logoutHandler}
                  />
                </div>
              </div>
            </div>
            <div className="mb-8 mt-10 h-[2px] w-full bg-primary" />
            <div className="flex w-full flex-col gap-10 px-6">
              {SidebarData.map((item) => (
                <Link
                  href={item.link}
                  key={item.link}
                  prefetch
                  className={clsx(
                    "group flex items-center justify-center gap-3 lg:justify-start",
                  )}
                >
                  <item.icon
                    className={clsx(
                      "size-6 flex-shrink-0",
                      pathname === item.link ? "fill-green" : "fill-white",
                    )}
                  />
                  <p
                    className={clsx(
                      "h-[1.125rem] flex-shrink-0 text-sm font-medium  lg:block",
                      pathname === item.link
                        ? "text-green"
                        : "lg:group-hover:cool-link-green text-white",
                    )}
                  >
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MobileMenu
        toggle={toggle}
        handleClose={handleClose}
        logoutHandler={logoutHandler}
        profileData={profileData}
      />
    </div>
  );
};
