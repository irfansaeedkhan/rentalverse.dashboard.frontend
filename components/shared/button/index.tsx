import React from "react";
import cn from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "tertiary"
    | "underline"
    | "underline-gradient"
    | "pending"
    | "approved";

  IconStart?: React.ReactNode;
  IconEnd?: React.ReactNode;
  borderRounded?: string;
  backgroundColor?: string;
  loaderIcon?: React.ReactNode;
  outlineBG?: string;
}
interface CustomCSSProperties extends React.CSSProperties {
  "--border-rounded": string;
  "--background-color": string;
}
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  className,
  IconStart,
  IconEnd,
  loaderIcon,
  borderRounded = "14px",
  backgroundColor = "#BCE300",
  outlineBG = "primary-dark",
  ...props
}) => {
  const customStyles: CustomCSSProperties = {
    "--border-rounded": borderRounded,
    "--background-color": backgroundColor,
  };

  return (
    <button
      className={cn(
        "relative flex min-w-max cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[0.625rem] uppercase transition duration-200 ease-in-out md:px-4 md:py-3",
        variant === "primary" && "bg-gradient-pattern",
        variant === "outline" && "relative",
        variant === "secondary" &&
          "border border-[#00020A] bg-primary-light shadow-[0px_1px_2px_0px_rgba(16_24_40_0.05)] hover:bg-blue-shade-1 hover:text-white",
        variant === "tertiary" && "bg-blue-shade-1 text-white",
        variant === "underline" && "text-white underline",
        variant === "underline-gradient" && "text-gradient",
        variant === "pending" &&
          "rounded-full border border-red-shade-1 bg-red-shade-3 !px-3 !py-1 !text-xs text-[#FF6565]",
        variant === "approved" &&
          "rounded-full border border-green-shade-1 bg-green-shade-2 !px-3 !py-1 !text-xs text-green-shade-1",
        className && className,
        props.disabled && "cursor-not-allowed opacity-50",
      )}
      {...props}
      style={variant === "primary" ? customStyles : undefined}
      disabled={props.disabled}
    >
      <span className="relative z-10">
        {IconStart && IconStart}
        <span
          className={cn(
            "font-nexablack font-black leading-[normal]",
            variant === "primary" && "text-primary",
            variant === "outline" && "text-gradient", // Gradient text class
            variant === "tertiary" && "text-white",
            variant === "underline-gradient" &&
              `text-gradient gradient-border-bottom`,
          )}
        >
          {loaderIcon ? loaderIcon : title}
        </span>
        {IconEnd && IconEnd}
      </span>

      {variant === "outline" && (
        <>
          {/* Using ::before for gradient border */}
          <span className="absolute inset-0 z-0 w-full rounded-xl bg-gradient-pattern p-px">
            <span
              className={`block bg-${outlineBG} h-full w-full rounded-xl`}
            ></span>
          </span>
        </>
      )}
    </button>
  );
};
