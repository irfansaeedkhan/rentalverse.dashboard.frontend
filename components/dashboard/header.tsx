"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaCircleUser } from "react-icons/fa6";
import { useAuthStore } from "@/stores/auth.store";
import { AppRoutes } from "@/constants/app-routes";
import { SidebarContext } from "./sidebar-context";
import { FaTimes } from "react-icons/fa";
import { BurgerIcon } from "@/assets/svgs";
import { getProfile } from "@/lib/auth/get-profile";
import { getProfileDataApiResponseType } from "../profile/profile-card-data";
import clsx from "clsx";
import { Button } from "../shared";

export const Header = ({ toggle, setToggle }: any) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const [profileData, setProfileData] =
    useState<getProfileDataApiResponseType>();
  const router = useRouter();
  const { user } = useAuthStore();
  const pathname = usePathname();
  let path = pathname.split("/").pop();
  if (path === "") {
    path = "Dashboard";
  } else if (path?.includes("-")) {
    path = path?.split("-").join(" ");
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
    // also capitalize next word first letter
    const index = path.indexOf(" ");
    path =
      path.slice(0, index + 1) +
      path.charAt(index + 1).toUpperCase() +
      path.slice(index + 2);
  } else {
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
  }

  const handleClick = () => {
    setToggle((prev: any) => !prev);
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

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen: setIsOpen }}>
      <div className="bg-transparent backdrop-blur-sm">
        <div className="flex h-16 w-full items-center justify-between px-4 py-3 pt-6 lg:px-6 ">
          <h2 className="hidden font-kanit text-2xl font-normal md:block">
            {(profileData && pathname === AppRoutes.dashboard.index) ||
              pathname === AppRoutes.dashboard.affiliates ||
              (pathname === AppRoutes.dashboard.rental_miners && (
                <>
                  <span className="text-gradient">
                    Welcome Back, {profileData?.Name}
                  </span>{" "}
                  <span className="bg-gradient">👋</span>
                </>
              ))}

            {(pathname === AppRoutes.profile.my_profile ||
              pathname === AppRoutes.profile.my_invoice ||
              pathname === AppRoutes.profile.terms) && (
              <>
                <span className="text-gradient">
                  Welcome Back, {profileData?.Name}
                </span>{" "}
                <span className="bg-gradient">👋</span>
              </>
            )}
            {pathname === "/dashboard/kyc" && (
              <>
                <span className="text-gradient">
                  Purchase with Bank transfer
                </span>
              </>
            )}
          </h2>
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={107}
            height={36}
            className="flex-shrink-0 object-cover md:hidden"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
          <button className="block md:hidden" onClick={handleClick}>
            <BurgerIcon />
          </button>
          {(pathname === "/my-profile" ||
            pathname === "/my-invoice" ||
            pathname === "/terms") && (
            <div className="hidden items-center justify-between md:flex">
              <div className="flex flex-wrap items-center gap-5">
                <Link href={AppRoutes.profile.my_profile}>
                  <Button
                    className={clsx(
                      "w-fit rounded-xl border-transparent bg-transparent  px-4 !font-nexa text-sm !font-normal capitalize text-white opacity-90 md:py-2 [&>span]:!font-nexa [&>span]:text-sm [&>span]:!font-normal",
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
                      "w-fit rounded-xl border-transparent bg-transparent  px-4 !font-nexa text-sm !font-normal capitalize text-white opacity-90 md:py-2 [&>span]:!font-nexa [&>span]:text-sm [&>span]:!font-normal",
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
                      "w-fit rounded-xl border-transparent bg-transparent  px-4  text-sm  capitalize text-white opacity-90 md:py-2 [&>span]:!font-nexa [&>span]:text-sm [&>span]:!font-normal",
                      pathname === AppRoutes.profile.terms &&
                        "border !border-green",
                    )}
                    variant="secondary"
                    title="Terms and conditions"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
