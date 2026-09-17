"use client";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuthStore } from "@/stores/auth.store";

export const HeaderTitleSmallScreen = () => {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  let path = pathname.split("/").pop();
  if (path === "") {
    path = "Dashboard";
  } else if (path?.includes("-")) {
    path = path?.split("-").join(" ");
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
    const index = path.indexOf(" ");
    path =
      path.slice(0, index + 1) +
      path.charAt(index + 1).toUpperCase() +
      path.slice(index + 2);
  } else {
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-kanit text-2xl font-normal md:hidden">
        {user && pathname === "/dashboard" && (
          <>
            <span className="text-gradient">
              Welcome Back, {user?.Name}
            </span>{" "}
            <span className="bg-gradient">👋</span>
          </>
        )}
      </h2>
      <h2
        className={clsx(
          "mb-5 block font-kanit text-2xl font-black uppercase leading-8 text-white sm:mb-6 md:mb-8",
        )}
      >
        {path}
      </h2>
    </div>
  );
};
