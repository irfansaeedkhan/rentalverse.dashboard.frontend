import { AuthTokens } from "@/lib/auth";
import { APIBaseURL } from "@/constants/base-urls";
import { customLog } from "../custom-log";
import { setAuthTokens } from "@/lib/auth";
const validateAccessTokenRoute = `${APIBaseURL}/auth/check-token`;
// TODO: Add refresh token validation route
const validateRefreshTokenRoute = `${APIBaseURL}/auth/refresh-token`;

type AccessTokenValidationResponse = {
  access_token_valid: boolean;
  generate_access_token: boolean;
};
export async function validateAccessToken(
  authTokens: AuthTokens,
): Promise<AccessTokenValidationResponse> {
  try {
    let res = await fetch(validateAccessTokenRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access_token}`,
      },
    });
    //Token is valid not need to create refresh token
    if (res.status == 200) {
      return {
        access_token_valid: true,
        generate_access_token: false,
      };
    } else if (res.status == 401) {
      return {
        access_token_valid: false,
        generate_access_token: true,
      };
    }
    return {
      access_token_valid: false,
      generate_access_token: false,
    };
  } catch (error: any) {
    console.log("Access Error ", error);
    return {
      access_token_valid: false,
      generate_access_token: false,
    };
  }
}

export async function validateRefreshToken(
  authTokens: AuthTokens,
): Promise<boolean> {
  try {
    const res: Response = await fetch(validateRefreshTokenRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.refresh_token}`,
      },
    });
    const res_data: any = await res.json();
    if (res.status == 401) {
      return false;
    }

    // Setting the refresh token in the cookie
    await setAuthTokens({
      access_token: res_data.accessToken,
      refresh_token: res_data.refreshToken,
    });
    return true;
  } catch (error: any) {
    console.log("valdating refresh token ",error)
    return false;
  }
}

// Validate Tokens from API
export async function validateTokens(authTokens: AuthTokens): Promise<boolean> {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "false") {
    return Boolean(authTokens.access_token && authTokens.refresh_token);
  }

  try {
    // Check if tokens are present
    if (!authTokens.access_token || !authTokens.refresh_token) {
      return false;
    }

    let access_token_valid = await validateAccessToken(authTokens);
    if (access_token_valid.access_token_valid) {
      return true;
    } else if (
      !access_token_valid.access_token_valid &&
      !access_token_valid.generate_access_token
    ) {
      return false;
    }
    // Validate Refresh Token
    const refresh_token_valid = await validateRefreshToken(authTokens);

    if (!refresh_token_valid) {
      //TODO: clear the cookies
      return false;
    }
    return true;
  } catch (err: any) {
    console.log("Error validating token ", err);
    customLog(["development"], err);
    return false;
  }
}
