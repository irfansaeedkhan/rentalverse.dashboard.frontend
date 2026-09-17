import React from "react";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { TableCell, TableRow } from "../shared";
import { GetCardTransactionDetailResponse } from "@/lib/auth/get-card-transaction-details";

interface Props {
  cardTransactionDetailList:
    | GetCardTransactionDetailResponse
    | null
    | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
  totalPages?: number;
}
export const CardTransactionTable: React.FC<Props> = ({
  cardTransactionDetailList,
  handleNextPage,
  handlePrevPage,
  page,
  totalPages = 1,
}) => {
  if (!cardTransactionDetailList) {
    return (
      <div className="flex w-full flex-col rounded-xl bg-primary-dark">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto rounded-lg">
            <thead>
              <TableRow
                element="th"
                className="!h-11 w-full bg-primary-light px-6 py-3 text-xs font-medium text-white "
              >
                <TableCell element={"th"}>Bank Circuit</TableCell>
                <TableCell element={"th"}>Date</TableCell>
                <TableCell element={"th"}>Amount</TableCell>
                <TableCell element={"th"}>Currency</TableCell>
                <TableCell element={"th"}>last 4 digits</TableCell>
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
              <TableCell element={"th"}>Bank Circuit</TableCell>
              <TableCell element={"th"}>Date</TableCell>
              <TableCell element={"th"}>Amount</TableCell>
              <TableCell element={"th"}>Currency</TableCell>
              <TableCell element={"th"}>last 4 digits</TableCell>
            </TableRow>
          </thead>
          {cardTransactionDetailList &&
            cardTransactionDetailList?.length > 0 && (
              <tbody>
                {cardTransactionDetailList.map((transactionItem, i) => {
                  const { amount, currency, brand, last4, timestamp } =
                    transactionItem;
                  return (
                    <TableRow
                      element="tb"
                      key={i}
                      className="h-[72px] w-full overflow-x-auto bg-primary-dark px-6 py-4 text-sm text-white"
                    >
                      <TableCell element={"td"}>{brand ?? "N/A"}</TableCell>
                      <TableCell element={"td"}>
                        {timestamp
                          ? dayjs(timestamp * 1000).format("DD MMM YYYY") // Convert to milliseconds
                          : "N/A"}
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="flex h-[72px] min-w-max items-center gap-1"
                      >
                        <span>{amount ?? "N/A"}</span>
                      </TableCell>
                      <TableCell element={"td"}>
                        <span>{currency ?? "N/A"}</span>
                      </TableCell>
                      <TableCell element={"td"}>
                        <span>{last4 ?? "N/A"}</span>
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
        {cardTransactionDetailList?.length === 0 && (
          <div className="w-full p-20 text-center font-kanit font-black capitalize text-white">
            No record found
          </div>
        )}
      </div>
    </div>
  );
};
