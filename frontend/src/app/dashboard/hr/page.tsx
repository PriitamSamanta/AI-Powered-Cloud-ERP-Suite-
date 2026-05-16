"use client";

import { useQuery } from "@tanstack/react-query";

import { getHRDashboard } from "@/modules/hr/services/dashboard.service";

import PageHeader from "@/components/shared/page-header";
import { Users, Clock, Calendar, Wallet, UserCheck } from "lucide-react";
import StatCard from "@/components/shared/stat-card";

export default function HRDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["hr-dashboard"],
    queryFn: getHRDashboard,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageHeader
        title="HR Dashboard"
        description="Monitor employees, payroll, attendance and leave insights."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Employees"
          value={data?.totalEmployees || 0}
          icon={Users}
        />

        <StatCard
          title="Present Today"
          value={data?.presentToday || 0}
          icon={UserCheck}
        />

        <StatCard
          title="Absent Today"
          value={data?.absentToday || 0}
          icon={Clock}
        />

        <StatCard
          title="Pending Leaves"
          value={data?.pendingLeaves || 0}
          icon={Calendar}
        />

        <StatCard
          title="Payroll Records"
          value={data?.totalPayrolls || 0}
          icon={Wallet}
        />
      </div>
    </div>
  );
}
