import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  Wallet,
  BarChart3,
  Landmark,
  ReceiptText,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Lock,
} from "lucide-react";

export const sidebarConfig = {
  hr: {
    admin: [
      { label: "HR Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
      { label: "Employees", href: "/dashboard/hr/employees", icon: Users },
      { label: "Leave", href: "/dashboard/hr/leave", icon: Calendar },
      { label: "Attendance", href: "/dashboard/hr/attendance", icon: Clock },
      { label: "Payroll", href: "/dashboard/hr/payroll", icon: Wallet },
    ],

    hr: [
      { label: "HR Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
      { label: "Employees", href: "/dashboard/hr/employees", icon: Users },
      { label: "Leave", href: "/dashboard/hr/leave", icon: Calendar },
      { label: "Attendance", href: "/dashboard/hr/attendance", icon: Clock },
      { label: "Payroll", href: "/dashboard/hr/payroll", icon: Wallet },
    ],

    employee: [
      { label: "Employee Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
      { label: "My Leave", href: "/dashboard/hr/leave", icon: Calendar },
      { label: "My Attendance", href: "/dashboard/hr/attendance", icon: Clock },
      { label: "My Payroll", href: "/dashboard/hr/payroll", icon: Wallet },
    ],
  },

  finance: {
    admin: [
      { label: "Finance Dashboard", href: "/dashboard/finance", icon: LayoutDashboard },
      { label: "Accounts", href: "/dashboard/finance/accounts", icon: Landmark },
      { label: "Income", href: "/dashboard/finance/income", icon: TrendingUp },
      { label: "Expense", href: "/dashboard/finance/expense", icon: TrendingDown },
      { label: "Journal", href: "/dashboard/finance/journal", icon: BookOpen },
      { label: "Periods", href: "/dashboard/finance/periods", icon: Lock },
    ],

    hr: [
      { label: "Finance Dashboard", href: "/dashboard/finance", icon: LayoutDashboard },
      { label: "Income", href: "/dashboard/finance/income", icon: TrendingUp },
      { label: "Expense", href: "/dashboard/finance/expense", icon: TrendingDown },
      { label: "Journal", href: "/dashboard/finance/journal", icon: BookOpen },
    ],

    employee: [],
  },

  bi: {
    admin: [],

    hr: [
      { label: "BI Dashboard", href: "/dashboard/bi", icon: BarChart3 },
    ],

    employee: [],
  },
};