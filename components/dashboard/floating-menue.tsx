"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SidebarDataMobile } from "./sidebar-data";

export const FloatingMenue = () => {
  const pathname = usePathname();
  return (
    <div className="absolute bottom-5 left-1/2 z-[1000] mx-auto flex h-[72px] w-full max-w-[370px] -translate-x-1/2 transform items-center justify-between rounded-[20px] bg-blue-shade-1/50 p-3 backdrop-blur-[8px] backdrop-filter lg:hidden">
      {SidebarDataMobile.map((item) => (
        <Link
          href={item.link}
          key={item.link}
          className={clsx(
            "group flex items-center justify-center gap-4 rounded-xl px-[22px] py-[14px] lg:justify-start lg:px-6 lg:py-4",
            pathname === item.link ? "bg-blue-shade-1" : "bg-transparent",
          )}
        >
          <item.icon
            className={clsx(
              "size-5 flex-shrink-0",
              pathname === item.link ? "fill-white" : "fill-black-shade-2",
            )}
          />
        </Link>
      ))}
    </div>
  );
};
