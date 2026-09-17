import React, { useCallback, useEffect, useState } from "react";
import { ProfileCopyButton } from "./profile-copy-button";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";
import Dropdown from "./drop-down";
import QRCode from "react-qr-code";
import { NetworkOption } from "./profile-card-data";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { NETWORKS } from "@/constants/network";
import {
  getDepositAddress,
  GetDepositAddressResponse,
  GetNETWORKTYPE,
} from "@/lib/auth/get-deposit-address";
import { LuAlertCircle } from "react-icons/lu";
import { ExclaimationIcon } from "@/assets/svgs";

export const DepositAddressMobileCard: React.FC = () => {
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
  }, [GetDepositAddressData]);
  return (
    <div className="col-span-1 flex w-full flex-col gap-5 rounded-3xl bg-primary-dark p-6">
      <h2 className="text-lg tracking-[-0.28px] text-white md:text-xl">
        Deposit Address
      </h2>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs tracking-[-0.28px] text-white md:text-sm">
            Network
          </h3>
          <Dropdown items={NETWORKS} onSelect={handleNetworkSelect} />
        </div>
        <div className="bg-primary-light-shade-1 flex w-full items-center justify-between gap-3 rounded-xl bg-primary-light p-3">
          {depositAddress?.public_key && (
            <QRCode
              size={60}
              className="h-[60px] w-full max-w-[60px] object-contain sm:h-[60px] sm:max-w-[60px]"
              value={depositAddress?.public_key ?? "N/A"}
              viewBox={`0 0 338 338`}
            />
          )}

          <div className="flex w-full items-center justify-between gap-3 text-sm">
            <div className="flex w-full flex-col">
              <h3 className="text-xs tracking-[-0.28px] text-white md:text-sm">
                Public key
              </h3>
              <input
                className="w-full cursor-pointer overflow-hidden truncate bg-transparent font-medium text-white transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm"
                onClick={() => {
                  copyText(depositAddress?.public_key ?? "N/A");
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
            <ProfileCopyButton value={depositAddress?.public_key ?? "N/A"} />
          </div>
        </div>
        <p className="text-xxs font-normal text-gray">
          The minimum usable deposit for purchasing assets is 1000 USDT
        </p>
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
  );
};
