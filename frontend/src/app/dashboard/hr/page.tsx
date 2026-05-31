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
    return (
      <div className="space-y-6">
        <div className="h-36 animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Human Resources"
        description="Monitor employees, attendance, leave and payroll operations."
      />

      {/* Executive Banner */}
      <div
        className="
        rounded-3xl
        bg-gradient-to-r
        from-slate-900
        via-slate-800
        to-slate-900
        p-8
        text-white
        shadow-xl
      "
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Workforce Overview
            </h1>

            <p className="mt-2 text-slate-300">
              Manage employees, attendance,
              leave requests and payroll
              activities from one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div>
              <p className="text-sm text-slate-400">
                Employees
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {data?.totalEmployees ?? 0}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Present
              </p>

              <h2 className="mt-1 text-2xl font-bold text-emerald-400">
                {data?.presentToday ?? 0}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Leaves
              </p>

              <h2 className="mt-1 text-2xl font-bold text-yellow-400">
                {data?.pendingLeaves ?? 0}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Payroll
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {data?.totalPayrolls ?? 0}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Employees"
          value={data?.totalEmployees || 0}
          icon={Users}
          trend="+4.2%"
          trendType="up"
        />

        <StatCard
          title="Present Today"
          value={data?.presentToday || 0}
          icon={UserCheck}
          trend="+2.1%"
          trendType="up"
        />

        <StatCard
          title="Absent Today"
          value={data?.absentToday || 0}
          icon={Clock}
          trend="-1.4%"
          trendType="down"
        />

        <StatCard
          title="Pending Leaves"
          value={data?.pendingLeaves || 0}
          icon={Calendar}
          trend="+3.0%"
          trendType="up"
        />

        <StatCard
          title="Payroll Records"
          value={data?.totalPayrolls || 0}
          icon={Wallet}
          trend="+8.5%"
          trendType="up"
        />
      </div>
    </div>
  );
}
