import { create } from "zustand";

type AuthStoreState = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
