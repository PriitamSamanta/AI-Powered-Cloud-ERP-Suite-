"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getEmployees,
  onboardEmployee,
} from "@/modules/hr/services/employee.service";

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

      <div className="flex items-center justify-between">
        <Input
          placeholder="Search employees..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Onboarding Form */}
      <FormSection
        title="Onboard Employee"
        description="Create and manage employee accounts."
      >
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Onboard Employee</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Name">
              <Input
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Email">
              <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Password">
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Department">
              <Input
                placeholder="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Position">
              <Input
                placeholder="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Salary">
              <Input
                placeholder="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleSubmit}>
              Add Employee
            </Button>
          </div>
        </CardContent>
      </FormSection>

      {/* Employee Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Employee List</h2>
          <TableWrapper>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/50 transition-colors">
                  <TableHead>Name</TableHead>

                  <TableHead>Email</TableHead>

                  <TableHead>Department</TableHead>

                  <TableHead>Position</TableHead>

                  <TableHead>Salary</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredEmployees.map((employee: any) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>

                    <TableCell>{employee.email}</TableCell>

                    <TableCell>{employee.department}</TableCell>

                    <TableCell>{employee.position}</TableCell>

                    <TableCell>₹{employee.salary}</TableCell>
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
