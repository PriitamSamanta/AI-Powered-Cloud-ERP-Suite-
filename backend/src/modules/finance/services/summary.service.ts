import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SummaryService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const incomeResult = await this.prisma.income.aggregate({
      _sum: {
        amount: true,
      },
    });

    const expenseResult = await this.prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
    });

    const totalIncome = Number(incomeResult._sum.amount || 0);
    const totalExpense = Number(expenseResult._sum.amount || 0);

    const recentIncome = await this.prisma.income.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    const recentExpense = await this.prisma.expense.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    });

    return {
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
      recentIncome,
      recentExpense,
    };
  }
}