"use client";
import React, { useState, createContext, useEffect } from "react";
// import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import {
  Alert,
  Check,
  ExclaimationIcon,
  USDTIcon,
  WithdrawalIcon,
} from "@/assets/svgs";
import { withdrawCrypto } from "@/lib/auth/withdraw-crypto";
import { Button } from "../shared";
import { CustomNumberInput } from "../shared/custom-number-input";
import ModalContainer from "../shared/modal-container";
import { LuAlertCircle } from "react-icons/lu";
import { GetAvailableBalanceResponse } from "@/lib/auth/get-available-balance";
import Dropdown from "../profile/drop-down";
import { NETWORKS } from "@/constants/network";
import { NetworkOption } from "../profile/profile-card-data";
import { MetaAssetsDetailsResponse } from "@/lib/auth/get-meta-asset-details";
import { IoIosCloseCircleOutline } from "react-icons/io";
interface Props {
  open: boolean;
  onClose: () => void;
  availableBalance: GetAvailableBalanceResponse | null | undefined;
}

type WithDrawFormFields = {
  account_address: string | null;
  amount: number | null;
  network: string | null;
  checkbox: boolean;
};

export const WithdrawalModal: React.FC<Props> = ({
  open,
  onClose,
  availableBalance,
}) => {
  const handleNetworkSelect = (selectedNetwork: NetworkOption) => {
    setFormFields({
      ...formFields,
      network: selectedNetwork?.value,
    });
  };

  const [isLoading, setIsLoading] = useState("idle");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorResponseMessage, setErrorResponseMessage] = useState("");
  const [formFields, setFormFields] = useState<WithDrawFormFields>({
    account_address: null,
    amount: null,
    network: "BSC",
    checkbox: false,
  });

  const handleonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, checkbox: e.target.checked });
  };

  const handleWithdraw = async () => {
    setIsLoading("pending");

    if (
      !formFields.account_address ||
      !formFields.amount ||
      !formFields.network
    ) {
      setIsLoading("rejected");
      setErrorMessage("All fields are required");
      return;
    }
    if (formFields.amount < 0.001) {
      setIsLoading("rejected");
      setErrorMessage("Minimum amount is 0.001");
      return;
    }
    if (formFields.checkbox === false) {
      setIsLoading("rejected");
      setErrorMessage("Kindly confirm the checkbox");
      return;
    }
    try {
      const res = await withdrawCrypto({
        amount: Number(formFields.amount),
        address: formFields.account_address,
        Network: formFields.network,
      });

      if (res) {
        setSuccess(true);
        setFailure(false);
        toast.success("Withdrawal request sent successfully!");
        setIsLoading("resolved");
        setErrorMessage("");
        setErrorResponseMessage("");
        setFormFields({
          account_address: null,
          amount: null,
          network: null,
          checkbox: false,
        });
      } else {
        setSuccess(false);
        setFailure(true);
        setIsLoading("rejected");
        setErrorMessage("something went wrong");
        console.log(res);
      }
    } catch (error: any) {
      // Access the original error information
      const errorMessage = error?.originalError?.response?.data?.message
        ? Array.isArray(error.originalError.response.data.message)
          ? error.originalError.response.data.message.join(", ")
          : error.originalError.response.data.message
        : error?.originalError?.message || "An unexpected error occurred";

      setErrorResponseMessage(errorMessage);
      setFailure(true);
      setSuccess(false);
      setIsLoading("rejected");
      setErrorMessage("something went wrong");
      console.log(error);
    }
  };

  const handleClose = () => {
    setErrorMessage("");
    onClose();
    setFailure(false);
    setSuccess(false);
    setIsLoading("idle");
    setFormFields({
      account_address: null,
      amount: null,
      network: "BSC",
      checkbox: false,
    });
  };

  useEffect(() => {
    setFormFields({
      account_address: null,
      amount: null,
      network: "BSC",
      checkbox: false,
    });
    setErrorMessage("");
    setErrorResponseMessage("");
    setFailure(false);
    setSuccess(false);
    setIsLoading("idle");
  }, [open]);
  if (availableBalance?.balance === 0) {
    return (
      <ModalContainer
        modalId="withdrawal-modal"
        isOpen={open}
        onClose={onClose}
        modalContentClassName="h-auto rounded-xl sm:max-w-[560px] max-w-[343px]"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className="flex w-full flex-col items-center text-center">
          <LuAlertCircle className="mx-auto size-8 cursor-pointer stroke-orange stroke-2" />
          <div className="content pb-8 pt-3">
            <h3 className="text-gradient mx-auto pb-2 pt-1 text-center text-base font-semibold capitalize sm:text-lg">
              No enough funds
            </h3>
            <p className="text-sm font-normal text-white">
              Unfortunately, you have no enough funds to make any withdraw.
            </p>
          </div>
          <Button
            title="Got it"
            className="w-full text-sm md:text-base lg:!px-10 lg:!py-3"
            onClick={onClose}
          />
        </div>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl sm:max-w-[566px] max-w-[343px]"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="flex w-full flex-col gap-6">
        {!success && !failure && (
          <>
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-normal text-white sm:text-xl">
                  Withdraw
                </h3>
              </div>
              <span onClick={onClose}>
                <IoIosCloseCircleOutline className="size-6 cursor-pointer fill-white stroke-2" />
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-5">
              <h3 className="text-xs font-medium tracking-[-0.28px] text-white">
                Network
              </h3>
              <div className="focus:primary-light peer relative flex w-full cursor-pointer rounded-xl bg-primary py-3 pl-6 pr-4 text-base font-thin text-white outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:drop-shadow-lg">
                <div className="relative">
                  <div className="flex items-center">
                    <div className="relative mr-2 size-7">
                      <USDTIcon className="size-7 shrink-0" />

                      <Image
                        src={"/images/bnb.png"}
                        alt="usdt"
                        width={14}
                        height={14}
                        className="absolute -right-1 bottom-0 w-[0.86rem] flex-shrink-0"
                      />
                    </div>
                    <span className="flex flex-wrap text-sm">
                      <span className="font-medium text-white">USDT</span>
                      <span className="ml-1 px-2 py-0.5 text-xs capitalize text-[#666666]">
                        BNB Smart Chain
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="account_address" className="text-xs text-white">
                Address
              </label>
              <p className="text-xxs text-white/60">
                Enter a BNB Smart Chain (0x) address. Sending to another
                network may lose your funds.
              </p>
              <input
                type="text"
                name="account_address"
                id="account_address"
                value={formFields.account_address ?? ""}
                onChange={handleonChange}
                placeholder="Insert your public key"
                className="peer relative w-full rounded-xl bg-primary py-3 pl-6 pr-4 text-base font-thin text-white outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-xs text-white">
                Amount
              </label>
              <div className="peer relative flex h-12 w-full items-center rounded-xl border border-gray-shade-1/10 bg-primary px-2 py-3 pl-6 pr-4 text-xs font-thin text-white shadow-1 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus-within:border-primary focus:ring-2 focus:ring-primary focus:drop-shadow-lg">
                <CustomNumberInput
                  name="amount"
                  id="amount"
                  value={formFields.amount ?? undefined}
                  onChange={handleonChange}
                  placeholder="Min. amount: 0.001"
                  className="w-full bg-primary focus:outline-none"
                />
                <div className="flex items-center justify-end gap-1.5">
                  <span className="rounded-fullp-1.5 flex shrink-0 items-center gap-1.5 text-xs font-medium">
                    <span>USDT</span>
                  </span>
                  <span
                    className="shrink-0 cursor-pointer rounded-full pl-2 text-xs font-medium text-green"
                    onClick={() =>
                      setFormFields({
                        ...formFields,
                        amount: availableBalance?.balance
                          ? parseFloat(availableBalance.balance.toFixed(2))
                          : 0,
                      })
                    }
                  >
                    MAX
                  </span>
                </div>
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-shade-4 mt-1 text-xs">{errorMessage}</p>
            )}

            <div className="mt-4 flex items-center gap-2 p-3">
              <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
              <div className="flex flex-col gap-1">
                <h3 className="pt-1 font-kanit text-xs font-black text-yellow sm:text-sm">
                  Reminder
                </h3>
                <p className="text-xxs font-normal text-yellow">
                  For the safety of your funds, please confirm again that the
                  network and address you wish to use is correct.
                </p>
              </div>
            </div>
            {/* add check box */}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={formFields.checkbox}
                onChange={handleCheckboxChange}
                className="block h-5 w-5 rounded border border-gray-shade-1/10 bg-primary-light focus:ring-0"
              />
              <label
                htmlFor="checkbox"
                className="block text-xs font-normal text-white sm:h-3"
              >
                I confirm I double checked network and wallet address
              </label>
            </div>
            <Button
              title="Withdraw"
              className="mt-4 w-full text-sm md:text-base"
              disabled={
                formFields.amount === 0 ||
                formFields.amount === null ||
                formFields.account_address === "" ||
                formFields.network === "" ||
                formFields.checkbox === false ||
                isLoading === "pending"
              }
              loaderIcon={
                isLoading === "pending" && (
                  <CgSpinner className="mx-auto size-5 animate-spin" />
                )
              }
              onClick={handleWithdraw}
            />
          </>
        )}

        {success && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Check />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg text-white">
                Withdraw completed successfully
              </h3>
              <p className="text-sm text-gray-shade-5">
                Withdrawal expected at your wallet in 3-5 business days.
              </p>
            </div>
            <Button
              title="Continue"
              className="mt-4 w-full text-sm md:text-base"
              onClick={handleClose}
            />
          </div>
        )}
        {failure && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Alert />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg text-white">Withdraw Failed</h3>
              <p className="text-sm text-gray-shade-5">
                {errorResponseMessage ??
                  "To protect your account, your withdrawal has not been processed. Please try another again later."}
              </p>
            </div>
            <Button
              title="Ok"
              className="mt-4 w-full text-sm md:text-base"
              onClick={handleClose}
            />
          </div>
        )}
      </div>
    </ModalContainer>
  );
};
