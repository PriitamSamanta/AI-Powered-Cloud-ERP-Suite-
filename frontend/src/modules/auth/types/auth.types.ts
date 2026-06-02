export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export type UserRole = "admin" | "hr";

export interface RegisterPayload {
  email: string;
  password: string;
  role: UserRole;
}