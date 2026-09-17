import cn from "@/utils/cn";
import React from "react";

const TotalNumberField = ({
  length,
  bgColor = "bg-primary-dark",
}: {
  length: number;
  bgColor?: string;
}) => {
  if (!length) {
    return (
      <span className="relative inline-block rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00A3FF] p-[2px]">
        <span
          className={cn(
            `flex h-full w-full items-center justify-center rounded-xl bg-black text-xs text-green`,
            bgColor,
          )}
        >
          <div className="px-2 leading-[1.063rem]"> N/A </div>
        </span>
      </span>
    );
  }
  return (
    <span className="relative inline-block rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00A3FF] p-[2px]">
      <span
        className={cn(
          `flex h-full w-full items-center justify-center rounded-xl bg-black px-2 py-1 text-green`,
          bgColor,
        )}
      >
        <h6 className=" flex h-3 items-center justify-center text-xs leading-[normal]">
          {length}
        </h6>
      </span>
    </span>
  );
};

export default TotalNumberField;
