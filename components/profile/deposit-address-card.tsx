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

export const DepositAddressCard: React.FC = () => {
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
  }, []);

  return (
    <div className="h-max w-full rounded-xl bg-primary-dark p-6 text-white">
      <h2 className="text-lg tracking-[-0.28px] text-white md:text-xl">
        Deposit Address
      </h2>
      <div className="flex w-full flex-col gap-4 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="pb-[2px] text-xs tracking-[-0.28px] text-white md:text-sm">
            Network
          </h3>
          <Dropdown items={NETWORKS} onSelect={handleNetworkSelect} />
        </div>
        <div className="flex w-full items-start justify-between gap-5 rounded-xl bg-primary-dark pt-5">
          <div className="flex w-1/3 shrink-0 items-center justify-center">
            {depositAddress && (
              <QRCode
                size={160}
                className="h-[120px] w-full max-w-[120px] object-contain sm:h-[160px] sm:max-w-[160px]"
                value={depositAddress?.public_key ?? "N/A"}
                viewBox={`0 0 160 160`}
              />
            )}
          </div>
          <div className="flex h-full w-2/3 flex-col gap-1">
            <div className="flex h-full w-full flex-col items-center justify-between gap-5 rounded-xl bg-primary-light p-3 text-sm">
              <div className="flex w-full flex-col gap-2">
                <h3 className="text-xs tracking-[-0.28px] md:text-sm">
                  Public key
                </h3>
                <input
                  className="w-full cursor-pointer overflow-hidden bg-transparent font-medium text-white transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm"
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
              <div className="self-end">
                <ProfileCopyButton
                  value={depositAddress?.public_key ?? "N/A"}
                />
              </div>
            </div>
            <p className="text-xxs font-normal text-gray">
              The minimum usable deposit for purchasing assets is 1000 USDT
            </p>
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
  );
};
