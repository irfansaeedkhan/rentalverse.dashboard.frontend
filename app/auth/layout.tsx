"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { LayoutComponent } from "@/components/auth/layout-component";
import { LogoLink } from "@/components/shared";
import { ArrowDownIcon } from "@/assets/svgs";
import { AppRoutes } from "@/constants/app-routes";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute left-0 top-0 flex h-20 items-center pl-6 lg:pl-12">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={107}
            height={36}
            className="flex-shrink-0 cursor-pointer object-cover"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
        </div>
        <div className="absolute bottom-[-50%] left-[40%] z-0 h-[30vw] w-[40vw] rounded-full bg-[#00A3FF]/30 blur-[150px]"></div>
        <div className="absolute bottom-[-50%] right-[40%] z-0 h-[30vw] w-[40vw] rounded-full bg-[#00FF94]/30 blur-[150px]"></div>
        <div className="flex w-full lg:h-[70dvh] lg:w-[85%]">
          <LayoutComponent />
          <div className="relative z-10 flex w-full flex-col lg:w-1/2">
            <div className="flex h-20 items-center justify-between px-6 sm:px-12 lg:justify-end">
              <div className="--flex hidden items-center gap-2">
                <Image
                  src="/images/british_flag.png"
                  alt="flag"
                  width={33}
                  height={22}
                  className="flex-shrink-0"
                />
                <ArrowDownIcon />
              </div>
            </div>
            <div className="flex h-full items-center justify-center lg:h-[calc(100vh-80px)]">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
