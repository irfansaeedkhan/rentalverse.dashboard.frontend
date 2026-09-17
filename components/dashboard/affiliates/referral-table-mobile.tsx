"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { TableDataAffiliate } from ".";
import { CgSpinner } from "react-icons/cg";
import {
  AffiliatesListType,
  AffiliateStatus,
} from "@/lib/auth/get-affiliates-list";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { FaCircleUser } from "react-icons/fa6";
import { formatNumber } from "@/utils/format-numbers-dash";
import dayjs from "dayjs";
import TotalNumberField from "@/components/shared/total-number-field";
import { USDTIcon } from "@/assets/svgs";
import { YearDropdown } from "../year-drop-down";

interface Props {
  affiliatesList: AffiliatesListType[] | undefined | null;
  isLoading: string;
  selectedFilter: AffiliateStatus;
  onFilterChange: any;
  handlePrevPage?: () => void;
  handleNextPage?: () => void;
  page?: number;
  totalPages?: number;
  totalCount?: number;
}

const optionsData = [
  { value: "ALL", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];
export const ReferralTableMobile: React.FC<Props> = ({
  affiliatesList,
  isLoading,
  selectedFilter,
  onFilterChange,
  handleNextPage = () => undefined,
  handlePrevPage = () => undefined,
  page = 1,
  totalPages = 1,
  totalCount,
}) => {
  const tableSectionRef = useRef<HTMLDivElement>(null);

  // Conditionally scroll to the table section only when changing to Active or Inactive filters
  useEffect(() => {
    if (selectedFilter !== "ALL" && tableSectionRef.current) {
      tableSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedFilter]);
  return (
    <div
      ref={tableSectionRef}
      className="flex w-full flex-col rounded-xl bg-primary"
    >
      <div className="mb-4 flex h-16 items-center justify-between gap-5 rounded-xl bg-primary-light px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-lg leading-7 text-white">Referrals</span>
          {affiliatesList && (
            <TotalNumberField
              bgColor="bg-primary-light"
              length={totalCount ?? affiliatesList.length}
            />
          )}
        </div>

        <YearDropdown
          selectedValue={selectedFilter}
          options={optionsData}
          placeholder="All"
          onSelect={onFilterChange}
        />
      </div>
      {/* {(affiliatesList?.length === 0 || !affiliatesList) && (
        <div className="w-full bg-primary-light px-6 last:rounded-b-2xl">
          <h1 className="py-10 text-center text-sm font-medium text-white">
            No data found
          </h1>
        </div>
      )} */}
      {affiliatesList &&
      affiliatesList?.length > 0 &&
      isLoading === "resolved" ? (
        <>
          {affiliatesList.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex w-full flex-col gap-3 rounded-xl border-none border-black-shade-1/[0.12] bg-primary-dark p-6 last:mb-0"
            >
              <div className="flex flex-col items-center justify-center gap-2 pb-5">
                {/* {item?.ImageProfileUrl && (
                  <Image
                    src={item?.ImageProfileUrl ?? "/images/third.png"}
                    alt="usdt"
                    width={40}
                    height={40}
                    className="flex size-10 shrink-0 rounded-full border-2 border-blue-shade-1 object-cover"
                  />
                )} */}
                {/* {!item?.ImageProfileUrl && (
                  <FaCircleUser className="size-10 shrink-0 rounded-full border-2 border-blue-shade-1" />
                )} */}
                <FaCircleUser className="size-14 shrink-0 text-white" />

                <div className="flex flex-col">
                  <h5 className="min-w-max text-base font-semibold text-white">
                    {item.name ?? "N/A"}
                  </h5>
                </div>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Meta Assets</h6>
                <p className={p}>{item?.meta_assets_owned ?? "N/A"}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Assets Value</h6>
                <p className={p}>
                  {item?.asset_value !== undefined &&
                  item?.asset_value !== null &&
                  item?.asset_value !== -1 ? (
                    <span className="flex items-center gap-1">
                      <USDTIcon className="size-5 shrink-0" />
                      {formatNumber(item?.asset_value)}
                      &nbsp;USDT
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Weekly Commission</h6>
                <p className={p}>
                  {" "}
                  {item?.weekly_comission !== undefined &&
                  item?.weekly_comission !== null &&
                  item?.weekly_comission !== -1 ? (
                    <span className="flex items-center gap-1">
                      <USDTIcon className="size-5 shrink-0" />
                      {formatNumber(item?.weekly_comission)}
                      &nbsp;USDT
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Position Opened on</h6>
                <p className={p}>
                  {item?.open_position_date
                    ? dayjs(item?.open_position_date).format("DD MMM, YYYY")
                    : "N/A"}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Position will close on</h6>
                <p className={p}>
                  {item?.close_position_date
                    ? dayjs(item?.close_position_date).format("DD MMM, YYYY")
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
          <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
            <button
              onClick={handlePrevPage}
              disabled={page <= 1 || totalPages <= 1}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-primary-light px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              <HiMiniArrowLeft /> Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages || totalPages <= 1}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-primary-light px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              Next <HiMiniArrowRight />
            </button>
          </div>
        </>
      ) : affiliatesList?.length === 0 && isLoading === "resolved" ? (
        <div className="w-full p-20 text-center font-kanit font-medium text-white">
          No Affiliates Found
        </div>
      ) : isLoading === "idle" || isLoading === "pending" ? (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur">
          <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-white" />
        </div>
      ) : null}
    </div>
  );
};

const mainDiv = "flex w-full items-center justify-between gap-5";
const h6 = "text-sm font-medium text-white leading-[18px] capitalize";
const p = "text-sm text-white leading-5 flex items-center gap-1";
