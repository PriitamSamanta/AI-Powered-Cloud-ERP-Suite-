"use client";

import Link from "next/link";

import { useAuthStore } from "@/store/authStore";

import { sidebarConfig } from "@/config/sidebar";

export default function Sidebar() {
  const { role } = useAuthStore();

  const items = sidebarConfig[role as keyof typeof sidebarConfig] || [];

  return (
    <div className="w-64 min-h-screen border-r bg-background p-4">
      <h1 className="mb-8 text-2xl font-bold">ERP</h1>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
            >
              <Icon className="h-5 w-5" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
