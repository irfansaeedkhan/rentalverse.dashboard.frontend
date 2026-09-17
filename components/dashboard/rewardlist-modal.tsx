import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ModalContainer from "../shared/modal-container";
import { GetRewardListItemResponse } from "@/lib/auth/get-rewards-list";
import { RewardListTableMobile } from "./reward-list-table-mobile";
import { RewardListTable } from "./reward-list-table";
import { LuAlertCircle } from "react-icons/lu";
import { Button } from "../shared";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ExclaimationIcon } from "@/assets/svgs";
import TotalNumberField from "../shared/total-number-field";
interface Props {
  open: boolean;
  onClose: () => void;
  rewardListData: GetRewardListItemResponse | null | undefined;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  page: number;
  totalPages?: number;
}

export const RewardListlModal: React.FC<Props> = ({
  open,
  onClose,
  rewardListData,
  handleNextPage,
  handlePrevPage,
  page,
  totalPages = 1,
}) => {
  if (!rewardListData) {
    return (
      <ModalContainer
        modalId="withdrawal-modal"
        isOpen={open}
        onClose={onClose}
        modalContentClassName="h-auto rounded-xl sm:max-w-[560px] max-w-[343px]"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex w-full flex-col items-center text-center">
          <ExclaimationIcon className="mx-auto size-8 shrink-0 cursor-pointer" />
          <div className="content pb-8 pt-3 text-center">
            <h3 className="text-gradient mx-auto pb-2 pt-1 text-center text-base font-semibold capitalize sm:text-lg">
              No reward available
            </h3>
            <p className="text-sm font-normal text-white">
              Unfortunately, you have no reward available now.
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
      modalContentClassName="max-h-[90dvh] overflow-hidden rounded-xl sm:max-w-[800px] max-w-[343px] pb-1 md:pb-20"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex max-h-[80dvh] w-full max-w-[343px] flex-col gap-8  sm:max-w-[800px]">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white sm:text-xl">
              Rewards List
            </h3>
            {rewardListData && (
              <TotalNumberField
                bgColor="bg-primary-light"
                length={rewardListData.length}
              />
            )}
          </div>

          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        {rewardListData && (
          <div className="custom-scrollbar flex max-h-[80dvh] w-full max-w-[343px] flex-col gap-8 sm:max-w-[800px] md:overflow-y-auto">
            <div className="hidden lg:block">
              <RewardListTable
                rewardListData={rewardListData}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                page={page}
                totalPages={totalPages}
              />
            </div>
            <div className="block lg:hidden">
              <RewardListTableMobile
                rewardListData={rewardListData}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                page={page}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};
