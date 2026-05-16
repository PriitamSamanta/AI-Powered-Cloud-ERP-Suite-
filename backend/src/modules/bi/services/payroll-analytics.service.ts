import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayrollAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPayrollKPIs() {
    const payrollData = await this.prisma.payroll.aggregate({
      _sum: {
        netSalary: true,
      },
    });

    return {
      monthlyPayrollCost: payrollData._sum.netSalary || 0,
    };
  }
}
