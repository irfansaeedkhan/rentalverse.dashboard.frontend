"use client";
import React, { useState } from "react";
import { DepositeAddressModal } from "./deposite-address-modal";
import { WithdrawalModal } from "./withdrawal-modal";
import AvailableBalanceActionButtons from "./available-balance-action-buttons";
import { RewardListlModal } from "./rewardlist-modal";
import { GetRewardListItemResponse } from "@/lib/auth/get-rewards-list";
import { BuyMetaAssetModal } from "./buy-meta-asset-modal";
import MetaAssetsDetailComponent from "./meta-assets-detail-component";
import { MetaAssetsDetailsResponse } from "@/lib/auth/get-meta-asset-details";
import { BuyMetaAssetDetailResponse } from "@/lib/auth/get-buy-meta-asset-detail";
import { GetAvailableBalanceResponse } from "@/lib/auth/get-available-balance";
import { NotEnoughBalanceModel } from "./not-enough-balance-modal";

interface Props {
  rewardListData: GetRewardListItemResponse | null | undefined;
  handleRewardLlistNextPage: () => void;
  handleRewardlistPrevPage: () => void;
  // handleNetworkSelect: (selectedNetwork: NetworkOption) => void;
  rewardListpage: number;
  rewardListTotalPages?: number;
  metaAssetsDetails: MetaAssetsDetailsResponse | null | undefined;
  buyMetaAssetDetail: BuyMetaAssetDetailResponse | null | undefined;
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  setSuccessPurchase: any;
}

const DashboardCards: React.FC<Props> = ({
  rewardListData,
  handleRewardLlistNextPage,
  handleRewardlistPrevPage,
  rewardListpage,
  rewardListTotalPages = 1,
  metaAssetsDetails,
  buyMetaAssetDetail,
  availableBalance,
  setSuccessPurchase,
}) => {
  const [open, setOpen] = useState(false);
  const [openBuyMetaAssetModal, setOpenBuyMetaAssetModal] = useState(false);
  const [openNotEnoughBalanceModal, setOpenNotEnoughBalanceModal] =
    useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);
  const [onOpenRewardListModal, setOnOpenRewardListModal] = useState(false);

  return (
    <>
      <AvailableBalanceActionButtons
        availableBalance={availableBalance}
        onOpenWithdrawalModal={() => setOpenWithdrawalModal(true)}
        onOpenRewardListModal={() => setOnOpenRewardListModal(true)}
        onOpen={() => setOpen(true)}
      />
      <MetaAssetsDetailComponent
        metaAssetsDetails={metaAssetsDetails}
        onOpenBuyMetaAssetModal={() => setOpenBuyMetaAssetModal(true)}
        onOpen={() => setOpen(true)}
      />
      <DepositeAddressModal open={open} onClose={() => setOpen(false)} />
      <WithdrawalModal
        open={openWithdrawalModal}
        availableBalance={availableBalance}
        onClose={() => setOpenWithdrawalModal(false)}
      />
      {!!buyMetaAssetDetail && (
        <BuyMetaAssetModal
          open={openBuyMetaAssetModal}
          setSuccessPurchase={setSuccessPurchase}
          buyMetaAssetDetail={buyMetaAssetDetail}
          metaAssetsDetails={metaAssetsDetails}
          onOpenNotEnoughBalanceModal={() => setOpenNotEnoughBalanceModal(true)}
          availableBalance={availableBalance}
          onClose={() => setOpenBuyMetaAssetModal(false)}
        />
      )}

      <NotEnoughBalanceModel
        open={openNotEnoughBalanceModal}
        onClose={() => setOpenNotEnoughBalanceModal(false)}
      />

      <RewardListlModal
        open={onOpenRewardListModal}
        rewardListData={rewardListData}
        onClose={() => setOnOpenRewardListModal(false)}
        handlePrevPage={handleRewardlistPrevPage}
        handleNextPage={handleRewardLlistNextPage}
        page={rewardListpage}
        totalPages={rewardListTotalPages}
      />
    </>
  );
};

export default DashboardCards;
