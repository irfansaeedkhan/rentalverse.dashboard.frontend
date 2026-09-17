import type { AxiosAdapter, AxiosResponse } from "axios";
import { demoResponse } from "@/lib/demo-api";

const responseCache = new Map<string, unknown>();

function cacheKey(config: { method?: string; url?: string; params?: unknown; data?: unknown }) {
  const method = (config.method ?? "get").toLowerCase();
  // Cache reads only — mutations should always re-run for toast/demo feedback.
  if (method !== "get" && method !== "head") return null;
  return `${method}:${config.url ?? ""}:${JSON.stringify(config.params ?? {})}`;
}

export const demoAdapter: AxiosAdapter = async (config) => {
  const key = cacheKey(config);
  const data =
    key && responseCache.has(key)
      ? responseCache.get(key)
      : demoResponse(config.url, config);

  if (key && !responseCache.has(key)) {
    responseCache.set(key, data);
  }

  const response: AxiosResponse = {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
    request: {},
  };
  return response;
};

export function clearDemoCache() {
  responseCache.clear();
}
