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

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function EmployeesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    salary: "",
  });

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Employees</h1>

        <p className="text-muted-foreground">Manage employees and onboarding</p>
      </div>

      {/* Onboarding Form */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Onboard Employee</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Input
              placeholder="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />

            <Input
              placeholder="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />

            <Input
              placeholder="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleSubmit}>Add Employee</Button>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Employee List</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>

                <TableHead>Email</TableHead>

                <TableHead>Department</TableHead>

                <TableHead>Position</TableHead>

                <TableHead>Salary</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employees?.map((employee: any) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
