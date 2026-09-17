import React from "react";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { DashboardApiResponse } from "@/lib/auth";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { Button, TableCell, TableRow } from "../shared";
import { GetTransactionDetailResponse } from "@/lib/auth/get-transaction-details";
import { USDTIcon } from "@/assets/svgs";

interface Props {
  transactionDetailList: GetTransactionDetailResponse | null | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
  totalPages?: number;
}
export const TransactionTable: React.FC<Props> = ({
  transactionDetailList,
  handleNextPage,
  handlePrevPage,
  page,
  totalPages = 1,
}) => {
  if (!transactionDetailList) {
    return (
      <div className="flex w-full flex-col rounded-xl bg-primary-dark">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto rounded-lg">
            <thead>
              <TableRow
                element="th"
                className="!h-11 w-full bg-primary-light px-6 py-3 text-xs font-medium text-white "
              >
                <TableCell element={"th"}>Type</TableCell>
                <TableCell element={"th"}>Date</TableCell>
                <TableCell element={"th"}>Amount</TableCell>
                <TableCell element={"th"}>Transaction</TableCell>
                <TableCell element={"th"}>Hash</TableCell>
                <TableCell element={"th"}>Status</TableCell>
              </TableRow>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6}>
                  <div className="w-full p-20 text-center font-kanit font-black capitalize text-white">
                    No record found
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col rounded-xl bg-primary-dark">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg">
          <thead>
            <TableRow
              element="th"
              className="bg-primary-light-shade-1 !h-11 w-full bg-primary-light px-6 py-3 text-sm font-normal text-white"
            >
              <TableCell element={"th"}>Type</TableCell>
              <TableCell element={"th"}>Date</TableCell>
              <TableCell element={"th"}>Amount</TableCell>
              <TableCell element={"th"}>Transaction</TableCell>
              <TableCell element={"th"}>Hash</TableCell>
              <TableCell element={"th"}>Status</TableCell>
            </TableRow>
          </thead>
          {transactionDetailList && transactionDetailList?.length > 0 && (
            <tbody>
              {transactionDetailList.map((transactionItem, i) => {
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
                  <TableRow
                    element="tb"
                    key={i}
                    className="h-[72px] w-full overflow-x-auto bg-primary-dark px-6 py-4 text-sm text-white"
                  >
                    <TableCell element={"td"}>{type ?? "N/A"}</TableCell>
                    <TableCell element={"td"}>
                      {updatedAt
                        ? dayjs(updatedAt).format("DD MMM YYYY")
                        : "N/A"}
                    </TableCell>
                    <TableCell
                      element={"td"}
                      className="flex h-[72px] min-w-max items-center gap-1"
                    >
                      <USDTIcon className="size-5 shrink-0" />
                      <span>{value ?? "N/A"} USDT</span>
                    </TableCell>
                    <TableCell element={"td"}>
                      <span>{type === "DEPOSIT" ? "From:" : "To:"}</span>
                      <br />
                      <span>
                        {type === "DEPOSIT"
                          ? sliceAccountAddress(from)
                          : sliceAccountAddress(to)}
                      </span>
                    </TableCell>
                    <TableCell element={"td"}>
                      {hash ? sliceAccountAddress(hash) : "N/A"}
                    </TableCell>
                    <TableCell element={"td"}>
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
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {transactionDetailList?.length === 0 && (
          <div className="w-full p-20 text-center font-kanit font-black capitalize text-white">
            No record found
          </div>
        )}
      </div>
    </div>
  );
};
