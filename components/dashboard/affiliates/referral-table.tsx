"use client";

import React from "react";
import { CgSpinner } from "react-icons/cg";
import { TableCell, TableRow } from "@/components/shared";
import Image from "next/image";
import {
  AffiliatesListType,
  AffiliateStatus,
} from "@/lib/auth/get-affiliates-list";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { FaCircleUser } from "react-icons/fa6";
import dayjs from "dayjs";
import { formatNumber } from "@/utils/format-numbers-dash";
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

export const ReferralTable: React.FC<Props> = ({
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

  return (
    <div className="flex w-full flex-col rounded-xl bg-primary-dark">
      <div className="flex w-full items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <h2 className="text-base text-white md:text-xl">Referrals</h2>
          {affiliatesList && (
            <TotalNumberField length={totalCount ?? affiliatesList.length} />
          )}
        </div>
        <YearDropdown
          selectedValue={selectedFilter}
          options={optionsData}
          placeholder="All"
          onSelect={onFilterChange}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg">
          <thead className="bg-primary-light">
            <TableRow
              element="th"
              className="bg-primary-light-shade-1 !h-11 w-full px-6 py-3 text-xs font-medium capitalize text-white"
            >
              <TableCell element={"th"}>Name</TableCell>
              <TableCell element={"th"}>Meta Assets</TableCell>
              <TableCell element={"th"}>Assets Value</TableCell>
              <TableCell element={"th"}>Weekly Commission</TableCell>
              <TableCell element={"th"}>Position Opened on</TableCell>
              <TableCell element={"th"}>Position will close on </TableCell>
            </TableRow>
          </thead>
          {affiliatesList &&
            affiliatesList?.length > 0 &&
            isLoading === "resolved" && (
              <tbody>
                {affiliatesList.map((item, i) => {
                  return (
                    <TableRow
                      element="tb"
                      key={i}
                      className="w-full overflow-x-auto px-6 py-4 text-sm font-semibold  text-white last:rounded-b-2xl"
                    >
                      <TableCell
                        element={"td"}
                        className="flex h-[72px] items-center gap-3 last:rounded-br-2xl"
                      >
                        {/* {item?.ImageProfileUrl && (
                        <Image
                          src={item?.ImageProfileUrl ?? "/images/third.png"}
                          alt="usdt"
                          width={100}
                          height={100}
                          className="flex size-10 shrink-0 rounded-full  object-cover"
                        />
                      )}
                      {!item?.ImageProfileUrl && (
                        <FaCircleUser className="size-10 shrink-0" />
                      )} */}
                        <FaCircleUser className="size-10 shrink-0" />

                        <span className="min-w-max font-semibold">
                          {item.name ?? "N/A"}
                        </span>
                      </TableCell>

                      <TableCell element={"td"} className="last:rounded-br-2xl">
                        <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                          {item?.meta_assets_owned ?? "N/A"}
                        </p>
                      </TableCell>
                      <TableCell element={"td"} className="last:rounded-br-2xl">
                        <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
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
                      </TableCell>
                      <TableCell element={"td"} className="last:rounded-br-2xl">
                        <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
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
                      </TableCell>
                      <TableCell element={"td"} className="last:rounded-br-2xl">
                        <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                          {item?.open_position_date
                            ? dayjs(item?.open_position_date).format(
                                "DD MMM, YYYY",
                              )
                            : "N/A"}
                        </p>
                      </TableCell>
                      <TableCell element={"td"} className="last:rounded-br-2xl">
                        <p className="flex items-center gap-1 text-sm font-medium leading-5 text-white">
                          {item?.close_position_date
                            ? dayjs(item?.close_position_date).format(
                                "DD MMM, YYYY",
                              )
                            : "N/A"}
                        </p>
                      </TableCell>
                    </TableRow>
                  );
                })}

                <tr>
                  <td colSpan={6}>
                    <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={page <= 1 || totalPages <= 1}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-primary-light px-4 py-2 text-sm text-white disabled:opacity-50"
                      >
                        <HiMiniArrowLeft /> Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={page >= totalPages || totalPages <= 1}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-primary-light px-4 py-2 text-sm text-white disabled:opacity-50"
                      >
                        Next <HiMiniArrowRight />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
        </table>
        {affiliatesList?.length === 0 && isLoading === "resolved" ? (
          <div className="w-full p-20 text-center font-kanit font-medium text-white">
            You have no affiliates yet
          </div>
        ) : isLoading === "idle" || isLoading === "pending" ? (
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur">
            <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-white" />
          </div>
        ) : null}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};
