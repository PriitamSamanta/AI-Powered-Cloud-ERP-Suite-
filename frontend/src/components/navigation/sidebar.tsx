"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { sidebarConfig } from "@/config/sidebar";

import { useAuthStore } from "@/store/authStore";

export default function Sidebar() {
  const pathname = usePathname();

  const { role } = useAuthStore();

  const items = sidebarConfig[role as keyof typeof sidebarConfig] || [];

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r bg-white">
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <h1 className="text-2xl font-bold tracking-tight">Cloud ERP</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          HR & Payroll System
        </p>
      </div>

      {/* Navigation */}
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

      {/* Footer */}
      <div className="border-t p-4 text-sm text-muted-foreground">
        AI Powered Cloud ERP
      </div>
    </aside>
  );
}
