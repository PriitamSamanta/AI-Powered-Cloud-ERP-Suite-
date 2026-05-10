"use client";

import { useRouter } from "next/navigation";

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
    <div className="flex items-center justify-between border-b p-4">
      <h2 className="text-xl font-semibold">{role?.toUpperCase()} Dashboard</h2>

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
