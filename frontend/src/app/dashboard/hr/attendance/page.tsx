"use client";

import { useQuery } from "@tanstack/react-query";

import { getAttendance } from "@/modules/hr/services/attendance.service";

import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableWrapper from "@/components/shared/table-wrapper";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/shared/page-header";
import {
  CalendarCheck,
  Clock3,
  UserCheck,
  UserX,
  Download,
  FileText,
} from "lucide-react";

import StatCard from "@/components/shared/stat-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AttendancePage() {
  const [search, setSearch] = useState("");

  const { data: attendance, refetch } = useQuery({
    queryKey: ["attendance"],
    queryFn: getAttendance,
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Attendance"
        description="Monitor employee attendance and working hours."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Records"
          value={attendance?.length ?? 0}
          icon={CalendarCheck}
          trend="+5.2%"
          trendType="up"
        />

        <StatCard
          title="Present"
          value={
            attendance?.filter(
              (a: any) => a.status === "present"
            ).length ?? 0
          }
          icon={UserCheck}
          trend="+3.1%"
          trendType="up"
        />

        <StatCard
          title="Absent"
          value={
            attendance?.filter(
              (a: any) => a.status === "absent"
            ).length ?? 0
          }
          icon={UserX}
          trend="-1.8%"
          trendType="down"
        />

        <StatCard
          title="Avg Hours"
          value={
            attendance?.length
              ? (
                attendance.reduce(
                  (sum: number, item: any) =>
                    sum +
                    (item.workingHours || 0),
                  0
                ) / attendance.length
              ).toFixed(1)
              : 0
          }
          icon={Clock3}
          trend="+2.4%"
          trendType="up"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search attendance..."
          className="max-w-md rounded-2xl"
        />

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>

          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Attendance Table */}
      <Card
        className="
        rounded-3xl
        border
        border-slate-200
        shadow-sm
      "
      >
        <CardContent className="p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Attendance Records
          </h2>

          <TableWrapper>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>

                  <TableHead>Employees</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead>Check In</TableHead>

                  <TableHead>Check Out</TableHead>

                  <TableHead>Working Hours</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {attendance?.map((record: any) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {new Date(record.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-blue-100
                          text-sm
                          font-semibold
                          text-blue-700
                        "
                        >
                          {record.employee?.name?.charAt(0)}
                        </div>

                        <span className="font-medium">
                          {record.employee?.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span
                        className={
                          record.status === "present"
                            ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                            : record.status === "leave"
                              ? "rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700"
                              : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                        }
                      >
                        {record.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      {record.checkIn
                        ? new Date(record.checkIn).toLocaleTimeString()
                        : "-"}
                    </TableCell>

                    <TableCell>
                      {record.checkOut
                        ? new Date(record.checkOut).toLocaleTimeString()
                        : "-"}
                    </TableCell>

                    <TableCell>
                      {record.workingHours
                        ? `${record.workingHours.toFixed(2)} hrs`
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </CardContent>
      </Card>
    </div>
  );
}
