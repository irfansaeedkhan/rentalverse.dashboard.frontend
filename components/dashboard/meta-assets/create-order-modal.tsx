import React, { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import toast from "react-hot-toast";
import { parse, addWeeks, format } from "date-fns";
import { CgSpinner } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { Alert, Check, ExclaimationIcon, USDTIcon } from "@/assets/svgs";
import { AppRoutes } from "@/constants/app-routes";
import { Button } from "@/components/shared";
import ModalContainer from "@/components/shared/modal-container";
import { addMetaAssts } from "@/lib/auth/add-meta-asset";
import { MetaAssetsDetailsResponse } from "@/lib/auth/get-meta-asset-details";

interface Props {
  open: boolean;
  onClose: () => void;
  mainModelClose: () => void;
  numberOfUnits: number;
  id: string;
  totalamount: number;
  StartDate: string;
  duration: number;
  setSuccessPurchase: any;
  metaAssetsDetails: MetaAssetsDetailsResponse | null | undefined;
}

export const CreateOrderModal: React.FC<Props> = ({
  open,
  onClose,
  mainModelClose,
  totalamount,
  numberOfUnits,
  id,
  StartDate,
  duration,
  setSuccessPurchase,
  metaAssetsDetails,
}) => {
  const [isLoading, setIsLoading] = useState("idle");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const handleConfirm = async () => {
    if (!checkbox) {
      toast.error("Please confirm the checkbox");
      return;
    }
    setIsLoading("pending");
    try {
      const res = await addMetaAssts(id, numberOfUnits);
      if (res) {
        setSuccess(true);
        setFailure(false);
        setIsLoading("resolved");
        toast.success("Order created successfully");
        setSuccessPurchase(true);
        setCheckbox(false);
      } else {
        setFailure(true);
        setSuccess(false);
        setIsLoading("rejected");
        toast.error("Failed to create order");
        setSuccessPurchase(false);
      }
    } catch (error: any) {
      setFailure(true);
      setSuccess(false);
      toast.error(error.message);
      setIsLoading("rejected");
      setSuccessPurchase(false);
      setCheckbox(false);
    }
  };

  const handleClose = () => {
    onClose();
    mainModelClose();
    setFailure(false);
    setSuccess(false);
    setIsLoading("idle");
    setCheckbox(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(e.target.checked);
  };

  // Convert the string to a Date object
  const parsedStartDate = dayjs(StartDate);
  const StartDateUpdated = parsedStartDate.isValid()
    ? parsedStartDate.toDate()
    : parse(StartDate, "dd MMM, yyyy", new Date());

  // Add the specified number of weeks
  const endDate = addWeeks(StartDateUpdated, duration);

  // Format the result to the desired output
  const formattedEndDateForFirstPurchase = format(endDate, "dd MMM yyyy");

  const expiryDateFromAPI = metaAssetsDetails?.contract_expiry_date;

  const finalExpiraryDate = expiryDateFromAPI
    ? dayjs(expiryDateFromAPI).format("DD MMM YYYY")
    : formattedEndDateForFirstPurchase;

  return (
    <ModalContainer
      modalId="create-order-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl max-w-[518px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white sm:text-xl">
              Your Order
            </h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        {!success && !failure && (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-sm text-white">Amount</p>
                <div className="flex items-center gap-1">
                  <USDTIcon className="size-6 shrink-0" />
                  <p className="text-xl text-green">{totalamount} USDT</p>
                </div>

                <p className="rounded-md border border-[#E38800] bg-[#FFD79B] px-2 py-0.5 text-[11px] font-medium text-[#9F5F00]">
                  To be paid
                </p>
              </div>
              {!!metaAssetsDetails?.owned_offices && (
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-dark p-4">
                  <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
                  <h3 className="pt-1 font-kanit text-xs font-normal text-yellow sm:text-sm">
                    You already have an opened position, these Meta Assets will
                    be added to the cycle of your currently opened position.
                  </h3>
                </div>
              )}
              <div className="flex flex-col gap-[14px] rounded-[20px] border border-white/[0.04] bg-primary-dark p-4">
                {/* <div className={mainWrap}>
                  <h3 className={firstChild}>UUID</h3>
                  <h3 className={secondChild}> {id} </h3>
                </div> */}
                <div className={mainWrap}>
                  <h3 className={firstChild}>Meta Assets Purchased</h3>
                  <h3 className={secondChild}>{numberOfUnits}</h3>
                </div>
                <div className={mainWrap}>
                  <h3 className={firstChild}>Start Date</h3>
                  <h3 className={secondChild}>
                    {dayjs(StartDate).format("DD MMM YYYY")}
                  </h3>
                </div>
                <div className={mainWrap}>
                  <h3 className={firstChild}>End Date</h3>
                  <h3 className={secondChild}>{finalExpiraryDate}</h3>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:items-center">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={checkbox}
                onChange={handleCheckboxChange}
                className="block h-5 w-5 rounded border border-gray-shade-1/10 bg-primary-light focus:ring-0"
              />
              <label
                htmlFor="checkbox"
                className="block text-xs font-normal text-white"
              >
                By proceeding the the purchase of Meta Assets, you agree to
                Altaria&apos;s{" "}
                <Link
                  href={AppRoutes.profile.terms}
                  className="font-semibold underline"
                >
                  Terms and conditions
                </Link>
              </label>
            </div>
            <Button
              title="Confirm"
              className="mt-4 w-full text-sm md:text-base"
              loaderIcon={
                isLoading === "pending" && (
                  <CgSpinner className="mx-auto size-5 animate-spin" />
                )
              }
              onClick={handleConfirm}
              disabled={!checkbox}
            />
          </>
        )}
        {success && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Check />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg text-white">Order Created Successfully</h3>
              <p className="text-sm text-gray-shade-5">
                Your order has been created ,
                <Link
                  href={AppRoutes.profile.my_invoice}
                  className="font-semibold-1 cursor-pointer text-white underline"
                >
                  View your invoice
                </Link>
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
              <h3 className="text-lg text-white">Failure Creating Order</h3>
              <p className="text-sm text-gray-shade-5">
                Unable to place order. Insufficient balance for the
                corresponding quantity of assets due to the rapid rise in
                prices. Try again by reducing the amount, or use Total instead
                of Amount.
              </p>
            </div>
            <Button
              title="Continue"
              className="mt-4 w-full text-sm md:text-base"
              onClick={handleClose}
            />
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

const mainWrap = "flex items-center justify-between gap-3";
const firstChild = "text-white text-sm font-medium";
const secondChild = "text-white text-sm font-medium";
