import React from "react";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { Button, TableCell, TableRow } from "../shared";
import { GetRewardListItemResponse } from "@/lib/auth/get-rewards-list";
import { USDTIcon } from "@/assets/svgs";

interface Props {
  rewardListData: GetRewardListItemResponse;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
  totalPages?: number;
}
export const RewardListTable: React.FC<Props> = ({
  rewardListData,
  handleNextPage,
  handlePrevPage,
  page,
  totalPages = 1,
}) => {
  return (
    <div className="px-2">
      <div className="flex w-full flex-col rounded-xl bg-primary-light shadow-3">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <TableRow
                element="th"
                className="!h-11 w-full bg-primary px-6 py-3 text-xs font-medium text-white"
              >
                <TableCell element={"th"}>Date</TableCell>
                <TableCell element={"th"}>Amount</TableCell>
                <TableCell element={"th"}>Type</TableCell>
                <TableCell element={"th"}>From</TableCell>
              </TableRow>
            </thead>
            {rewardListData && rewardListData?.length > 0 && (
              <tbody>
                {rewardListData.map((item, i) => {
                  return (
                    <TableRow
                      element="tb"
                      key={i}
                      className="h-[72px] w-full overflow-x-auto bg-primary-light px-6 py-4 text-sm text-white last:rounded-b-2xl"
                    >
                      <TableCell
                        element={"td"}
                        className="opacity-60 first:rounded-bl-2xl"
                      >
                        {item?.date
                          ? dayjs(item?.date).format("DD MMM YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="flex h-[72px] items-center gap-1"
                      >
                        <USDTIcon className="size-5 shrink-0" />
                        <span className="opacity-60">
                          {item?.amount ? item.amount : "N/A"} USDT
                        </span>
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="opacity-60 last:rounded-br-2xl"
                      >
                        {item?.type ? item.type : "N/A"}
                      </TableCell>
                      <TableCell
                        element={"td"}
                        className="opacity-60 last:rounded-br-2xl"
                      >
                        {item?.from ? item.from : "N/A"}
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
                        className="text-white flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-primary-light px-4 py-2 text-sm disabled:opacity-50"
                      >
                        <HiMiniArrowLeft /> Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={page >= totalPages || totalPages <= 1}
                        className="text-white flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-primary-light px-4 py-2 text-sm disabled:opacity-50"
                      >
                        Next <HiMiniArrowRight />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          {rewardListData?.length === 0 && (
            <div className="w-full p-20 text-center font-kanit font-medium text-white">
              There is no record for now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
