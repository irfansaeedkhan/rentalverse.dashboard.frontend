"use client";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useOnClickOutside } from "usehooks-ts";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (label: string) => void;
  error?: string;
  placeholder: string;
}

export const YearDropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue = "",
  onSelect,
  error,
  placeholder,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: DropdownOption) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const selectedLabel = selectedOption ? selectedOption.label : "";

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative w-full max-w-[120px] flex-grow" ref={ref}>
      <div
        className={clsx(
          "w-full max-w-[120px] cursor-pointer rounded-md border px-2 py-1 text-sm text-white focus:outline-none",
          isOpen ? "border-blue-shade-1" : "border-gray-shade-1/10",
          error ? "border-red-shade-4" : "",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span
            className={clsx(
              "word-break text-xs md:text-sm",
              selectedLabel === "" && "text-white/20",
            )}
          >
            {selectedLabel === "" ? placeholder : selectedLabel}
          </span>
          {isOpen ? (
            <SlArrowUp className="fill-gray-400 size-3" />
          ) : (
            <SlArrowDown className="fill-gray-400 size-3" />
          )}
        </div>
        {error && <p className="text-red-shade-4 mt-1 text-xs">{error}</p>}
      </div>
      {isOpen && (
        <ul className="absolute z-50 mt-2 flex max-h-[220px] w-full flex-col items-center justify-center overflow-y-auto rounded-md  border bg-primary-dark text-white shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className={clsx(
                "word-break w-full cursor-pointer px-2  py-1 text-xs hover:bg-primary-light",
                option.value === selectedValue ? "bg-primary-dark/80" : "",
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
