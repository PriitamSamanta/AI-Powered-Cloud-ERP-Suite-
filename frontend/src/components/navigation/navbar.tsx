"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const router = useRouter();

  const { logout, role } = useAuthStore();

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold capitalize">{role} Dashboard</h2>

        <p className="text-sm text-muted-foreground">Welcome back 👋</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium capitalize">{role}</p>

          <p className="text-xs text-muted-foreground">ERP User</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
