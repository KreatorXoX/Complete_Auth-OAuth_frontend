import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../api/axios";

interface AuthState {
  token: string | null;
  setCredentials: (token: string) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,

  setCredentials: (token) => set({ token: token }),
  logOut: () => {
    axios.post("/auth/logout");
    set({ token: null });
  },
}));

interface PersistState {
  persist: boolean;
  setPersist: (shouldPersist: boolean) => void;
}

export const usePersistStore = create<PersistState>()(
  persist(
    (set) => ({
      persist: false,
      setPersist: (shouldPersist) => set({ persist: shouldPersist }),
    }),
    {
      name: "persistent-auth",
    }
  )
);
