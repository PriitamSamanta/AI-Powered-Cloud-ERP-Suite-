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
import StatCard from "@/components/shared/stat-card";

import {
  Wallet,
  IndianRupee,
  Download,
  FileText,
  Receipt,
  TrendingUp,
  Landmark,
} from "lucide-react";

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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Payroll Records"
          value={payrolls?.length ?? 0}
          icon={Receipt}
          trend="+6.2%"
          trendType="up"
        />

        <StatCard
          title="Total Payroll"
          value={`₹${payrolls?.reduce(
            (sum: number, item: any) =>
              sum + item.netSalary,
            0
          ) ?? 0
            }`}
          icon={Wallet}
          trend="+4.1%"
          trendType="up"
        />

        <StatCard
          title="Bonuses Paid"
          value={`₹${payrolls?.reduce(
            (sum: number, item: any) =>
              sum + item.bonus,
            0
          ) ?? 0
            }`}
          icon={TrendingUp}
          trend="+3.0%"
          trendType="up"
        />

        <StatCard
          title="Deductions"
          value={`₹${payrolls?.reduce(
            (sum: number, item: any) =>
              sum + item.deductions,
            0
          ) ?? 0
            }`}
          icon={Landmark}
          trend="-1.4%"
          trendType="down"
        />
      </div>

      {/* Payroll Form */}
      <FormSection
        title="Generate Payroll"
        description="Create salary records and employee payslips."
      >
        <CardContent className="space-y-8 p-8">
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
              <Wallet className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Generate Payroll
              </h2>

              <p className="text-slate-500">
                Create salary records and employee payslips.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label="EmployeeID">
                <Input
                  className="
                  h-12
                  rounded-xl
                  border-slate-200
                "
                  placeholder="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </FormField>

              <FormField label="Basic Salary">
                <Input
                  className="
                  h-12
                  rounded-xl
                  border-slate-200
                "
                  placeholder="Basic Salary"
                  name="basicSalary"
                  value={formData.basicSalary}
                  onChange={handleChange}
                />
              </FormField>

              <FormField label="Bonus">
                <Input
                  className="
                  h-12
                  rounded-xl
                  border-slate-200
                "
                  placeholder="Bonus"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleChange}
                />
              </FormField>

              <FormField label="Deductions">
                <Input
                  className="
                  h-12
                  rounded-xl
                  border-slate-200
                "
                  placeholder="Deductions"
                  name="deductions"
                  value={formData.deductions}
                  onChange={handleChange}
                />
              </FormField>
            </div>

            <Button
              onClick={handleGenerate}
              className="
                h-12
                rounded-xl
                bg-blue-600
                px-8
                hover:bg-blue-700
              "
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Generate Payroll
            </Button>
          </div>
        </CardContent>
      </FormSection>


      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search payroll..."
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

      {/* Payroll Table */}
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
            Payroll Records
          </h2>
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

                    <TableCell>
                      <span className="font-semibold text-emerald-600">
                        ₹{Number(
                          payroll.netSalary
                        ).toLocaleString()}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() =>
                          handleDownload(payroll.id)
                        }
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Payslip
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
