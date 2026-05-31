"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getEmployees,
  onboardEmployee,
} from "@/modules/hr/services/employee.service";

import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/shared/stat-card";

import {
  Users,
  UserCheck,
  Building2,
  Download,
  FileText,
  UserPlus,
} from "lucide-react";

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
import FormSection from "@/components/shared/form-section";

import FormField from "@/components/shared/form-field";
import PageHeader from "@/components/shared/page-header";

export default function EmployeesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    salary: "",
  });

  const [search, setSearch] = useState("");

  const { data: employees, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await onboardEmployee({
        ...formData,
        salary: Number(formData.salary),
      });

      alert("Employee onboarded successfully");

      refetch();

      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        position: "",
        salary: "",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to onboard employee");
    }
  };

  const filteredEmployees =
    employees?.filter(
      (employee: any) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Employees"
        description="Manage employee onboarding and records."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Employees"
          value={employees?.length ?? 0}
          icon={Users}
          trend="+4.2%"
          trendType="up"
        />

        <StatCard
          title="Departments"
          value={
            new Set(
              employees?.map(
                (employee: any) =>
                  employee.department,
              ),
            ).size
          }
          icon={Building2}
          trend="+2.1%"
          trendType="up"
        />

        <StatCard
          title="Active Employees"
          value={employees?.length ?? 0}
          icon={UserCheck}
          trend="+3.8%"
          trendType="up"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search employees..."
          className="
      max-w-md
      rounded-2xl
      border-slate-200
      bg-white
    "
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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

      {/* Onboarding Form */}
      <FormSection
        title="Onboard Employee"
        description="Create and manage employee accounts."
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
              <UserPlus className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Onboard Employee
              </h2>

              <p className="text-slate-500">
                Create and manage employee accounts.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField label="Full Name">
              <Input
                className="
            h-12
            rounded-xl
            border-slate-200
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
                placeholder="Enter full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Email Address">
              <Input
                className="
            h-12
            rounded-xl
            border-slate-200
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
                placeholder="Enter email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Password">
              <Input
                className="
            h-12
            rounded-xl
            border-slate-200
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
                placeholder="Enter password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Department">
              <Input
                className="
            h-12
            rounded-xl
            border-slate-200
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
                placeholder="Select department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Position">
              <Input
                className="
            h-12
            rounded-xl
            border-slate-200
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
                placeholder="Enter position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Salary">
              <Input
                className="
            h-12
            rounded-xl
            border-slate-200
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
                placeholder="Enter salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              size="lg"
              onClick={handleSubmit}
              className="
              h-12
              rounded-xl
              px-8
              bg-gradient-to-r
              from-blue-600
              to-blue-500
              hover:from-blue-700
              hover:to-blue-600
              shadow-md
            "
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </CardContent>
      </FormSection>

      {/* Employee Table */}
      <Card
        className="
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        "
      >
        <CardContent className="p-6">
          <h2 className="mb-6 text-2xl font-bold">Employee Directory</h2>
          <TableWrapper>
            <Table className="overflow-hidden">
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-muted/50 transition-colors">
                  <TableHead>Name</TableHead>

                  <TableHead>Email</TableHead>

                  <TableHead>Department</TableHead>

                  <TableHead>Position</TableHead>

                  <TableHead>Salary</TableHead>

                  <TableHead>Status</TableHead>


                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredEmployees.map((employee: any) => (
                  <TableRow key={employee.id} className="hover:bg-slate-50">
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
                          {employee.name
                            ?.split(' ')
                            .map((n: string) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-medium text-slate-900">
                            {employee.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            Employee
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{employee.email}</TableCell>

                    <TableCell>
                      <span
                        className="
                        rounded-full
                        bg-blue-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-blue-700
                      "
                      >
                        {employee.department}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className="
                        rounded-full
                        bg-purple-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-purple-700
                      "
                      >
                        {employee.position}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="font-semibold text-emerald-600">
                        ₹{Number(
                          employee.salary,
                        ).toLocaleString()}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className="
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-green-700
                      "
                      >
                        Active
                      </span>
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
