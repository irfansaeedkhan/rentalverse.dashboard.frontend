import React from "react";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/shared";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { FaCircleUser } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";
import { LeaderBoardList } from "@/lib/auth/get-leaderboard-list";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";

interface Props {
  leaderboardList: LeaderBoardList;
  isLoading: string;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}

const LeaderboardTable: React.FC<Props> = ({
  leaderboardList,
  isLoading,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  return (
    <div className="flex w-full flex-col rounded-xl border border-gray-shade-4 bg-primary-light shadow-3">
      <div className="flex items-center gap-4 px-6 py-5">
        <span className="text-lg font-medium leading-7 text-white">
          Leaderboard
        </span>
        <span className="flex max-w-max items-center justify-center rounded-xl border border-green-shade-1 bg-green-shade-2 px-2 py-1 text-xs font-medium leading-[10px] text-green-shade-3">
          {leaderboardList && leaderboardList?.LeaderBoard?.length}
          {!leaderboardList?.LeaderBoard?.length && "N/A"}
        </span>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg">
          <thead>
            <TableRow
              element="th"
              className="bg-primary-light-shade-1 !h-11 w-full px-6 py-3 text-xs font-medium text-white opacity-60"
            >
              <TableCell element={"th"}>Position</TableCell>
              <TableCell element={"th"}>User</TableCell>
              <TableCell element={"th"}>Wallet Address</TableCell>
              <TableCell element={"th"}>Score</TableCell>
            </TableRow>
          </thead>
          {leaderboardList && leaderboardList?.LeaderBoard?.length > 0 && (
            <tbody>
              {leaderboardList?.LeaderBoard.map((item, i) => {
                return (
                  <TableRow
                    element="tb"
                    key={i}
                    className="h-[72px] w-full overflow-x-auto bg-primary-light px-6 py-4 text-sm text-white last:rounded-b-2xl"
                  >
                    <TableCell
                      element={"td"}
                      className="font-bold first:rounded-bl-2xl"
                    >
                      {item.Position === 1 ? (
                        <Image
                          src={"/images/first.png"}
                          alt="Position"
                          width={100}
                          height={100}
                          className="size-10"
                        />
                      ) : item.Position === 2 ? (
                        <Image
                          src={"/images/second.png"}
                          alt="Position"
                          width={100}
                          height={100}
                          className="size-10"
                        />
                      ) : item.Position === 3 ? (
                        <Image
                          src={"/images/third.png"}
                          alt="Position"
                          width={100}
                          height={100}
                          className="size-10"
                        />
                      ) : (
                        <div className={positionClass2}>
                          {item.Position ?? "N/A"}
                        </div>
                      )}
                    </TableCell>
                    <TableCell
                      element={"td"}
                      className="flex h-[72px] items-center gap-3"
                    >
                      {item?.ImageProfileUrl && (
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
                      )}

                      <div className="flex flex-col">
                        <span className="min-w-max font-semibold">
                          {item.Username ?? "N/A"}
                        </span>
                        <span className="min-w-max opacity-60">
                          @{item.Username ? item.Username.split(" ")[0] : "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell element={"td"} className="opacity-60">
                      {sliceAccountAddress(item?.WalletAddress)}
                      {!item?.WalletAddress && "N/A"}
                    </TableCell>
                    <TableCell
                      element={"td"}
                      className="opacity-60 last:rounded-br-2xl"
                    >
                      {item?.Score ?? "N/A"}
                    </TableCell>
                  </TableRow>
                );
              })}
              <tr>
                <td colSpan={6}>
                  <div className="mx-auto flex w-full max-w-[20rem] items-center justify-center gap-4 py-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      aria-disabled={page === 1}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-primary-light px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <HiMiniArrowLeft /> Previous
                    </button>
                    <span className="shrink-0 text-xs text-white/60">
                      Page {page} of {leaderboardList?.Number_of_Pages ?? 1}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={
                        !leaderboardList ||
                        page >= (leaderboardList?.Number_of_Pages ?? 1)
                      }
                      aria-disabled={
                        !leaderboardList ||
                        page >= (leaderboardList?.Number_of_Pages ?? 1)
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-primary-light px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next <HiMiniArrowRight />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {!leaderboardList ||
          (isLoading === "rejected" && (
            <div className="w-full p-20 text-center font-kanit font-medium text-white">
              Failed to fetch data
            </div>
          ))}
        {leaderboardList?.LeaderBoard?.length === 0 &&
        isLoading === "resolved" ? (
          <div className="w-full p-20 text-center font-kanit font-medium text-white">
            There is no record for now
          </div>
        ) : isLoading === "idle" || isLoading === "pending" ? (
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur">
            <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-white" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LeaderboardTable;

const positionClass =
  "flex size-10 items-center justify-center rounded-[10px] border border-gray-shade-1/10 bg-primary-light";
const positionClass2 = "flex size-10 items-center justify-center";
