import { AppError } from "@/utils/app-error";
import { axiosAPIBlockchain } from "@/utils/axios/axios-api";

export const getMetaAssetsDetails =
  async (): Promise<MetaAssetsDetailsResponse> => {
    try {
      const res = await axiosAPIBlockchain.get("/v2/user-meta-asset");
      return res.data;
    } catch (error: any) {
      const errorMessage = "Failed to get meta assets details";
      if (error.response?.status === 500) {
        throw new AppError(error, errorMessage, "getMetaAssetsDetails");
      } else {
        throw new AppError(
          error,
          error.response?.data?.error ?? errorMessage,
          "getMetaAssetsDetails",
        );
      }
    }
  };

export type MetaAssetsDetailsResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  weekly_roi: number;
  referrer_roi: number;
  contract_start_date: string;
  contract_expiry_date: string;
  last_reward_date: string;
  owned_offices: number;
  usdt_earned_untill_now: number;
  usdt_earned_last_month: number;
  minted_offices_in_usd: number;
  minted_offices: number;
  owned_offices_in_usd: number;
  equity_percentage: number;
  received_rewards: number;
};
