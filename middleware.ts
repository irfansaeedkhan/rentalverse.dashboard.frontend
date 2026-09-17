import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  changePaths,
  checkMatch,
  isAuthenticated,
} from "@/utils/middleware-helpers";
import { AppRoutes } from "@/constants/app-routes";

export async function middleware(request: NextRequest) {
  if (checkMatch(request.nextUrl, publicOrAuthenticatedPages)) {
    return NextResponse.next();
  }

  if (checkMatch(request.nextUrl, notReadyPages)) {
    if (
      process.env.NEXT_PUBLIC_APP_ENV === "production" ||
      process.env.NEXT_PUBLIC_APP_ENV === "staging"
    ) {
      const url = request.nextUrl.clone();
      url.pathname = AppRoutes.dashboard.index;
      return NextResponse.redirect(url);
    }
  }

  if (checkMatch(request.nextUrl, onlyPublicPages)) {
    return NextResponse.next();
    // Public page no need for authentication so redirecting to requested url
    // if (await isAuthenticated(request)) {
    //   return NextResponse.redirect(
    //     `${request.nextUrl.origin}${AppRoutes.dashboard.index}`,
    //   );
    // } else {
    //   return NextResponse.next();
    // }
  }

  if (checkMatch(request.nextUrl, authenticatedUserPages)) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}${AppRoutes.auth.login}`,
      );
    } else {
      return NextResponse.next();
    }
  }

  // Last step: return the request to Next.js
  return NextResponse.next();
}

// Only Public Pages - logged in user can not access these pages
const _onlyPublicPages: string[] = [
  AppRoutes.auth.login,
  AppRoutes.auth.register,
  AppRoutes.passwords.forgot_password,
  AppRoutes.passwords.reset_password,
  AppRoutes.email.email_sent,
  AppRoutes.email.varified,
];
const onlyPublicPages = changePaths(_onlyPublicPages);

// Public or Authenticated Pages
const _publicOrAuthenticatedPages: string[] = [];
const publicOrAuthenticatedPages = changePaths(_publicOrAuthenticatedPages);

// Authenticated pages
const _authenticatedUserPages: string[] = [
  AppRoutes.dashboard.index,
  AppRoutes.dashboard.affiliates,
  AppRoutes.dashboard.chat_bot,
  AppRoutes.dashboard.education,
  AppRoutes.dashboard.notifications,
  AppRoutes.dashboard.leaderboard,
  AppRoutes.dashboard.kyc,
  AppRoutes.dashboard.rental_miners,
  AppRoutes.profile.my_profile,
  AppRoutes.profile.my_invoice,
  AppRoutes.profile.terms,
  AppRoutes.settings.profile_settings,
];
const authenticatedUserPages = changePaths(_authenticatedUserPages);

// Coming soon pages - redirect to dashboard (empty in demo so nav pages stay reachable)
const _notReadyPages: string[] = [];
const notReadyPages = changePaths(_notReadyPages);
