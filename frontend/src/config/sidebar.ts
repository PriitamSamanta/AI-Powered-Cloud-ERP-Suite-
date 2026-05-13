import { LayoutDashboard, Users, Calendar, Clock, Wallet } from "lucide-react";

export const sidebarConfig = {
  admin: [
    {
      label: "Dashboard",
      href: "/dashboard/hr",
      icon: LayoutDashboard,
    },
    {
      label: "Employees",
      href: "/hr/employees",
      icon: Users,
    },
    {
      label: "Leave",
      href: "/hr/leave",
      icon: Calendar,
    },
    {
      label: "Attendance",
      href: "/hr/attendance",
      icon: Clock,
    },
    {
      label: "Payroll",
      href: "/hr/payroll",
      icon: Wallet,
    },
  ],

  hr: [
    {
      label: "Dashboard",
      href: "/dashboard/hr",
      icon: LayoutDashboard,
    },
    {
      label: "Employees",
      href: "/dashboard/hr/employees",
      icon: Users,
    },
    {
      label: "Leave",
      href: "/dashboard/hr/leave",
      icon: Calendar,
    },
    {
      label: "Attendance",
      href: "/dashboard/hr/attendance",
      icon: Clock,
    },
    {
      label: "Payroll",
      href: "/dashboard/hr/payroll",
      icon: Wallet,
    },
  ],

  employee: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Leave",
      href: "/hr/my-leave",
      icon: Calendar,
    },
    {
      label: "My Attendance",
      href: "/hr/my-attendance",
      icon: Clock,
    },
    {
      label: "My Payroll",
      href: "/hr/my-payroll",
      icon: Wallet,
    },
  ],
};
