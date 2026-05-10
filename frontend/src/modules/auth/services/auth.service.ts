import api from "@/lib/axios";

import { LoginPayload, LoginResponse } from "../types/auth.types";

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
