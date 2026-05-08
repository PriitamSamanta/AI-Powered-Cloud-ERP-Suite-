import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async apply(data: any, user: any) {
    // 🔍 Find employee linked to user
    const employee = await this.prisma.employee.findFirst({
      where: {
        userId: user.userId,
      },
    });

    if (!employee) {
      throw new Error('Employee not found for this user');
    }

    return this.prisma.leave.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        employeeId: employee.id, //
      },
    });
  }

  findAll() {
    return this.prisma.leave.findMany({
      include: { employee: true },
    });
  }

  updateStatus(id: number, status: string) {
    return this.prisma.leave.update({
      where: { id },
      data: { status },
    });
  }

  async getMyLeaves(user: any) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        userId: user.userId,
      },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return this.prisma.leave.findMany({
      where: {
        employeeId: employee.id,
      },
    });
  }
}
