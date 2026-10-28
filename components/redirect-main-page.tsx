"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/app-routes";

export const RedirectMainPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (pathname === "/") {
        router.replace(AppRoutes.dashboard.index);
      }
    }
  }, [pathname, router]);
  // Never render a blank dark screen while the redirect runs: a signed-out
  // first paint used to look like a failed page.
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-primary px-6 text-center text-white">
      <span className="inline-block size-10 animate-spin rounded-full border-4 border-solid border-white border-e-transparent" />
      <p className="text-sm text-white/80">Loading RentalVerse...</p>
    </div>
  );
};
