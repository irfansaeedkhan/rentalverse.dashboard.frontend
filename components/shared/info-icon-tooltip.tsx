import cn from "@/utils/cn";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const InfoIconWithTooltip: React.FC<{ text: string; color?: string }> = ({
  text,
  color = "#00A3FF",
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative z-10 inline-block">
      {/* <FaInfoCircle
        className="size-4 cursor-pointer text-blue-500"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
      /> */}
      <HiOutlineExclamationCircle
        className={cn(`size-5 shrink-0 cursor-pointer text-[${color}]`)}
        style={{ color }}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
      />
      {isTooltipVisible && (
        <div className="absolute right-0 mt-2 w-[37ch] rounded border border-[#00A3FF] bg-primary-light px-3 py-2 text-xxs text-white shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoIconWithTooltip;
