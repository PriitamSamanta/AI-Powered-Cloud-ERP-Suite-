import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkIn(user: any) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        userId: user.userId,
      },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return this.prisma.attendance.create({
      data: {
        employeeId: employee.id,
        checkIn: new Date(),
      },
    });
  }

  async checkOut(id: number) {
    return this.prisma.attendance.update({
      where: { id },
      data: {
        checkOut: new Date(),
      },
    });
  }

  async getMyAttendance(user: any) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        userId: user.userId,
      },
    });

    return this.prisma.attendance.findMany({
      where: {
        employeeId: employee?.id,
      },
    });
  }

  async findAll() {
    return this.prisma.attendance.findMany({
      include: {
        employee: true,
      },
    });
  }
}
