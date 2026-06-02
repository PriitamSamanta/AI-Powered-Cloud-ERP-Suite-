import api from "@/lib/axios";

import { LoginPayload, LoginResponse, RegisterPayload } from "../types/auth.types";

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const registerUser = async (
  data: RegisterPayload
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};