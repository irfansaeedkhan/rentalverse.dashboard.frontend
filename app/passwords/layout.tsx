import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { LogoLink } from "@/components/shared";
import { ArrowDownIcon } from "@/assets/svgs";

export default function AuthLayoutWithoutBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <div className="flex h-20 items-center justify-between px-6 sm:px-12">
            <LogoLink />
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
          <div className="flex h-[calc(100vh-80px)] items-center justify-center">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
