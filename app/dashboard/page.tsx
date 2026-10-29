"use client";
import React, { useCallback, useEffect, useMemo, useState, Suspense, lazy, useRef } from "react";
import { TransactionTable } from "@/components/dashboard";
import { CgSpinner } from "react-icons/cg";

import { TransactionTableMobile } from "@/components/dashboard/transaction-table-mobile";

import {
  getMetaAssetsDetails,
  MetaAssetsDetailsResponse,
} from "@/lib/auth/get-meta-asset-details";
import {
  BuyMetaAssetDetailResponse,
  getBuyMetaAssetDetail,
} from "@/lib/auth/get-buy-meta-asset-detail";
import {
  getTransactionDetail,
  GetTransactionDetailResponse,
} from "@/lib/auth/get-transaction-details";
import {
  getAvailableBalance,
  GetAvailableBalanceResponse,
} from "@/lib/auth/get-available-balance";

import {
  getShowRewardListDetails,
  GetRewardListItemResponse,
} from "@/lib/auth/get-rewards-list";
import {
  getCardTransactionDetail,
  GetCardTransactionDetailResponse,
} from "@/lib/auth/get-card-transaction-details";
import { CardTransactionTable } from "@/components/dashboard/card-transaction-table";
import { CardTransactionTableMobile } from "@/components/dashboard/card-transaction-table-mobile";
import { DEMO_PAGE_SIZE } from "@/lib/demo-api";
import dynamic from "next/dynamic";

const DashboardLazyCards = lazy(
  () => import("../../components/dashboard/dashboard-cards"),
);

