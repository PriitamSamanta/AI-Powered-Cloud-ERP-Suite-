import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getHRDashboard() {
    // Total employees
    const totalEmployees = await this.prisma.employee.count();

    // Present today
    const presentToday = await this.prisma.attendance.count({
      where: {
        status: 'present',
      },
    });

    // Absent today
    const absentToday = await this.prisma.attendance.count({
      where: {
        status: 'absent',
      },
    });

    // Pending leave requests
    const pendingLeaves = await this.prisma.leave.count({
      where: {
        status: 'pending',
      },
    });

    // Payroll records
    const totalPayrolls = await this.prisma.payroll.count();

    return {
      totalEmployees,
      presentToday,
      absentToday,
      pendingLeaves,
      totalPayrolls,
    };
  }
}
