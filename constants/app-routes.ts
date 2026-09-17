export const AppRoutes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  passwords: {
    forgot_password: "/passwords/forgot-password",
    reset_password: "/passwords/reset-password",
  },
  email: {
    email_sent: "/email-sent",
    varified: "/verify-email",
  },
  dashboard: {
    index: "/dashboard",
    affiliates: "/dashboard/affiliates",
    chat_bot: "/dashboard/chat-bot",
    education: "/dashboard/education",
    notifications: "/dashboard/notifications",
    leaderboard: "/dashboard/leaderboard",
    kyc: "/dashboard/kyc",
    rental_miners: "/dashboard/rental-miners",
  },

  profile: {
    my_profile: "/my-profile",
    my_invoice: "/my-invoice",
    terms: "/terms",
  },
  settings: {
    profile_settings: "/profile-settings",
  },
  privacy_policy: "/privacy-policy",
} as const;
