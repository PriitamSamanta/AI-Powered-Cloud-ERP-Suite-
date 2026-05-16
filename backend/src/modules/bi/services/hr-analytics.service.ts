import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HrAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployeeKPIs() {
    const totalEmployees = await this.prisma.employee.count();

    const activeEmployees = await this.prisma.employee.count({
      where: {
        status: 'ACTIVE',
      },
    });

    return {
      totalEmployees,
      activeEmployees,
    };
  }

  async getEmployeesByDepartment() {
  const employees = await this.prisma.employee.groupBy({
    by: ['department'],
    _count: {
      department: true,
    },
  });

  return employees.map((item) => ({
    department: item.department,
    count: item._count.department,
  }));
}
}
