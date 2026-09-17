import React from "react";
import { ProfileCopyButton } from "./profile-copy-button";
import { APPBaseURL } from "@/constants/base-urls";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";
import { sliceReferalAddress } from "@/utils/slice-referal-address";
import { sliceAccountAddress } from "@/utils/slice-account-address";

export const ReferralAddressCard: React.FC<any> = ({
  WalletAddress,
  AffiliateCode,
}) => {
  return (
    <div className="bg-primary-dark w-full rounded-xl p-6 text-white">
      <h2 className="text-lg tracking-[-0.28px] text-white md:text-xl">
        Referrals Address
      </h2>
      <div className="flex w-full flex-col gap-4 pt-4">
        <div className="flex items-center gap-5">
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-xs tracking-[-0.28px] text-white md:text-sm">
              Referral Code
            </h3>
            <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-primary-light p-3">
              <input
                className="focus:primary-light w-full cursor-pointer overflow-hidden bg-transparent text-xs font-semibold text-white transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline focus:ring-2 focus:ring-primary-light focus:drop-shadow-lg
        lg:text-sm"
                onClick={() => {
                  copyText(AffiliateCode);
                  toast.success("Copied to clipboard");
                }}
                type="text"
                value={AffiliateCode}
              />
              <ProfileCopyButton value={AffiliateCode} />
            </div>
          </div>
        </div>
        {/* peer relative w-full bg-primary-light pl-6 pr-4 font-thin outline-none
        drop-shadow-sm transition-all duration-200 ease-in-out
        focus:primary-light focus:ring-2 focus:ring-primary-light
        focus:drop-shadow-lg py-3 rounded-xl text-base text-white */}
        <div className="flex items-center gap-5">
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-xs tracking-[-0.28px] text-white md:text-sm">
              Referral Link
            </h3>
            <div className="flex w-full items-center justify-between gap-5 rounded-xl bg-primary-light p-3">
              <input
                className="focus:primary-light w-full cursor-pointer overflow-hidden bg-transparent text-xs font-semibold text-white transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline focus:ring-2 focus:ring-primary-light
        focus:drop-shadow-lg lg:text-sm"
                onClick={() => {
                  copyText(`${APPBaseURL}/auth/register?ref=${AffiliateCode}`);
                  toast.success("Copied to clipboard");
                }}
                type="text"
                // value={`${APPBaseURL}/auth/register?ref=${AffiliateCode}`}
                value={sliceReferalAddress(
                  `${APPBaseURL}/auth/register?ref=${AffiliateCode}`,
                )}
              />
              <ProfileCopyButton
                value={`${APPBaseURL}/auth/register?ref=${AffiliateCode}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
