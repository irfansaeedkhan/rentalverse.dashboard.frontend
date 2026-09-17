import axios from "axios";
import { APIBaseURL, APIBaseURLBlockchain } from "@/constants/base-urls";
import {
  registerAuthTokenRequestInterceptor,
  registerAuthTokenResponseInterceptor,
} from "./auth-tokens-interceptors";
import { demoAdapter } from "./demo-adapter";

export const axiosAPI = axios.create({
  baseURL: APIBaseURL,
  adapter: demoAdapter,
});
export const axiosAPIBlockchain = axios.create({
  baseURL: APIBaseURLBlockchain,
  adapter: demoAdapter,
});

registerAuthTokenRequestInterceptor(axiosAPI);
registerAuthTokenResponseInterceptor(axiosAPI);
registerAuthTokenRequestInterceptor(axiosAPIBlockchain);
registerAuthTokenResponseInterceptor(axiosAPIBlockchain);
