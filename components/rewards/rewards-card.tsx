"use client";
import React from "react";
import Image from "next/image";

import { ReferralRewardsIcon, USDTIcon } from "@/assets/svgs";
import { RewardsDetailsResp } from "@/lib/auth/get-rewards";
import InfoIconWithTooltip from "../shared/info-icon-tooltip";
import { formatNumber } from "@/utils/format-numbers-dash";

interface Props {
  refferalRewards: RewardsDetailsResp | null;
}

export const RewardsCard: React.FC<Props> = ({ refferalRewards }: Props) => {
  return (
    <div className="flex w-full flex-col justify-between gap-8 rounded-xl bg-primary-dark p-6 text-white md:flex-row">
      <div className="flex-1 md:px-6">
        <h3 className="text-base text-white md:text-xl">Referral Details</h3>
        <p className="pt-1 text-xs text-[#666666] md:text-sm">
          Total Personal Rewards derived from your Referrals
        </p>
      </div>
      <hr className="w-full border border-primary-light md:hidden" />
      <div className="flex flex-1 flex-col gap-[14px] md:px-6">
        <div className={mainWrap}>
          <h3 className={firstChild}>Eligible For Referral Rewards</h3>
          <h3 className={secondChild}>
            <InfoIconWithTooltip text="Referral Rewards will be paid to you only if you have purchased at least one Meta Asset." />
            {refferalRewards?.is_eligable_for_reward ? "Yes" : "No"}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Joined You</h3>
          <h3 className={secondChild}>{refferalRewards?.referrals ?? "N/A"}</h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Meta Assets</h3>
          <h3 className={secondChild}>
            {refferalRewards?.meta_assets !== -1
              ? refferalRewards?.meta_assets
              : "N/A"}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Assets Value</h3>
          <h3 className={secondChild}>
            {refferalRewards?.total_assets_value !== undefined &&
            refferalRewards?.total_assets_value !== null &&
            refferalRewards?.total_assets_value !== -1 ? (
              <span className="flex items-center gap-1">
                <USDTIcon className="size-5 shrink-0" />
                {formatNumber(refferalRewards?.total_assets_value)}
                &nbsp;USDT
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Weekly Percentage</h3>
          <h3 className={secondChild}>
            {refferalRewards?.reward_percentage ?? "N/A"}%
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Weekly Commission</h3>
          <h3 className={secondChild}>
            {refferalRewards?.sales_comission !== undefined &&
            refferalRewards?.sales_comission !== null &&
            refferalRewards?.sales_comission !== -1 ? (
              <span className="flex items-center gap-1">
                <USDTIcon className="size-5 shrink-0" />
                {formatNumber(refferalRewards?.sales_comission)}
                &nbsp;USDT
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Last Month Rewards</h3>
          <h3 className={secondChild}>
            {refferalRewards?.last_month_rewards !== undefined &&
            refferalRewards?.last_month_rewards !== null &&
            refferalRewards?.last_month_rewards !== -1 ? (
              <span className="flex items-center gap-1">
                <USDTIcon className="size-5 shrink-0" />
                {formatNumber(refferalRewards?.last_month_rewards)}
                &nbsp;USDT
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

const mainWrap = "flex items-center justify-between gap-3";
const firstChild = "text-white sm:text-sm text-[13px] font-medium capitalize";
const secondChild =
  "flex items-center gap-1 text-white text-sm font-medium min-w-max";
