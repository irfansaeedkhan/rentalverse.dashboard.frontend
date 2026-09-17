import React, { useCallback, useEffect, useState } from "react";
import ModalContainer from "../shared/modal-container";
import { CopyIcon, DepositIcon, ExclaimationIcon } from "@/assets/svgs";
import { IoClose } from "react-icons/io5";
import QRCode from "react-qr-code";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { Button } from "../shared";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";
import {
  getDepositAddress,
  GetDepositAddressResponse,
  GetNETWORKTYPE,
} from "@/lib/auth/get-deposit-address";
import { NetworkOption } from "../profile/profile-card-data";
import Dropdown from "../profile/drop-down";
import { NETWORKS } from "@/constants/network";
import { ProfileCopyButton } from "../profile/profile-copy-button";
import { LuAlertCircle } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
interface Props {
  open: boolean;
  onClose: () => void;
}

export const DepositeAddressModal: React.FC<Props> = ({ open, onClose }) => {
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
      modalId="deposite-address-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl max-w-[566px]"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base text-white sm:text-xl">Deposit Address</h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        <div className="flex flex-col gap-1 pt-10">
          <h3 className="text-xs font-medium tracking-[-0.28px] text-white">
            Network
          </h3>
          <Dropdown
            bgColor="bg-primary"
            items={NETWORKS}
            onSelect={handleNetworkSelect}
          />
        </div>
        <div className="flex items-center justify-center py-4 sm:py-8">
          <QRCode
            size={180}
            className="h-[120px] w-full max-w-[120px] object-contain sm:h-[180px] sm:max-w-[180px]"
            value={depositAddress?.public_key ?? "N/A"}
            viewBox={`0 0 180 180`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-normal tracking-[-0.28px] text-white">
          Scan QR code or copy address
        </h3>
        <div className="flex h-12 w-full items-center justify-between gap-8 rounded-xl bg-primary px-[18px] py-[14px]">
          <p className="text-xs font-medium text-white">
            {sliceAccountAddress(depositAddress?.public_key ?? "N/A")}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyText(depositAddress?.public_key ?? "N/A");
              toast.success("Copied to clipboard");
            }}
          >
            <CopyIcon className="size-6 shrink-0 cursor-pointer stroke-white hover:stroke-green" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 p-3">
        <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
        <div className="flex flex-col gap-1">
          <h3 className="pt-1 font-kanit text-xs font-black text-yellow sm:text-sm">
            Pay in current network to this deposit address.
          </h3>
          <p className="text-xxs font-normal text-yellow">
            Paying other than selected network to this deposit may result in the
            loss of your assets and we are not responsible for this.
          </p>
        </div>
      </div>
    </ModalContainer>
  );
};
