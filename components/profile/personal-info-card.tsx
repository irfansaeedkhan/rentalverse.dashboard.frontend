import React, { useState } from "react";
import { ProfileCopyButton } from "./profile-copy-button";
import { getProfileDataApiResponseType } from "./profile-card-data";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { APPBaseURL } from "@/constants/base-urls";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";
import { sliceReferalAddress } from "@/utils/slice-referal-address";
import {
  EditPenIcon,
  EmailIcon,
  GlobeIcon,
  PhoneIcon,
  UserIcon,
} from "@/assets/svgs";
import { FaRegPenToSquare } from "react-icons/fa6";
import { EditProfileModel } from "../dashboard/edit-profile-model";

const PersonalInfoCard: React.FC<any> = ({
  Name = "N/a",
  Email = "N/a",
  Phone = "N/a",
  Country = "N/a",
  Surname = "N/a",
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-primary-dark w-full rounded-xl p-6 text-white">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg tracking-[-0.28px] text-white md:text-xl">
          Personal information
        </h2>
        <button onClick={() => setOpen(true)}>
          <EditPenIcon className="size-6 cursor-pointer text-white" />
        </button>
      </div>
      <div className="flex w-full flex-col gap-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full bg-transparent">
            <EmailIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-gray text-xs tracking-[-0.28px]">Email</h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-normal text-white lg:text-sm">
                {Email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full bg-transparent">
            <UserIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-gray text-xs tracking-[-0.28px]">Name</h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-normal text-white lg:text-sm">
                {Name} {Surname}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full bg-transparent">
            <GlobeIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-gray text-xs tracking-[-0.28px]">Country</h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-normal text-white lg:text-sm">
                {Country}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full bg-transparent">
            <PhoneIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-gray text-xs tracking-[-0.28px]">
              Phone Number
            </h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-normal text-white lg:text-sm">
                {Phone}
              </p>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModel open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default PersonalInfoCard;
