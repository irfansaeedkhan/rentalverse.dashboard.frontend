"use client";
import React, { useCallback, useEffect, useState } from "react";
import ModalContainer from "../shared/modal-container";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ProfilePasswordIcon, ProfileUserIcon } from "@/assets/svgs";
import cn from "@/utils/cn";
import { PersonalInfo } from "../settings/personal-info";
import { getProfile } from "@/lib/auth/get-profile";
import { getProfileDataApiResponseType } from "../profile/profile-card-data";
import { UpdatePassword } from "../settings/update-password";
import { useAuthStore } from "@/stores/auth.store";
import moment from "moment";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const EditProfileModel: React.FC<Props> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] =
    useState<getProfileDataApiResponseType>();

  const { user } = useAuthStore();

  const getProfileData = useCallback(async () => {
    try {
      const res = await getProfile();
      setProfileData(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto max-h-[90vh] w-full rounded-xl sm:max-w-[566px] max-w-[670px] overflow-y-auto"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white sm:text-xl">
              Profile Settings
            </h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 cursor-pointer fill-white stroke-2" />
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col gap-4 md:flex-row">
          <button
            className={`flex items-center gap-3 rounded-xl px-4 py-2 ${
              activeTab === "personal"
                ? "from-green-400 bg-gradient-to-r from-[#00FF94] to-[#00A3FF]  font-bold text-primary"
                : "from-green-400 bg-gradient-to-r from-[#0E1F30] to-[#00A3FF] font-bold text-white"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            <ProfileUserIcon
              className={cn(
                `size-6 shrink-0`,
                activeTab === "personal"
                  ? "[&>path]:fill-primary"
                  : "[&>path]:fill-white",
              )}
            />
            <span className="flex flex-col">
              <span className="text-xs sm:text-sm">Personal Information</span>
              <span className="text-xxs">Set your identity information</span>
            </span>
          </button>
          <button
            className={`flex items-center gap-3 rounded-xl px-4 py-2 ${
              activeTab === "password"
                ? "from-green-400 bg-gradient-to-r from-[#00FF94] to-[#00A3FF]  font-bold text-primary"
                : "from-green-400 bg-gradient-to-r from-[#0E1F30] to-[#00A3FF] font-bold text-white"
            }`}
            onClick={() => setActiveTab("password")}
          >
            <ProfilePasswordIcon
              className={cn(
                `size-6 shrink-0`,
                activeTab === "password"
                  ? "[&>path]:fill-primary"
                  : "[&>path]:fill-white",
              )}
            />
            <span className="flex flex-col">
              <span className="text-xs sm:text-sm">Account Password</span>
              {user?.PasswordResetAt &&
                moment(user.PasswordResetAt).isValid() && (
                  <span className="text-xxs">
                    Last updated{" "}
                    {moment(user.PasswordResetAt).startOf("day").fromNow()}
                  </span>
                )}
            </span>
          </button>
        </div>
        {/* Tab Content */}
        <div className="flex-grow">
          {activeTab === "personal" && profileData && (
            <PersonalInfo {...profileData} getProfileData={getProfileData} />
          )}

          {activeTab === "password" && profileData && (
            <UpdatePassword getProfileData={getProfileData} />
          )}
        </div>
      </div>
    </ModalContainer>
  );
};
