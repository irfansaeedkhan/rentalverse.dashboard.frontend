import { AppError } from "@/utils/app-error";
import { axiosAPIBlockchain } from "@/utils/axios/axios-api";

export const getBuyMetaAssetDetail =
  async (): Promise<BuyMetaAssetDetailResponse> => {
    try {
      const res = await axiosAPIBlockchain.get("/meta-assets");
      return res.data;
    } catch (error: any) {
      const errorMessage = "Failed to get meta assets details";
      if (error.response?.status === 500) {
        throw new AppError(error, errorMessage, "getBuyMetaAssetDetail");
      } else {
        throw new AppError(
          error,
          error.response?.data?.error ?? errorMessage,
          "getBuyMetaAssetDetail",
        );
      }
    }
  };

export type BuyMetaAssetDetailResponse = {
  id: string;
  available_inventory: number;
  taken_inventory: number;
  duration: number;
  price: number;
  referrer_roi: number;
  weekly_roi: number;
};
