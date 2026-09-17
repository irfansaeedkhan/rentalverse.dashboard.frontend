import { AxiosHeaders, AxiosInstance } from "axios";
import { getAuthTokens, refreshTokens } from "@/lib/auth";

const refreshTokenPath = "/auth/refresh-token";

// Interceptor for passing access token to request header
export const registerAuthTokenRequestInterceptor = (
  axiosInstance: AxiosInstance,
) => {
  axiosInstance.interceptors.request.use(async (config) => {
    const authTokens = getAuthTokens();
    if (authTokens && config.url !== refreshTokenPath) {
      if (!config.headers) config.headers = new AxiosHeaders();
      config.headers["Authorization"] = `Bearer ${authTokens.access_token}`;
    }
    return config;
  });
};

// TODO: Avoid multuple refresh token requests
// Interceptor for handling 401 error
export const registerAuthTokenResponseInterceptor = (
  axiosInstance: AxiosInstance,
) => {
  axiosInstance.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        originalRequest.url === refreshTokenPath
      ) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const authTokens = getAuthTokens();

        if (authTokens) {
          try {
            const newAuthTokens = await refreshTokens();
            if (newAuthTokens) {
              axiosInstance.defaults.headers.common["Authorization"] =
                "Bearer " + newAuthTokens.accessToken;
              return axiosInstance(originalRequest);
            }
          } catch (error: any) {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    },
  );
};
