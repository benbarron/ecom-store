import { AxiosRequestConfig } from "axios";

export const buildAuthHeaders = (
  config: AxiosRequestConfig = {}
): AxiosRequestConfig => ({
  ...config,
  headers: {
    "x-auth-token": localStorage.getItem("x-auth-token"),
  },
});
