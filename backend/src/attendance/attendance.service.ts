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

    // Today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Check existing attendance
    const existingAttendance = await this.prisma.attendance.findFirst({
      where: {
        employeeId: employee.id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingAttendance) {
      throw new Error('You have already checked in today');
    }

    return this.prisma.attendance.create({
      data: {
        employeeId: employee.id,
        checkIn: new Date(),
      },
    });
  }

  async checkOut(id: number) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
    });

    if (!attendance || !attendance.checkIn) {
      throw new Error('No check-in found');
    }

    if (attendance.checkOut) {
      throw new Error('Already checked out');
    }

    const checkOutTime = new Date();

    // Calculate working hours
    const diffMs = checkOutTime.getTime() - attendance.checkIn.getTime();

    const workingHours = diffMs / (1000 * 60 * 60);

    return this.prisma.attendance.update({
      where: { id },
      data: {
        checkOut: checkOutTime,
        workingHours,
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
