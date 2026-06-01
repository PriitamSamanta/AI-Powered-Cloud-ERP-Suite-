"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

import {
  getLeaves,
  applyLeave,
  updateLeaveStatus,
  getMyLeaves,
} from "@/modules/hr/services/leave.service";

import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/page-header";
import TableWrapper from "@/components/shared/table-wrapper";
import FormSection from "@/components/shared/form-section";

import FormField from "@/components/shared/form-field";
import StatCard from "@/components/shared/stat-card";

import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Plane,
} from "lucide-react";

export default function LeavePage() {

  const { role } = useAuthStore();

  const isEmployee = role === "employee";
  const [formData, setFormData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
  });

  const { data: leaves, refetch } = useQuery({
    queryKey: [
      isEmployee
        ? "my-leaves"
        : "leaves",
    ],
    queryFn: isEmployee
      ? getMyLeaves
      : getLeaves,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleApply = async () => {
    try {
      await applyLeave(formData);

      alert("Leave applied");

      refetch();

      setFormData({
        reason: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to apply leave");
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updateLeaveStatus(id, status);

      refetch();
    } catch (error) {
      console.error(error);

      alert("Failed to update leave status");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={
          isEmployee
            ? "My Leaves"
            : "Leave Management"
        }
        description={
          isEmployee
            ? "Apply for leave and track request status."
            : "Track and manage employee leave requests."
        }
      />

      {isEmployee && (
        <Card className="rounded-3xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">
              Leave Summary
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">
                  Total Requests
                </p>

                <p className="text-2xl font-bold">
                  {leaves?.length ?? 0}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <p className="text-2xl font-bold text-yellow-600">
                  {leaves?.filter(
                    (leave: any) =>
                      leave.status?.toLowerCase() ===
                      "pending"
                  ).length ?? 0}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Approved
                </p>

                <p className="text-2xl font-bold text-green-600">
                  {leaves?.filter(
                    (leave: any) =>
                      leave.status?.toLowerCase() ===
                      "approved"
                  ).length ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!isEmployee && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Requests"
            value={leaves?.length ?? 0}
            icon={CalendarDays}
            trend="+4.2%"
            trendType="up"
          />

          <StatCard
            title="Approved"
            value={
              leaves?.filter(
                (leave: any) =>
                  leave.status?.toLowerCase() === "approved"
              ).length ?? 0
            }
            icon={CheckCircle2}
            trend="+2.3%"
            trendType="up"
          />

          <StatCard
            title="Pending"
            value={
              leaves?.filter(
                (leave: any) =>
                  leave.status?.toLowerCase() === "pending"
              ).length ?? 0
            }
            icon={Clock3}
            trend="+1.2%"
            trendType="up"
          />

          <StatCard
            title="Rejected"
            value={
              leaves?.filter(
                (leave: any) =>
                  leave.status?.toLowerCase() === "rejected"
              ).length ?? 0
            }
            icon={XCircle}
            trend="-0.8%"
            trendType="down"
          />
        </div>
      )}

      {/* Leave Form */}
      <FormSection title="Leave Form" description="Apply For Leave.">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
              "
            >
              <Plane className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Apply Leave
              </h2>

              <p className="text-slate-500">
                Submit leave requests for approval.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Reason">
              <Input
                className="
                h-12
                rounded-xl
                border-slate-200
              "
                placeholder="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Start-Date">
              <Input
                className="
                  h-12
                  rounded-xl
                  border-slate-200
                "
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="End-Date">
              <Input
                className="
                  h-12
                  rounded-xl
                  border-slate-200
                "
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleApply}
              className="
              h-12
              rounded-xl
              px-8
              bg-blue-600
              hover:bg-blue-700
            "
            >
              <Plane className="mr-2 h-4 w-4" />
              Apply Leave
            </Button>
          </div>
        </CardContent>
      </FormSection>

      {/* toolbar */}

      {!isEmployee && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder="Search leave requests..."
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

      {/* Leave Table */}
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
              ? "My Leave Requests"
              : "Leave Requests"}
          </h2>

          <TableWrapper>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reason</TableHead>

                  <TableHead>Start Date</TableHead>

                  <TableHead>End Date</TableHead>

                  <TableHead>Status</TableHead>

                  {!isEmployee && (
                    <TableHead>Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {leaves?.map((leave: any) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.reason}</TableCell>

                    <TableCell>
                      {new Date(leave.startDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {new Date(leave.endDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <span
                        className={
                          leave.status?.toLowerCase() === "approved"
                            ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                            : leave.status?.toLowerCase() === "pending"
                              ? "rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700"
                              : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                        }
                      >
                        {leave.status}
                      </span>
                    </TableCell>
                    {!isEmployee && (
                      <TableCell className="space-x-2">
                        <Button
                          className="rounded-xl"
                          size="sm"
                          onClick={() => handleStatusUpdate(leave.id, "approved")}
                        >
                          Approve
                        </Button>

                        <Button
                          className="rounded-xl"
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusUpdate(leave.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    )}
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
