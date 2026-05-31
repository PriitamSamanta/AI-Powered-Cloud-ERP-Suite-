"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import Sidebar from "@/components/navigation/sidebar";
import { useAuthStore } from "@/store/authStore";

type ModuleType = "hr" | "finance" | "bi";

const moduleRules: Record<ModuleType, string[]> = {
  hr: ["admin", "hr", "employee"],
  finance: ["admin", "hr"],
  bi: ["hr"],
};

function getCurrentModule(
  pathname: string
): ModuleType {
  if (
    pathname.startsWith(
      "/dashboard/finance"
    )
  )
    return "finance";

  if (
    pathname.startsWith("/dashboard/bi")
  )
    return "bi";

  return "hr";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { role, loadAuth } =
    useAuthStore();

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    const currentModule =
      getCurrentModule(pathname);

    const allowedRoles =
      moduleRules[currentModule];

    if (
      !role ||
      !allowedRoles.includes(role)
    ) {
      router.push("/");
    }
  }, [pathname, role, router]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main
        className="ml-72 p-8 min-h-screen"
      >
        {children}
      </main>
    </div>
  );
}