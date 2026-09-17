"use client";

import React, { useState } from "react";
import { Header, Sidebar } from "@/components/dashboard";
import { HeaderTitleSmallScreen } from "@/components/dashboard/header-title-small-screen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggle, SetToggle] = useState(false);
  return (
    <>
      <div className="relative top-0 mx-auto flex h-auto min-h-dvh max-w-[1310px]">
        <Sidebar toggle={toggle} setToggle={SetToggle} />
        {/* <FloatingMenue /> */}
        <div className="flex w-full flex-col bg-primary">
          <Header toggle={toggle} setToggle={SetToggle} />
          <div className="max-h-[calc(100vh-64px)] w-full overflow-y-auto pb-20 md:pb-0 md:pt-6">
            <div className="mx-auto w-full max-w-[1096px] px-4 py-6 sm:px-6 sm:pt-0">
              <HeaderTitleSmallScreen />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
