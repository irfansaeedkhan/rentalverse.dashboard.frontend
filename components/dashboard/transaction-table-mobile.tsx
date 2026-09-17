import React, { useState } from "react";
import { DashboardApiResponse } from "@/lib/auth";
import { YearDropdown } from "./year-drop-down";
import Image from "next/image";
import dayjs from "dayjs";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { Button } from "../shared";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { GetTransactionDetailResponse } from "@/lib/auth/get-transaction-details";
import { USDTIcon } from "@/assets/svgs";

const optionsData = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "withdraw",
    label: "Withdraw",
  },
  {
    value: "deposit",
    label: "Deposit",
  },
];

interface Props {
  transactionDetailList: GetTransactionDetailResponse | null | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
  totalPages?: number;
}

export const TransactionTableMobile: React.FC<Props> = ({
  transactionDetailList,
  handleNextPage,
  handlePrevPage,
  page,
  totalPages = 1,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("all");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const filteredTransactions =
    transactionDetailList &&
    transactionDetailList.filter((transaction) => {
      if (selectedValue === "all") return true;
      return transaction.type.toLowerCase() === selectedValue;
    });

  return (
    <div className="flex w-full flex-col rounded-xl bg-primary-dark">
      {/* <div className="flex h-16 items-center justify-between gap-5 rounded-t-xl border-b border-black-shade-1/[0.12] bg-primary-light px-6 py-4">
        <YearDropdown
          selectedValue={selectedValue}
          options={optionsData}
          placeholder="All"
          onSelect={(year) => handleValueChange(year)}
        />
      </div> */}

      {transactionDetailList && transactionDetailList.length > 0 ? (
        transactionDetailList.map((transactionItem, index) => {
          const {
            id,
            blockNumber,
            contract,
            createdAt,
            from,
            hash,
            status,
            to,
            type,
            value,
            token,
            updatedAt,
          } = transactionItem;
          return (
            <div
              key={index}
              className="flex w-full flex-col gap-3 border-b border-primary-light bg-primary-dark p-6 last:rounded-b-xl last:border-none"
            >
              <div className={mainDiv}>
                <h6 className={h6}>Type</h6>
                <p className={p}> {type ?? "N/A"}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Date</h6>
                <p className={p}>
                  {updatedAt ? dayjs(updatedAt).format("DD MMM YYYY") : "N/A"}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Amount</h6>
                <p className={p}>
                  <USDTIcon className="size-5 shrink-0" />
                  {value ?? "N/A"} USDT
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>{type === "DEPOSIT" ? "From:" : "To:"}</h6>
                <p className={p}>
                  {type === "DEPOSIT"
                    ? sliceAccountAddress(from)
                    : sliceAccountAddress(to)}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Hash</h6>
                <p className={p}>{hash ? sliceAccountAddress(hash) : "N/A"}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Status</h6>
                {(status === "CONFIRMED" || status === "Approved") && (
                  <span className="text-green">Approved</span>
                )}
                {(status === "PENDING" || status === "Pending") && (
                  <span className="text-[#D80027]">Pending</span>
                )}
                {(status === "REJECTED" || status === "Rejected") && (
                  <span className="text-[#D80027]">Rejected</span>
                )}
                {!status && "N/A"}
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full p-20 text-center font-kanit font-black capitalize text-white">
          No record found
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[90%] items-center justify-center gap-4 py-4">
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
    </div>
  );
};

const mainDiv = "flex w-full items-center justify-between gap-5";
const h6 = "text-sm font-medium text-white leading-[18px]";
const p = "text-sm text-white leading-5 flex items-center gap-1";
