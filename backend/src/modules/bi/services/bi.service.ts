import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { HrAnalyticsService } from './hr-analytics.service';
import { AttendanceAnalyticsService } from './attendance-analytics.service';
import { PayrollAnalyticsService } from './payroll-analytics.service';

@Injectable()
export class BiService {
  constructor(
    private readonly hrAnalyticsService: HrAnalyticsService,
    private readonly attendanceAnalyticsService: AttendanceAnalyticsService,
    private readonly payrollAnalyticsService: PayrollAnalyticsService,
    private readonly prisma: PrismaService,
  ) { }

  async getDashboardKPIs() {
    const [employeeMetrics, attendanceMetrics, payrollMetrics] =
      await Promise.all([
        this.hrAnalyticsService.getEmployeeKPIs(),
        this.attendanceAnalyticsService.getAttendanceKPIs(),
        this.payrollAnalyticsService.getPayrollKPIs(),
      ]);

    return {
      ...employeeMetrics,
      ...attendanceMetrics,
      ...payrollMetrics,
    };
  }

  async getExpenseBreakdown() {
    const data = await this.prisma.expense.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    });

    return data.map((item) => ({
      category: item.category,
      amount: item._count.category,
    }));
  }

  async getProfitTrend() {
    const incomes = await this.prisma.income.findMany({
      select: {
        amount: true,
        date: true,
      },
    });

    const expenses = await this.prisma.expense.findMany({
      select: {
        amount: true,
        date: true,
      },
    });

    const monthlyData: Record<
      string,
      { income: number; expense: number }
    > = {};

    incomes.forEach((item) => {
      const month = item.date.toLocaleString(
        'default',
        { month: 'short' },
      );

      if (!monthlyData[month]) {
        monthlyData[month] = {
          income: 0,
          expense: 0,
        };
      }

      monthlyData[month].income += Number(
        item.amount,
      );
    });

    expenses.forEach((item) => {
      const month = item.date.toLocaleString(
        'default',
        { month: 'short' },
      );

      if (!monthlyData[month]) {
        monthlyData[month] = {
          income: 0,
          expense: 0,
        };
      }

      monthlyData[month].expense += Number(
        item.amount,
      );
    });

    return Object.entries(monthlyData).map(
      ([month, values]) => ({
        month,
        profit:
          values.income - values.expense,
      }),
    );
  }


}
