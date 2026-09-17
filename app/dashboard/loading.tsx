"use client";

import { CgSpinner } from "react-icons/cg";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center py-16">
      <CgSpinner className="size-10 animate-spin text-white" />
    </div>
  );
}
