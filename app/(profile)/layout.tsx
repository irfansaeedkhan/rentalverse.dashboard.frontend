"use client";

import React, { useState } from "react";
import { Header, Sidebar } from "@/components/dashboard";
import { HeaderTitleSmallScreen } from "@/components/dashboard/header-title-small-screen";
import { FloatingMenue } from "@/components/dashboard/floating-menue";
import { ProfileCommonTop } from "@/components/profile";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggle, SetToggle] = useState(false);
  const pathname = usePathname();
  return (
    <div className="relative mx-auto flex h-auto min-h-dvh max-w-[1310px] ">
      <Sidebar toggle={toggle} setToggle={SetToggle} />
      {/* <FloatingMenue /> */}
      <div className="flex w-full flex-col bg-primary">
        <Header toggle={toggle} setToggle={SetToggle} />
        <div className="max-h-[calc(100vh-64px)] w-full overflow-y-auto pb-20 md:pb-0 md:pt-6">
          {(pathname === "/my-profile" || pathname === "/my-invoice") && (
            <>
              <div className="px-4 md:px-10">
                <HeaderTitleSmallScreen />
              </div>

              <ProfileCommonTop />
            </>
          )}

          <div className="mx-auto w-full max-w-[1081px] p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
