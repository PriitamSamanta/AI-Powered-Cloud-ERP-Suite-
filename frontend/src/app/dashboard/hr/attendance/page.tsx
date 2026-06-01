"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

import { checkIn, getAttendance, checkOut, getMyAttendance } from "@/modules/hr/services/attendance.service";

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
  Badge,
} from "lucide-react";



import StatCard from "@/components/shared/stat-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AttendancePage() {
  const { role } = useAuthStore();

  const isEmployee = role === "employee";
  const [search, setSearch] = useState("");

  const { data: attendance, refetch } = useQuery({
    queryKey: ["attendance"],
    queryFn: isEmployee
      ? getMyAttendance
      : getAttendance
  });

  const todayAttendance = attendance?.find(
    (record: any) => {
      const recordDate = new Date(record.date);
      const today = new Date();

      return (
        recordDate.toDateString() ===
        today.toDateString()
      );
    }
  );

  const checkInMutation =
    useMutation({
      mutationFn: checkIn,
      onSuccess: () => refetch(),
    });

  const checkOutMutation =
    useMutation({
      mutationFn: checkOut,
      onSuccess: () => refetch(),
    });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Attendance"
        description="Monitor employee attendance and working hours."
      />

      {!isEmployee && (
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
      )}

      {!isEmployee && (
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
      )}

      {isEmployee && (
        <Card className="rounded-3xl border border-slate-200">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold">
              Today's Attendance
            </h2>

            <p className="mt-2 text-slate-500">
              Track your workday and attendance status.
            </p>

            <div className="mt-4 space-y-2">
              {todayAttendance?.checkIn && (
                <p>
                  Check In:
                  {" "}
                  {new Date(
                    todayAttendance.checkIn
                  ).toLocaleTimeString()}
                </p>
              )}

              {todayAttendance?.checkOut && (
                <p>
                  Check Out:
                  {" "}
                  {new Date(
                    todayAttendance.checkOut
                  ).toLocaleTimeString()}
                </p>
              )}

              {todayAttendance?.workingHours && (
                <p>
                  Working Hours:
                  {" "}
                  {Number(
                    todayAttendance.workingHours
                  ).toFixed(2)}
                </p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              {!todayAttendance && (
                <Button
                  onClick={() =>
                    checkInMutation.mutate()
                  }
                >
                  Check In
                </Button>
              )}

              {todayAttendance &&
                !todayAttendance.checkOut && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      checkOutMutation.mutate(
                        todayAttendance.id
                      )
                    }
                  >
                    Check Out
                  </Button>
                )}

              {todayAttendance?.checkOut && (
                <Badge
                  className="
                    bg-green-100
                    text-green-700
                  "
                >
                  Attendance Completed
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
            {isEmployee
              ? "My Attendance History"
              : "Attendance Records"}
          </h2>
          <TableWrapper>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>

                  {!isEmployee && (
                    <TableHead>Employee</TableHead>
                  )}

                  <TableHead>Status</TableHead>

                  <TableHead>Check In</TableHead>

                  <TableHead>Check Out</TableHead>

                  <TableHead>Working Hours</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {attendance?.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={isEmployee ? 5 : 6}
                      className="text-center text-slate-500"
                    >
                      No attendance records found.
                    </TableCell>
                  </TableRow>
                )}

                {attendance?.map((record: any) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {new Date(record.createdAt).toLocaleDateString()}
                    </TableCell>

                    {!isEmployee && (
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
                    )}

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
