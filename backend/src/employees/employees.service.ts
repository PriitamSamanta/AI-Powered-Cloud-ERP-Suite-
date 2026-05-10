import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async onboardEmployee(data: any) {
    // Check existing user
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create User
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: 'employee',
      },
    });

    // Create Employee
    const employee = await this.prisma.employee.create({
      data: {
        name: data.name,
        email: data.email,
        department: data.department,
        position: data.position,
        salary: data.salary,
        userId: user.id,
      },
    });

    return {
      message: 'Employee onboarded successfully',
      user,
      employee,
    };
  }

  create(data: any) {
    return this.prisma.employee.create({ data });
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  findOne(id: number) {
    return this.prisma.employee.findUnique({
      where: { id },
    });
  }

  update(id: number, data: any) {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
