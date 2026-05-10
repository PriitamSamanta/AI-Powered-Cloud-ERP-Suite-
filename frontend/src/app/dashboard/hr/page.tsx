"use client";

import { useQuery } from "@tanstack/react-query";

import { getHRDashboard } from "@/modules/hr/services/dashboard.service";

import { Card, CardContent } from "@/components/ui/card";

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
      <h1 className="mb-6 text-3xl font-bold">HR Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium">Total Employees</h2>

            <p className="mt-2 text-3xl font-bold">{data?.totalEmployees}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium">Present Today</h2>

            <p className="mt-2 text-3xl font-bold">{data?.presentToday}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium">Absent Today</h2>

            <p className="mt-2 text-3xl font-bold">{data?.absentToday}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium">Pending Leaves</h2>

            <p className="mt-2 text-3xl font-bold">{data?.pendingLeaves}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium">Payroll Records</h2>

            <p className="mt-2 text-3xl font-bold">{data?.totalPayrolls}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
