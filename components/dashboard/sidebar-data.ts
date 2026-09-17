import {
  Affiliate,
  ChatbotIcon,
  Dashboard,
  Education,
  LeaderBoardIcon,
  Notifications,
  RentalMinersIcon,
} from "@/assets/svgs";
import { AppRoutes } from "@/constants/app-routes";

export interface IconProps {
  className?: string;
}

export type SidebarDataType = {
  title: string;
  link: string;
  icon: React.FC<IconProps>;
};

export const SidebarData: SidebarDataType[] = [
  {
    title: "Dashboard",
    link: AppRoutes.dashboard.index,
    icon: Dashboard,
  },
  {
    title: "Affiliates",
    link: AppRoutes.dashboard.affiliates,
    icon: Affiliate,
  },
  // {
  //   title: "Rental Miners",
  //   link: AppRoutes.dashboard.rental_miners,
  //   icon: RentalMinersIcon,
  // },
  { title: "Chat bot", link: AppRoutes.dashboard.chat_bot, icon: ChatbotIcon },
  { title: "Education", link: AppRoutes.dashboard.education, icon: Education },
  { title: "Leaderboard", link: AppRoutes.dashboard.leaderboard, icon: LeaderBoardIcon },
  { title: "Notifications", link: AppRoutes.dashboard.notifications, icon: Notifications },
  { title: "Rental Miners", link: AppRoutes.dashboard.rental_miners, icon: RentalMinersIcon },
];

export const SidebarDataMobile: SidebarDataType[] = [
  {
    title: "Dashboard",
    link: AppRoutes.dashboard.index,
    icon: Dashboard,
  },
  {
    title: "Affiliates",
    link: AppRoutes.dashboard.affiliates,
    icon: Affiliate,
  },
  { title: "Leaderboard", link: AppRoutes.dashboard.leaderboard, icon: LeaderBoardIcon },
  { title: "Notifications", link: AppRoutes.dashboard.notifications, icon: Notifications },
  { title: "Chat bot", link: AppRoutes.dashboard.chat_bot, icon: ChatbotIcon },
  { title: "Education", link: AppRoutes.dashboard.education, icon: Education },
  { title: "Rental Miners", link: AppRoutes.dashboard.rental_miners, icon: RentalMinersIcon },
];
