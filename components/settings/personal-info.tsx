import React, { useMemo, useState } from "react";
import clsx from "clsx";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import { GlobeIcon, UserIcon } from "@/assets/svgs";
import PhoneInput from "react-phone-number-input";
import { getProfileDataApiResponseType } from "../profile/profile-card-data";
import { CountryDropdown } from "./country-dropdown";
import { Button } from "../shared";
import { CgSpinner } from "react-icons/cg";
import { UpdateProfileApi } from "@/lib/auth/update-profile";
import toast from "react-hot-toast";
import { HiMiniArrowLeft } from "react-icons/hi2";

interface Props extends getProfileDataApiResponseType {
  getProfileData: () => void;
}

export const PersonalInfo: React.FC<Props> = ({
  Name,
  Surname,
  Email,
  Phone,
  Country,
  getProfileData,
}) => {
  const countries = useMemo(() => countryList().getData(), []);
  const [isLoading, setIsLoading] = useState<"loading" | "success" | "error">();
  const [userInfo, setUserInfo] = useState({
    personalInfo: {
      name: Name,
      surname: Surname,
      email: Email,
    },
    phonecountry: {
      phone: Phone,
      country: Country,
    },
  });

  const handleChangePersonalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setIsLoading("loading");
    try {
      await UpdateProfileApi(
        userInfo.personalInfo.name,
        userInfo.personalInfo.surname,
        userInfo.phonecountry.country,
        userInfo.phonecountry.phone,
      );
      toast.success("Profile updated successfully");
      getProfileData();
      setIsLoading("success");
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading("error");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className={clsx(inputMain, "w-full flex-grow gap-4")}>
          <div className={inputMain}>
            <label htmlFor="name" className={inputLabel}>
              Name
            </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              value={userInfo.personalInfo.name}
              className={clsx(inputField)}
              placeholder="Name"
              onChange={handleChangePersonalInfo}
            />
          </div>
          <div className={inputMain}>
            <label htmlFor="surname" className={inputLabel}>
              Surname
            </label>
            <input
              autoComplete="off"
              type="text"
              id="surname"
              name="surname"
              value={userInfo.personalInfo.surname}
              className={clsx(inputField)}
              placeholder="Surname"
              onChange={handleChangePersonalInfo}
            />
          </div>
          <div className={inputMain}>
            <label htmlFor="email" className={inputLabel}>
              Email
            </label>
            <input
              readOnly
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              value={userInfo.personalInfo.email}
              className={clsx(inputField)}
              placeholder="Email"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex w-full max-w-[276px] items-center gap-4">
          <GlobeIcon className="size-6 shrink-0" />
          <div className="w-full">
            <h1 className="text-sm tracking-[-0.28px] text-white">
              Phone & country
            </h1>
            <p className="text-xxs text-gray tracking-[-0.28px]">
              Set your country and phone
            </p>
          </div>
        </div>
        <div
          className={clsx("flex w-full flex-grow flex-col gap-4 md:flex-row")}
        >
          <div className={clsx(inputMain, "flex-1")}>
            <label className={inputLabel}>Country</label>
            <CountryDropdown
              placeholder="Select Country"
              options={countries}
              selectedValue={userInfo.phonecountry.country}
              onSelect={(country: string) => {
                setUserInfo((prev) => ({
                  ...prev,
                  phonecountry: {
                    ...prev.phonecountry,
                    country: country,
                  },
                }));
              }}
            />
          </div>
          <div className={clsx(inputMain, "flex-1")}>
            <label className={inputLabel}>Phone Number</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={userInfo.phonecountry.phone}
              onChange={(value) => {
                if (value === undefined) {
                  return;
                }
                setUserInfo((prev) => ({
                  ...prev,
                  phonecountry: {
                    ...prev.phonecountry,
                    phone: value,
                  },
                }));
              }}
              className={clsx(
                inputField,
                "py-[0.938rem] focus:[&>input]:border-0 focus:[&>input]:outline-none focus:[&>input]:ring-0",
              )}
            />
          </div>
        </div>
      </div>
      <Button
        title="Save"
        type="submit"
        className="mt-4 w-full text-sm md:text-base"
        loaderIcon={
          isLoading === "loading" && (
            <CgSpinner className="mx-auto size-5 animate-spin" />
          )
        }
        onClick={handleSubmit}
        disabled={isLoading === "loading" ? true : false}
      />
    </div>
  );
};

const inputMain = "flex flex-col gap-1";
const inputLabel = "text-sm text-white";
const inputField =
  "peer relative w-full bg-primary pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:primary focus:ring-2 focus:ring-primary focus:drop-shadow-lg py-3 rounded-xl text-base text-white [&>input]:border-0 [&>input]:outline-none [&>input]:ring-0 [&>input]:bg-primary";
