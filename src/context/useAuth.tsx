import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface AuthState {
  token: string | null;
  setCredentials: (token: string) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,

  setCredentials: (token) => set({ token: token }),
  logOut: () => {
    // because we cant use our private axios hook here...
    axios.post(
      "http://localhost:1337/api/auth/logout",
      {},
      { withCredentials: true, headers: { "Content-Type": "applicaiton/json" } }
    );
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
