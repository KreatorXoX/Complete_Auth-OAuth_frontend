import { create } from "zustand";

interface AuthState {
  token: string | null;
  setCredentials: (token: string) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  setCredentials: (token) => set({ token: token }),
  logOut: () => set({ token: null }),
}));

export const selectCurrentToken = useAuthStore.getState().token;
