import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosApi from "../api/axios";

interface AuthState {
  token: string | null;
  setCredentials: (token: string) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    token: null,
    setCredentials: (token) => set({ token: token }),
    logOut: () => {
      axiosApi.post("/auth/logout");
      set({ token: null });
    },
  }))
);

export const selectCurrentToken = useAuthStore.getState().token;
