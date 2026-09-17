import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";
import { User } from "@/models/user.model";

export const getMe = async (): Promise<User> => {
  try {
    const res = await axiosAPI.get("/user/me");
    return res.data;
  } catch (error: any) {
    const errorMessage = "Failed to get logged in user details";
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, "getMe");
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        "getMe",
      );
    }
  }
};
