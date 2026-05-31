"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { sidebarConfig } from "@/config/sidebar";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

type ModuleType = "hr" | "finance" | "bi";

function getCurrentModule(pathname: string): ModuleType {
  if (pathname.startsWith("/dashboard/finance")) return "finance";
  if (pathname.startsWith("/dashboard/bi")) return "bi";
  return "hr";
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { role, logout } = useAuthStore();

  const currentModule = getCurrentModule(pathname);

  const items =
    sidebarConfig[currentModule][
    role as keyof (typeof sidebarConfig)[typeof currentModule]
    ] || [];

  const moduleTitle = {
    hr: "HR Module",
    finance: "Finance Module",
    bi: "Business Intelligence",
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside
      className="
    fixed
    left-0
    top-0
    h-screen
    w-64
    flex
    flex-col
    bg-[#0D1B2A]
    border-r
    border-white/10
    z-50
  "
    >
      {/* Header */}
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-cyan-500
              text-lg
              font-bold
              text-white
            "
          >
            A
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              AMDOX ERP
            </h1>

            <p className="text-xs text-slate-400">
              Enterprise Suite
            </p>
          </div>
        </div>

        <div
          className="
            mt-5
            rounded-2xl
            bg-white/5
            p-3
          "
        >
          <p className="text-xs text-slate-400">
            Logged in as
          </p>

          <p className="mt-1 font-semibold uppercase text-white">
            {role || "Guest"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {moduleTitle[currentModule]}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {items.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200
                ${isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <Icon className="h-5 w-5" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="
            w-full
            justify-start
            text-slate-300
            hover:bg-red-500
            hover:text-white
          "
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Version 1.0
          </p>
        </div>
      </div>
    </aside>
  );
}