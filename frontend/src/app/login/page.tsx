"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
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

type ModuleType = "hr" | "finance" | "bi";

const moduleRules: Record<ModuleType, string[]> = {
  hr: ["admin", "hr", "employee"],
  finance: ["admin", "hr"],
  bi: ["hr"],
};

const moduleRedirects: Record<ModuleType, string> = {
  hr: "/dashboard/hr",
  finance: "/dashboard/finance",
  bi: "/dashboard/bi",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedModule = (searchParams.get("module") || "hr") as ModuleType;

  const { setAuth } = useAuthStore();
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);
      const token = response.access_token;

      const decoded = jwtDecode<DecodedToken>(token);
      const role = decoded.role;

      const allowedRoles = moduleRules[selectedModule];

      if (!allowedRoles.includes(role)) {
        alert(`You are not allowed to access ${selectedModule.toUpperCase()} module`);
        return;
      }

      setAuth(token, role);
      router.push(moduleRedirects[selectedModule]);
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardContent className="p-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-500">
            {selectedModule} module
          </p>

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