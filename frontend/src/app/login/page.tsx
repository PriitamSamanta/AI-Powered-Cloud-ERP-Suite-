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

type ModuleType = "hr" | "finance" | "bi" | "employee";

const moduleRules: Record<ModuleType, string[]> = {
  hr: ["admin", "hr"],
  finance: ["admin", "hr"],
  bi: ["hr"],
  employee: ["employee"],
};

const moduleRedirects: Record<ModuleType, string> = {
  hr: "/dashboard/hr",
  finance: "/dashboard/finance",
  bi: "/dashboard/bi",
  employee: "/dashboard/hr",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedModule = (searchParams.get("module") || "hr") as ModuleType;

  const { setAuth } = useAuthStore();
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log("LOGIN DATA:", data);
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
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/newback2.jpeg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Login Card */}
      <Card
        className="
        relative
        z-10
        w-full
        max-w-md
        border
        border-white/20
        bg-white/10
        shadow-2xl
        backdrop-blur-xl
        rounded-3xl
      "
      >
        <CardContent className="p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div
              className="
              mx-auto
              mb-4
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-white/20
              text-2xl
              font-bold
              text-white
            "
            >
              A
            </div>

            <h1 className="text-3xl font-bold text-white">
              AMDOX ERP
            </h1>

            <p className="mt-2 text-sm text-white/70">
              Enterprise Resource Planning Suite
            </p>
          </div>

          {/* Module Badge */}
          <div className="mb-6 flex justify-center">
            <span
              className="
              rounded-full
              border
              border-white/20
              bg-white/10
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-white
            "
            >
              {selectedModule} Module
            </span>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <Input
                placeholder="Email Address"
                type="email"
                {...register("email",{ required: "Email is required", })}
                className="
                h-12
                rounded-full
                border-white/20
                bg-white/10
                text-white
                placeholder:text-white/60
                focus:border-white/40
              "
              />
            </div>

            <div>
              <Input
                placeholder="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="
                h-12
                rounded-full
                border-white/20
                bg-white/10
                text-white
                placeholder:text-white/60
                focus:border-white/40
              "
              />
            </div>

            <Button
              type="submit"
              className="
              h-12
              w-full
              rounded-full
              bg-[#1B263B]
              text-white
              hover:bg-[#0D1B2A]
              transition-all
              duration-300
            "

            >
              Login
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/60">
              Human Resources • Finance • BI • Employee
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}