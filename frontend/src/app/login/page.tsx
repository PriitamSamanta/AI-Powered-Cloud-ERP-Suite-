"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

import { loginUser } from "@/modules/auth/services/auth.service";

import { useAuthStore } from "@/store/authStore";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

interface LoginFormData {
  email: string;
  password: string;
}

interface DecodedToken {
  role: string;
}

export default function LoginPage() {
  const router = useRouter();

  const { setAuth } = useAuthStore();

  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);

      const token = response.access_token;

      const decoded = jwtDecode<DecodedToken>(token);

      setAuth(token, decoded.role);

      // Role-based redirect
      if (decoded.role === "admin" || decoded.role === "hr") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardContent className="p-6">
          <h1 className="mb-6 text-2xl font-bold">ERP Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Email" type="email" {...register("email")} />

            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
