import React from "react";
import Image from "next/image";
import {
  AvaialableBalance,
  CompanyMetaAssetIcon,
  DepositeAddressIcon,
  LandRewardIcon,
  MetaAssetsValue,
  USDTIcon,
} from "@/assets/svgs";
import QRCode from "react-qr-code";
import { FiCopy } from "react-icons/fi";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { copyText } from "@/utils/copy-text";
import { DashboardApiResponse } from "@/lib/auth";
import toast from "react-hot-toast";
import { Button } from "../shared";
import dayjs from "dayjs";
import { GetAvailableBalanceResponse } from "@/lib/auth/get-available-balance";

interface Props {
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  onOpen: () => void;
  onOpenWithdrawalModal: () => void;
  onOpenRewardListModal: () => void;
}

const AvailableBalanceActionButtons: React.FC<Props> = ({
  availableBalance,
  onOpenWithdrawalModal,
  onOpenRewardListModal,
  onOpen,
}) => {
  let balanceDisplay: number | string = "N/A";

  if (
    availableBalance?.balance !== undefined &&
    availableBalance?.balance !== null
  ) {
    balanceDisplay = `${Math.abs(availableBalance.balance).toFixed(2)}`;
  } else {
    balanceDisplay = "N/A";
  }
  return (
    <div className="w-full rounded-xl bg-primary-dark p-6  text-white">
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium">Available Balance</p>
            <p className="flex items-center gap-2 text-xl text-green">
              <USDTIcon className="size-6 shrink-0" />
              <span>
                {balanceDisplay}
                <span className="text-xs"> USDT</span>
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 lg:flex-row">
          <Button
            title="Withdraw"
            variant="primary"
            className="w-full lg:!px-6 lg:!py-2"
            onClick={onOpenWithdrawalModal}
          />
          <Button
            title="Reward List"
            variant="outline"
            outlineBG="primary-dark"
            className="w-full lg:!px-6 lg:!py-2"
            onClick={onOpenRewardListModal}
          />
          <Button
            title="Deposit Address"
            variant="underline"
            className="w-full text-xs capitalize lg:!px-6 lg:!py-2"
            onClick={onOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailableBalanceActionButtons;
