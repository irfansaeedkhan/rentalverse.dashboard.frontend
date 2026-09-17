import React from "react";
import { BuyMetaAssetDetailResponse } from "@/lib/auth/get-buy-meta-asset-detail";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ModalContainer from "../shared/modal-container";
import { CreateMetaAssetsDashboard } from "./create-meta-assets-dashboard";
import { MetaAssetsDetailsResponse } from "@/lib/auth/get-meta-asset-details";
import { GetAvailableBalanceResponse } from "@/lib/auth/get-available-balance";

interface Props {
  open: boolean;
  onClose: () => void;
  buyMetaAssetDetail: BuyMetaAssetDetailResponse;
  metaAssetsDetails: MetaAssetsDetailsResponse | null | undefined;
  setSuccessPurchase: any;
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  onOpenNotEnoughBalanceModal: () => void;
}

export const BuyMetaAssetModal: React.FC<Props> = ({
  open,
  onClose,
  buyMetaAssetDetail,
  setSuccessPurchase,
  metaAssetsDetails,
  availableBalance,
  onOpenNotEnoughBalanceModal,
}) => {
  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl sm:max-w-[566px] max-w-[343px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white sm:text-xl">
              Buy Meta Assets
            </h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        {buyMetaAssetDetail && (
          <CreateMetaAssetsDashboard
            setSuccessPurchase={setSuccessPurchase}
            buyMetaAssetDetail={buyMetaAssetDetail}
            metaAssetsDetails={metaAssetsDetails}
            availableBalance={availableBalance}
            onOpenNotEnoughBalanceModal={onOpenNotEnoughBalanceModal}
            mainModelClose={onClose}
          />
        )}
      </div>
    </ModalContainer>
  );
};
