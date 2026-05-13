"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getLeaves,
  applyLeave,
  updateLeaveStatus,
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

export default function LeavePage() {
  const [formData, setFormData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
  });

  const { data: leaves, refetch } = useQuery({
    queryKey: ["leaves"],
    queryFn: getLeaves,
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
        title="Leave Management"
        description="Track and manage employee leave requests."
      />

      {/* Leave Form */}
      <FormSection title="Leave Form" description="Apply For Leave.">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Apply Leave</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Reason">
              <Input
                placeholder="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Start-Date">
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="End-Date">
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleApply}>
              Apply Leave
            </Button>
          </div>
        </CardContent>
      </FormSection>

      {/* Leave Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Leave Requests</h2>

          <TableWrapper>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reason</TableHead>

                  <TableHead>Start Date</TableHead>

                  <TableHead>End Date</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead>Actions</TableHead>
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

                    <TableCell>{leave.status}</TableCell>

                    <TableCell className="space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(leave.id, "approved")}
                      >
                        Approve
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusUpdate(leave.id, "rejected")}
                      >
                        Reject
                      </Button>
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