const RevenueGraph = dynamic(() => import("@/components/dashboard/graph"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center rounded-xl bg-primary-dark">
      <CgSpinner className="size-8 animate-spin text-white" />
    </div>
  ),
});

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const hasLoadedOnceRef = useRef(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cardPage, setCardPage] = useState(1);
  const [cardTotalPages, setCardTotalPages] = useState(1);
  const [rewardListpage, setRewardListPage] = useState(1);
  const [rewardListTotalPages, setRewardListTotalPages] = useState(1);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleCardNextPage = () => {
    if (cardPage < cardTotalPages) {
      setCardPage((prevPage) => prevPage + 1);
    }
  };

  const handleCardPrevPage = () => {
    if (cardPage > 1) {
      setCardPage((prevPage) => prevPage - 1);
    }
  };

  const handleRewardLlistNextPage = () => {
    if (rewardListpage < rewardListTotalPages) {
      setRewardListPage((prevPage) => prevPage + 1);
    }
  };

  const handleRewardlistPrevPage = () => {
    if (rewardListpage > 1) {
      setRewardListPage((prevPage) => prevPage - 1);
    }
  };

  const [successPurchase, setSuccessPurchase] = useState<boolean>(false);
  const [metaAssetsDetails, setMetaAssetsDetails] =
    useState<MetaAssetsDetailsResponse>();
  const [buyMetaAssetDetail, setBuyMetaAssetDetail] =
    useState<BuyMetaAssetDetailResponse>();
  const [transactionDetailList, setTransactionDetailList] =
    useState<GetTransactionDetailResponse>();
  const [cardTransactionDetailList, setCardTransactionDetailList] =
    useState<GetCardTransactionDetailResponse>();
  const [availableBalance, setAvailableBalance] =
    useState<GetAvailableBalanceResponse>();
  const [rewardList, setRewardList] = useState<GetRewardListItemResponse>();
  const [selectedTransactionTab, setSelectedTransactionTab] =
    useState<string>("balance");

  const GetMetaAssetsDetails = useCallback(async () => {
    try {
      const res = await getMetaAssetsDetails();
      setMetaAssetsDetails(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetBuyMetaAssetDetail = useCallback(async () => {
    try {
      const res = await getBuyMetaAssetDetail();
      setBuyMetaAssetDetail(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetTransactionDetail = useCallback(async () => {
    try {
      const res = await getTransactionDetail();
      setTransactionDetailList(res);
      setTotalPages(Math.max(1, Math.ceil((res?.length ?? 0) / DEMO_PAGE_SIZE)));
      setPage(1);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetCardTransactionDetail = useCallback(async () => {
    try {
      const res = await getCardTransactionDetail();
      setCardTransactionDetailList(res);
      setCardTotalPages(
        Math.max(1, Math.ceil((res?.length ?? 0) / DEMO_PAGE_SIZE)),
      );
      setCardPage(1);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetBalanceData = useCallback(async () => {
    try {
      const res = await getAvailableBalance();
      setAvailableBalance(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetRewardsListDetails = useCallback(async () => {
    try {
      const res = await getShowRewardListDetails();
      setRewardList(res);
      setRewardListTotalPages(
        Math.max(1, Math.ceil((res?.length ?? 0) / DEMO_PAGE_SIZE)),
      );
      setRewardListPage(1);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetAllData = useCallback(async () => {
    if (!hasLoadedOnceRef.current) {
      setLoading(true);
    }
    try {
      await Promise.allSettled([
        GetBalanceData(),
        GetMetaAssetsDetails(),
        GetBuyMetaAssetDetail(),
        GetTransactionDetail(),
        GetCardTransactionDetail(),
        GetRewardsListDetails(),
      ]);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
      hasLoadedOnceRef.current = true;
      setHasLoadedOnce(true);
    }
  }, [
    GetBalanceData,
    GetMetaAssetsDetails,
    GetBuyMetaAssetDetail,
    GetTransactionDetail,
    GetCardTransactionDetail,
    GetRewardsListDetails,
  ]);

  useEffect(() => {
    GetAllData();
  }, [GetAllData]);

  useEffect(() => {
    if (!successPurchase) return;
    GetMetaAssetsDetails();
    GetCardTransactionDetail();
    setSuccessPurchase(false);
  }, [successPurchase, GetMetaAssetsDetails, GetCardTransactionDetail]);

  const pagedTransactions = useMemo(() => {
    if (!transactionDetailList) return transactionDetailList;
    const start = (page - 1) * DEMO_PAGE_SIZE;
    return transactionDetailList.slice(start, start + DEMO_PAGE_SIZE);
  }, [transactionDetailList, page]);

  const pagedCardTransactions = useMemo(() => {
    if (!cardTransactionDetailList) return cardTransactionDetailList;
    const start = (cardPage - 1) * DEMO_PAGE_SIZE;
    return cardTransactionDetailList.slice(start, start + DEMO_PAGE_SIZE);
  }, [cardTransactionDetailList, cardPage]);

  const pagedRewardList = useMemo(() => {
    if (!rewardList) return rewardList;
    const start = (rewardListpage - 1) * DEMO_PAGE_SIZE;
    return rewardList.slice(start, start + DEMO_PAGE_SIZE);
  }, [rewardList, rewardListpage]);

  return (
    <div className="flex flex-col gap-4">
      <Suspense
        fallback={
          <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
            <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-white" />
          </div>
        }
      >
        <DashboardLazyCards
          availableBalance={availableBalance}
          metaAssetsDetails={metaAssetsDetails}
          buyMetaAssetDetail={buyMetaAssetDetail}
          rewardListData={pagedRewardList}
          rewardListTotalCount={rewardList?.length}
          handleRewardLlistNextPage={handleRewardLlistNextPage}
          handleRewardlistPrevPage={handleRewardlistPrevPage}
          rewardListpage={rewardListpage}
          rewardListTotalPages={rewardListTotalPages}
          setSuccessPurchase={setSuccessPurchase}
        />
      </Suspense>

      <RevenueGraph />

      <div className="flex w-full flex-col rounded-xl bg-primary-dark">
        <div className="flex flex-col items-start gap-4 px-6 py-5">
          <span className="text-base font-normal leading-7 text-white md:text-xl">
            Transaction History
          </span>
          <div className="flex items-center gap-4">
            <button
              className={`${
                selectedTransactionTab === "balance"
                  ? "text-white"
                  : "text-white/50"
              } flex items-center gap-2`}
              onClick={() => setSelectedTransactionTab("balance")}
            >
              <span className="text-sm font-medium leading-7">Balance</span>
            </button>
            <button
              className={`${
                selectedTransactionTab === "card"
                  ? "text-white"
                  : "text-white/50"
              } flex items-center gap-2`}
              onClick={() => setSelectedTransactionTab("card")}
            >
              <span className="text-sm font-medium leading-7">Card</span>
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          {selectedTransactionTab === "balance" && (
            <div className="w-full">
              <div className="hidden lg:block">
                <TransactionTable
                  transactionDetailList={pagedTransactions}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  page={page}
                  totalPages={totalPages}
                />
              </div>
              <div className="block lg:hidden">
                <TransactionTableMobile
                  transactionDetailList={pagedTransactions}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  page={page}
                  totalPages={totalPages}
                />
              </div>
            </div>
          )}

          {selectedTransactionTab === "card" && (
            <div className="w-full">
              <div className="hidden lg:block">
                <CardTransactionTable
                  cardTransactionDetailList={pagedCardTransactions}
                  handlePrevPage={handleCardPrevPage}
                  handleNextPage={handleCardNextPage}
                  page={cardPage}
                  totalPages={cardTotalPages}
                />
              </div>
              <div className="block lg:hidden">
                <CardTransactionTableMobile
                  cardTransactionDetailList={pagedCardTransactions}
                  handlePrevPage={handleCardPrevPage}
                  handleNextPage={handleCardNextPage}
                  page={cardPage}
                  totalPages={cardTotalPages}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        {loading && !hasLoadedOnce && (
          <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
            <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
