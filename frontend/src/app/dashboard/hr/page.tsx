"use client";

import { useQuery } from "@tanstack/react-query";

import { getHRDashboard } from "@/modules/hr/services/dashboard.service";

import PageHeader from "@/components/shared/page-header";
import { Users, Clock, Calendar, Wallet, UserCheck } from "lucide-react";
import StatCard from "@/components/shared/stat-card";
import { useAuthStore } from "@/store/authStore";
import { getMyAttendance } from "@/modules/hr/services/attendance.service";
import { getMyLeaves } from "@/modules/hr/services/leave.service";
import { getMyPayrolls } from "@/modules/hr/services/payroll.service";
import { Card, CardContent } from "@/components/ui/card";


export default function HRDashboardPage() {

  const { role } = useAuthStore();
  const isEmployee = role === "employee";
  const { data, isLoading } = useQuery({
    queryKey: ["hr-dashboard"],
    queryFn: getHRDashboard,
  });

  const { data: myAttendance = [] } = useQuery({
    queryKey: ["my-attendance"],
    queryFn: getMyAttendance,
    enabled: isEmployee,
  });


  const todayAttendance = myAttendance.find(
    (record: any) =>
      new Date(record.date).toDateString() ===
      new Date().toDateString()
  );

  const {
    data: myLeaves = [],
  } = useQuery({
    queryKey: ["my-leaves"],
    queryFn: getMyLeaves,
    enabled: isEmployee,
  });

  const {
    data: myPayrolls = [],
  } = useQuery({
    queryKey: ["my-payrolls"],
    queryFn: getMyPayrolls,
    enabled: isEmployee,
  });

  const latestPayroll =
    myPayrolls[0];

  const pendingLeaves =
    myLeaves.filter(
      (leave: any) =>
        leave.status === "pending"
    ).length;

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
        title={
          isEmployee
            ? "Employee Dashboard"
            : "Human Resources"
        }
        description={
          isEmployee
            ? "Manage your attendance, leave requests and payroll."
            : "Monitor employees, attendance, leave and payroll operations."
        }
      />

      {isEmployee ? (
        <div
          className="
            rounded-3xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            p-8
            text-white
            shadow-xl
          "
        >
          <h1 className="text-3xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-blue-100">
            Access your attendance, leave requests
            and payroll information.
          </p>
        </div>
      ) : (
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
      )}

      {/* KPI Cards */}
      {isEmployee ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Attendance"
            value={
              todayAttendance
                ? "Present"
                : "Not Marked"
            }
            icon={UserCheck}
          />

          <StatCard
            title="Pending Leaves"
            value={pendingLeaves}
            icon={Calendar}
          />

          <StatCard
            title="Payroll Status"
            value={
              latestPayroll?.status ??
              "-"
            }
            icon={Wallet}
          />

          <StatCard
            title="Working Hours"
            value={
              todayAttendance?.workingHours
                ? Number(
                  todayAttendance
                    .workingHours
                ).toFixed(2)
                : "0"
            }
            icon={Clock}
          />

        </div>
      ) : (
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
      )}

      {isEmployee && (
        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="/dashboard/hr/attendance"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-bold">
              Attendance
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Check in and check out.
            </p>
          </a>

          <a
            href="/dashboard/hr/leave"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-bold">
              Leave Requests
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Apply and track leave.
            </p>
          </a>

          <a
            href="/dashboard/hr/payroll"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-bold">
              Payroll
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              View payslips and salary.
            </p>
          </a>
        </div>
      )}
      {isEmployee && (
        <Card className="rounded-3xl border border-slate-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">
              My Summary
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">
                  Latest Salary
                </p>

                <p className="text-2xl font-bold text-emerald-600">
                  ₹
                  {latestPayroll?.netSalary?.toLocaleString() ??
                    0}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Leave Requests
                </p>

                <p className="text-2xl font-bold">
                  {myLeaves.length}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Attendance Status
                </p>

                <p className="text-2xl font-bold">
                  {todayAttendance
                    ? "Present"
                    : "Not Marked"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
