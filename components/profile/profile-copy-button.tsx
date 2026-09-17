"use client";
import React from "react";
import toast from "react-hot-toast";
import { copyText } from "@/utils/copy-text";
import { CopyIcon } from "@/assets/svgs";

interface Props {
  value: string;
}

export const ProfileCopyButton: React.FC<Props> = ({ value }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        copyText(value);
        toast.success("Copied to clipboard");
      }}
    >
      <CopyIcon className="size-6 shrink-0 cursor-pointer stroke-white hover:stroke-green" />
    </button>
  );
};
