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
    bi: "BI Module",
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r bg-white">
      <div className="border-b px-6 py-5">
        <h1 className="text-2xl font-bold tracking-tight">Cloud ERP</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {moduleTitle[currentModule]}
        </p>

        <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm">
          <p className="text-gray-500">Logged in as</p>
          <p className="font-semibold uppercase">{role || "Guest"}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-black text-white shadow"
                  : "text-muted-foreground hover:bg-muted hover:text-black"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t p-4">
        <Button
          variant="outline"
          className="flex w-full items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>

        <p className="text-sm text-muted-foreground">AI Powered Cloud ERP</p>
      </div>
    </aside>
  );
}