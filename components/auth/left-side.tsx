"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/app-routes";

interface Props {
  page_name: "login" | "register";
}

const LeftSide: React.FC<Props> = ({ page_name }) => {
  const router = useRouter();
  let imageSource =
    page_name === "login" ? "/images/login.png" : "/images/register.png";
  return (
    <Image
      src={imageSource}
      alt="flag"
      width={555}
      height={491}
      className="flex-shrink-0"
    />
  );
};

export default LeftSide;
