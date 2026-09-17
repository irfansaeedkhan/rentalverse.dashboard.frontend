import { axiosAPI } from "@/utils/axios";
import { customLog } from "@/utils/custom-log";
import { getAuthTokens, setAuthTokens } from "./auth-tokens-storage";
import { AuthTokens } from "./types";

export type RefreshTokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export const refreshTokens =
  async (): Promise<RefreshTokensResponse | null> => {
    try {
      const authTokens = getAuthTokens();

      if (!authTokens) {
        return null;
      }

      const { data } = await axiosAPI.get<RefreshTokensResponse>(
        `/auth/refresh-token`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.refresh_token}`,
          },
        },
      );

      await setAuthTokens({
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });

      return data;
    } catch (error: any) {
      customLog(["development", "staging"], error);
      throw error;
    }
  };
