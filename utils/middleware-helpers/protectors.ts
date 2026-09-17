import type { NextRequest } from "next/server";
import {
  AuthTokens,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/lib/auth";
import { validateTokens } from "./validate-tokens";

export const isAuthenticated = async (request: NextRequest) => {
  try {
    const authTokens = getAuthTokensFromRequest(request);
    
    if (!authTokens) return false;
    // Validate Refresh Token
    const payload = await validateTokens(authTokens);
    
    return !!payload;
  } catch {
    return false;
  }
};

const getAuthTokensFromRequest = (request: NextRequest): AuthTokens | null => {
  const accessToken = request.cookies.get(ACCESS_TOKEN_STORAGE_KEY);
  const refreshToken = request.cookies.get(REFRESH_TOKEN_STORAGE_KEY);

  if (!accessToken || !refreshToken) return null;
  return {
    access_token: accessToken.value,
    refresh_token: refreshToken.value,
  };
};
