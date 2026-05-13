"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getPayrolls,
  generatePayroll,
  downloadPayslip,
} from "@/modules/hr/services/payroll.service";

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

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/page-header";

import FormSection from "@/components/shared/form-section";

import FormField from "@/components/shared/form-field";

export default function PayrollPage() {
  const [formData, setFormData] = useState({
    employeeId: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
  });

  const { data: payrolls, refetch } = useQuery({
    queryKey: ["payrolls"],
    queryFn: getPayrolls,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    try {
      await generatePayroll({
        employeeId: Number(formData.employeeId),

        basicSalary: Number(formData.basicSalary),

        bonus: Number(formData.bonus),

        deductions: Number(formData.deductions),
      });

      alert("Payroll generated");

      refetch();

      setFormData({
        employeeId: "",
        basicSalary: "",
        bonus: "",
        deductions: "",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to generate payroll");
    }
  };

  const handleDownload = async (id: number) => {
    try {
      const blob = await downloadPayslip(id);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `payslip-${id}.pdf`;

      link.click();
    } catch (error) {
      console.error(error);

      alert("Failed to download payslip");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Payroll"
        description="Generate salaries and manage payslips."
      />

      {/* Payroll Form */}
      <FormSection
        title="Onboard Employee"
        description="Create and manage employee accounts."
      >
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Generate Payroll</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="EmployeeID">
              <Input
                placeholder="Employee ID"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Basic Salary">
              <Input
                placeholder="Basic Salary"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Bonus">
              <Input
                placeholder="Bonus"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Deductions">
              <Input
                placeholder="Deductions"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <Button onClick={handleGenerate}>Generate Payroll</Button>
        </CardContent>
      </FormSection>

      {/* Payroll Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Payroll Records</h2>
          <TableWrapper>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>

                  <TableHead>Salary</TableHead>

                  <TableHead>Bonus</TableHead>

                  <TableHead>Deductions</TableHead>

                  <TableHead>Net Salary</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payrolls?.map((payroll: any) => (
                  <TableRow key={payroll.id}>
                    <TableCell>{payroll.employeeId}</TableCell>

                    <TableCell>₹{payroll.basicSalary}</TableCell>

                    <TableCell>₹{payroll.bonus}</TableCell>

                    <TableCell>₹{payroll.deductions}</TableCell>

                    <TableCell>₹{payroll.netSalary}</TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(payroll.id)}
                      >
                        Download
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
