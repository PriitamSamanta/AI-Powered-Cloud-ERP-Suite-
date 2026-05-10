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
      <div>
        <h1 className="text-3xl font-bold">Leave Management</h1>

        <p className="text-muted-foreground">Apply and manage leaves</p>
      </div>

      {/* Leave Form */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Apply Leave</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              placeholder="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            />

            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleApply}>Apply Leave</Button>
        </CardContent>
      </Card>

      {/* Leave Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Leave Requests</h2>

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
        </CardContent>
      </Card>
    </div>
  );
}
