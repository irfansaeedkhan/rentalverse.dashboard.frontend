import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/models/user.model";
import { LoadingState } from "@/models/common";
import { getMe, login, setAuthTokens } from "@/lib/auth";

export interface AuthStore {
  loading: LoadingState;
  user: User | null;

  actions: {
    fetchUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    setUser: (user: User | null) => void;
    logout: () => void;
  };
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      loading: "idle",
      user: null,

      actions: {
        fetchUser: async () => {
          set({ loading: "loading" });
          try {
            const user = await getMe();
            set({
              loading: "loaded",
            });
            get().actions.setUser(user);
          } catch (error: any) {
            set({ loading: "failed" });
            if (error.response?.status === 401) {
              set({ user: null });
              //TODO : Uncomment
              setAuthTokens({ access_token: "", refresh_token: "" });
            }
            throw error;
          }
        },
        login: async (email: string, password: string) => {
          set({ loading: "loading" });
          try {
            const user = await login({ email: email, password: password });
            await setAuthTokens({
              access_token: user.Auth_Token,
              refresh_token: user.refresh_token, // TODO: Save refresh token when implementeds
            });
            set({
              loading: "loaded",
            });
            get().actions.setUser(user);
          } catch (error: any) {
            set({ loading: "failed" });
            throw error;
          }
        },
        logout: () => {
          set({ user: null });
          setAuthTokens({ access_token: "", refresh_token: "" });
        },
        setUser: (user: User | null) => {
          set({
            user: user
              ? {
                  Email: user.Email,
                  Name: user.Name,
                  Surname: user.Surname,
                  AffiliateCode: user.AffiliateCode,
                  WalletAddress: user.WalletAddress,
                  PasswordResetAt: user.PasswordResetAt,
                }
              : null,
          });
        },
      },
    }),
    {
      name: "AuthStore",
      enabled: process.env.NEXT_PUBLIC_APP_ENV !== "production",
    },
  ),
);
