import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { withdrawCrypto } from "@/lib/auth/withdraw-crypto";
import { Button } from "../shared";
import { BuyMetaAssetDetailResponse } from "@/lib/auth/get-buy-meta-asset-detail";
import { ExclaimationIcon, WithdrawalIcon } from "@/assets/svgs";
import { LuAlertCircle } from "react-icons/lu";
import { CustomNumberInput } from "../shared/custom-number-input";
import ModalContainer from "../shared/modal-container";
import { CreateMetaAssetsDashboard } from "./create-meta-assets-dashboard";
import {
  getDepositAddress,
  GetDepositAddressResponse,
  GetNETWORKTYPE,
} from "@/lib/auth/get-deposit-address";
import { ProfileCopyButton } from "../profile/profile-copy-button";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { copyText } from "@/utils/copy-text";
import { NetworkOption } from "../profile/profile-card-data";
import { NETWORKS } from "@/constants/network";
import Dropdown from "../profile/drop-down";
import { IoIosCloseCircleOutline } from "react-icons/io";
interface Props {
  open: boolean;
  onClose: () => void;
}

export const NotEnoughBalanceModel: React.FC<Props> = ({ open, onClose }) => {
  const [depositAddress, setDepositAddress] =
    useState<GetDepositAddressResponse>();
  const GetDepositAddressData = useCallback(
    async (networkType: GetNETWORKTYPE["networkType"]) => {
      try {
        const res = await getDepositAddress(networkType);
        setDepositAddress(res);
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );
  const handleNetworkSelect = (selectedNetwork: NetworkOption) => {
    GetDepositAddressData(selectedNetwork?.value);
  };
  useEffect(() => {
    GetDepositAddressData("TRX");
  }, [open]);
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
            <IoIosCloseCircleOutline className="size-6 cursor-pointer [&>path]:fill-white" />
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <ExclaimationIcon className="mx-auto size-8 shrink-0 cursor-pointer [&>path]:fill-white" />
            <h3 className="text-gradient pt-2 text-base font-semibold sm:text-xl">
              Opps! you don&apos;t have enough balance
            </h3>
            <p className="pt-1 text-sm font-normal text-white">
              You don&apos;t have enough balance to purchase this office, Please
              deposit first and try again to buy.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 pt-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium tracking-[-0.28px] text-white">
                Network
              </h3>
              <Dropdown
                bgColor="bg-primary"
                items={NETWORKS}
                onSelect={handleNetworkSelect}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <h3 className="text-sm font-medium tracking-[-0.28px] text-white">
                Copy Address
              </h3>
              <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-primary p-3 text-xs">
                <div className="flex w-full flex-col">
                  <input
                    className="w-full cursor-pointer overflow-hidden border-0 bg-transparent text-xs font-medium text-white ring-0 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline focus:ring-0"
                    onClick={() => {
                      copyText(depositAddress?.public_key ?? "");
                      toast.success("Copied to clipboard");
                    }}
                    type="text"
                    value={
                      depositAddress?.public_key
                        ? sliceAccountAddress(depositAddress?.public_key)
                        : "N/A"
                    }
                  />
                </div>
                <ProfileCopyButton
                  value={depositAddress?.public_key ?? "N/A"}
                />
              </div>
              <h6 className="pt-2 text-xxs text-gray sm:text-xs">
                The minimum usable deposit for purchasing assets is 1000 USDT
              </h6>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 p-3">
            <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
            <div className="flex flex-col gap-1">
              <h3 className="pt-1 font-kanit text-xs font-black text-yellow sm:text-sm">
                Pay in current network to this deposit address.
              </h3>
              <p className="text-xxs font-normal text-yellow">
                Paying other than selected network to this deposit may result in
                the loss of your assets and we are not responsible for this.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
