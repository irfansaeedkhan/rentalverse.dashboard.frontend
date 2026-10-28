import React from "react";
import dayjs from "dayjs";

import { MetaAssetsDetailsResponse } from "@/lib/auth/get-meta-asset-details";
import { MetaAssetsValue, USDTIcon } from "@/assets/svgs";
import { formatNumber } from "@/utils/format-numbers-dash";
import { Button } from "../shared";

interface Props {
  onOpen: () => void;
  onOpenBuyMetaAssetModal: () => void;
  metaAssetsDetails: MetaAssetsDetailsResponse | null | undefined;
}

const MetaAssetsDetailComponent: React.FC<Props> = ({
  onOpenBuyMetaAssetModal,
  metaAssetsDetails,
}) => {
  function handleBuyMetaClick() {
    onOpenBuyMetaAssetModal();
  }

  if (!metaAssetsDetails) {
    return (
      <div className="w-fullrounded-xl rounded-xl bg-primary-dark px-6 py-8  text-white">
        <div className="">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-shade-1/10">
                  <MetaAssetsValue />
                </div>
                <p className="text-sm text-green  lg:text-lg xl:text-xl">
                  Meta Assets Details
                </p>
              </div>
              <Button
                title="Buy Meta Assets"
                className="hidden w-full max-w-max lg:block  lg:!px-6 lg:!py-2"
                onClick={handleBuyMetaClick}
              />
            </div>

            <Button
              title="Buy Meta Assets"
              className="mt-2 block w-full lg:hidden  lg:!px-6 lg:!py-2"
              onClick={handleBuyMetaClick}
            />
            <div className="h-[2px] w-full bg-gray-shade-1/10"></div>

            <div className="flex w-full flex-col items-center justify-center gap-4 py-4 text-center sm:py-8">
              <h3 className="font-sm font-normal  capitalize text-white">
                No Assets Found
              </h3>
              <p className="max-w-[70ch] text-sm font-normal text-gray">
                It seems that you have not yet purchased any Meta Assets. Each
                office will cost USDT 1,000.00 (one thousand) so if you are
                interested in purchasing one or more Meta Assets remember to top
                up multiples of $1,000 when you make your deposit.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const {
    contract_expiry_date = "N/A",
    contract_start_date = "N/A",
    minted_offices = 0,
    minted_offices_in_usd = 0,
    owned_offices = 0,
    owned_offices_in_usd = 0,
    usdt_earned_last_month = 0,
    usdt_earned_untill_now = 0,
    equity_percentage = 0,
    received_rewards = 0,
  } = metaAssetsDetails;
  return (
    <div className="w-full rounded-xl bg-primary-dark p-6  text-white">
      <div className="">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm ">Meta Assets Details</p>
            </div>
            <Button
              title="Buy Meta Assets"
              className="hidden w-full max-w-max lg:block  lg:!px-6 lg:!py-2"
              onClick={handleBuyMetaClick}
            />
          </div>
          <div className="grid grid-cols-1 gap-7 xxl:grid-cols-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">Owned Offices</p>
              <p className="text-sm text-green">
                {owned_offices}{" "}
                <span className="font-normal">
                  (~ $ {formatNumber(owned_offices_in_usd)})
                </span>
              </p>
            </div>
            {/* <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">Minted Offices</p>
              <p className="text-sm text-green">
                {minted_offices}{" "}
                <span className="font-normal text-green">
                  (~ $ {formatNumber(minted_offices_in_usd)})
                </span>
              </p>
            </div> */}
            {/* <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">Equity Percentage</p>
              <p className="text-sm text-green ">
                {equity_percentage.toFixed(2)}%
              </p>
            </div> */}
            {owned_offices > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-xxs text-white">Position opened on</p>
                <p className="text-sm text-green ">
                  {dayjs(contract_start_date).format("DD MMM YYYY")}
                </p>
              </div>
            )}

            {owned_offices > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-xxs text-white">Position will close on</p>
                <p className="text-sm text-green ">
                  {dayjs(contract_expiry_date).format("DD MMM YYYY")}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">Rewards Received</p>
              <p className="text-sm text-green ">{received_rewards} payments</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">USDT Earned Until Now</p>
              <p className="flex items-center gap-1 text-sm text-green ">
                <USDTIcon className="size-6 shrink-0" />
                <span>{usdt_earned_untill_now} USDT</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xxs text-white">USDT Earned Last Month</p>
              <p className="flex items-center gap-1 text-sm text-green ">
                <USDTIcon className="size-6 shrink-0" />
                <span>{usdt_earned_last_month} USDT</span>
              </p>
            </div>
          </div>
          <Button
            title="Buy Meta Assets"
            className="mt-2 block w-full lg:hidden lg:!px-6 lg:!py-2"
            onClick={handleBuyMetaClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MetaAssetsDetailComponent;
