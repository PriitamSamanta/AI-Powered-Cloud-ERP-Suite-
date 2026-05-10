import { create } from "zustand";

interface AuthState {
  token: string | null;
  role: string | null;

  setAuth: (token: string, role: string) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,

  setAuth: (token, role) => {
    localStorage.setItem("token", token);

    set({
      token,
      role,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      role: null,
    });
  },
}));
