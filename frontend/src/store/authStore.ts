import { create } from "zustand";

interface AuthState {
  token: string | null;
  role: string | null;

  setAuth: (token: string, role: string) => void;
  loadAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,

  setAuth: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    set({
      token,
      role,
    });
  },

  loadAuth: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    set({
      token,
      role,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    set({
      token: null,
      role: null,
    });
  },
}));