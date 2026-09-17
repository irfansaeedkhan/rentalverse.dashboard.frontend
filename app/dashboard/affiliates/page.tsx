"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AffiliatesListType,
  AffiliateStatus,
  getAffiliates,
} from "@/lib/auth/get-affiliates-list";
import { ReferralTable } from "@/components/dashboard/affiliates/referral-table";
import { ReferralTableMobile } from "@/components/dashboard/affiliates/referral-table-mobile";
import { RewardsDetailsResp, getRewardsDetails } from "@/lib/auth/get-rewards";
import { RewardsCard } from "@/components/rewards";
import { DEMO_PAGE_SIZE } from "@/lib/demo-api";

const Affiliates = () => {
  const [affiliatesList, setAffiliatesList] = useState<AffiliatesListType[]>();
  const [refferalRewards, setRefferalRewards] =
    useState<RewardsDetailsResp | null>(null);
  const [isLoading, setIsLoading] = useState("idle");
  const [selectedFilter, setSelectedFilter] = useState<AffiliateStatus>("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getReward = useCallback(async () => {
    try {
      const res = await getRewardsDetails();
      if (!res) return;
      setRefferalRewards(res);
    } catch (error: any) {
      console.error("error", error);
    }
  }, []);

  const getAffiliatesDetails = useCallback(async () => {
    setIsLoading("pending");
    try {
      const res = await getAffiliates(selectedFilter);
      setAffiliatesList(res);
      setTotalPages(Math.max(1, Math.ceil((res?.length ?? 0) / DEMO_PAGE_SIZE)));
      setPage(1);
      setIsLoading("resolved");
    } catch (error) {
      setIsLoading("rejected");
      console.error(error);
    }
  }, [selectedFilter]);

  useEffect(() => {
    getReward();
  }, [getReward]);

  useEffect(() => {
    getAffiliatesDetails();
  }, [getAffiliatesDetails]);

  const pagedAffiliates = useMemo(() => {
    if (!affiliatesList) return affiliatesList;
    const start = (page - 1) * DEMO_PAGE_SIZE;
    return affiliatesList.slice(start, start + DEMO_PAGE_SIZE);
  }, [affiliatesList, page]);

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

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 lg:grid-cols-1">
        <RewardsCard refferalRewards={refferalRewards} />
      </div>
      <div className="hidden lg:block">
        <ReferralTable
          affiliatesList={pagedAffiliates}
          isLoading={isLoading}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
          totalPages={totalPages}
          totalCount={affiliatesList?.length}
        />
      </div>
      <div className="block lg:hidden">
        <ReferralTableMobile
          affiliatesList={pagedAffiliates}
          isLoading={isLoading}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
          totalPages={totalPages}
          totalCount={affiliatesList?.length}
        />
      </div>
    </div>
  );
};

export default Affiliates;
