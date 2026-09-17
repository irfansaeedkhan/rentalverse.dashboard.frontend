import React, { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";

import { AppRoutes } from "@/constants/app-routes";
import { BuyMetaAssetDetailResponse } from "@/lib/auth/get-buy-meta-asset-detail";
import { MetaAssetsDetailsResponse } from "@/lib/auth/get-meta-asset-details";
import { ExclaimationIcon } from "@/assets/svgs";
import { Button } from "../shared";

import { CreateOrderModal } from "./meta-assets/create-order-modal";
import { CustomNumberInput } from "../shared/custom-number-input";
import { CreateOrderUsingCardModal } from "./meta-assets/create-order-using-card-modal";
import { GetAvailableBalanceResponse } from "@/lib/auth/get-available-balance";

interface Props {
  buyMetaAssetDetail: BuyMetaAssetDetailResponse;
  setSuccessPurchase: any;
  mainModelClose: () => void;
  metaAssetsDetails: MetaAssetsDetailsResponse | null | undefined;
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  onOpenNotEnoughBalanceModal: () => void;
}
export const CreateMetaAssetsDashboard: React.FC<Props> = ({
  buyMetaAssetDetail,
  setSuccessPurchase,
  mainModelClose,
  metaAssetsDetails,
  availableBalance,
  onOpenNotEnoughBalanceModal,
}) => {
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);
  const router = useRouter();
  const { available_inventory, duration, price, id, taken_inventory } =
    buyMetaAssetDetail;

  const handleChange = (value: number) => {
    setValue(value);
  };

  // todays day
  const today = new Date();
  const StartDate = dayjs(today).format("DD MMM, YYYY");

  function handleBuyMetaWithBalanceClick() {
    if (
      !availableBalance ||
      availableBalance?.balance === 0 ||
      availableBalance?.balance < price
    ) {
      onOpenNotEnoughBalanceModal();
    } else {
      setOpenModal(true);
    }
  }
  return (
    <div className="col-span-1 flex h-auto w-full flex-col gap-4 rounded-xl bg-primary-light px-2 py-6 md:p-6">
      <div className="flex flex-col items-center justify-between gap-3">
        <h6 className="text-base font-normal text-white sm:text-xl">
          Buy Meta Assets
        </h6>
        <div className="flex h-10 w-full max-w-[160px] items-center justify-between gap-3 rounded-xl bg-primary-dark p-1 px-2">
          <button
            onClick={() => handleChange(value - 1)}
            disabled={value === 0}
          >
            <GrSubtractCircle className="size-6 flex-shrink-0 stroke-white" />
          </button>
          <CustomNumberInput
            className="flex h-8 w-16 items-center justify-center rounded-md bg-transparent text-center text-base font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-shade-1"
            value={value === 0 ? "" : value}
            placeholder="0"
            onChange={(e) => handleChange(+e.target.value)}
          />
          <button onClick={() => handleChange(value + 1)}>
            <GrAddCircle className="size-6 flex-shrink-0 stroke-white" />
          </button>
        </div>
      </div>
      {metaAssetsDetails?.owned_offices ? (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-dark p-4">
          <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
          <h3 className="pt-1 font-kanit text-xs font-normal text-yellow sm:text-sm">
            You already have an opened position, these Meta Assets will be added
            to the cycle of your currently opened position.
          </h3>
        </div>
      ) : null}
      <div className="mt-1 flex h-full flex-col justify-between gap-[14px]">
        <div className="mt-1 flex flex-col gap-[14px]">
          <div className={mainWrap}>
            <h3 className={firstChild}>Start Date</h3>
            <h3 className={secondChild}>{StartDate}</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Duration Lockup</h3>
            <h3 className={secondChild}>{duration} weeks</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Single Pack Cost</h3>
            <h3 className={secondChild}>{price} USDT</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Total Amount</h3>
            <h3 className={secondChild}>{price * value} USDT</h3>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Button
            title="Pay with card"
            disabled={value === 0}
            onClick={() => setOpenCardModal(true)}
            className="w-full text-sm md:text-base"
          />
          <Button
            variant="outline"
            outlineBG="primary-light"
            title="Pay with Balance"
            disabled={value === 0}
            onClick={handleBuyMetaWithBalanceClick}
            className="w-full text-sm md:text-base "
          />
          <Button
            title="Pay with Bank transfer"
            variant="underline-gradient"
            disabled={value === 0}
            onClick={() => router.push(AppRoutes.dashboard.kyc)}
            className="!w-full text-sm md:text-base [&>span]:uppercase"
          />
        </div>
      </div>
      <CreateOrderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        mainModelClose={mainModelClose}
        totalamount={price * value}
        id={id}
        numberOfUnits={value}
        StartDate={StartDate}
        duration={duration}
        setSuccessPurchase={setSuccessPurchase}
        metaAssetsDetails={metaAssetsDetails}
      />
      <CreateOrderUsingCardModal
        open={openCardModal}
        onClose={() => setOpenCardModal(false)}
        mainModelClose={mainModelClose}
        totalamount={price * value}
        singleamount={price * value}
        id={id}
        numberOfUnits={value}
        StartDate={StartDate}
        duration={duration}
        setSuccessPurchase={setSuccessPurchase}
        metaAssetsDetails={metaAssetsDetails}
      />
    </div>
  );
};

const mainWrap = "flex items-center justify-between gap-3";
const firstChild = "text-white text-sm font-medium";
const secondChild = "text-white text-sm font-medium";
