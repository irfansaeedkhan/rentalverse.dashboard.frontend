import type { AxiosAdapter, AxiosResponse } from "axios";
import { demoResponse } from "@/lib/demo-api";

export const demoAdapter: AxiosAdapter = async (config) => {
  const response: AxiosResponse = {
    data: demoResponse(config.url, config),
    status: 200,
    statusText: "OK",
    headers: {},
    config,
    request: {},
  };
  return response;
};