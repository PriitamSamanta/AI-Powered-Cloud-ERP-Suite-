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

export default function AttendancePage() {
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

      {/* Attendance Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Attendance Records</h2>

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

                    <TableCell>{record.employee?.name}</TableCell>

                    <TableCell>{record.status}</TableCell>

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
