import { BadRequestException, Injectable } from '@nestjs/common';
import { JournalLineType, JournalReferenceType } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExpenseDto) {
    const entryDate = new Date(dto.date);

    const closedPeriod = await this.prisma.financialPeriod.findFirst({
      where: {
        status: 'CLOSED',
        startDate: { lte: entryDate },
        endDate: { gte: entryDate },
      },
    });

    if (closedPeriod) {
      throw new BadRequestException(
        `Cannot create expense. Financial period "${closedPeriod.name}" is closed.`,
      );
    }

    const cashAccount = await this.prisma.account.findFirst({
      where: { name: 'Cash' },
    });

    const expenseAccount = await this.prisma.account.findFirst({
      where: { type: 'EXPENSE' },
    });

    if (!cashAccount || !expenseAccount) {
      throw new BadRequestException(
        'Cash account or expense account not found. Please create accounts first.',
      );
    }

    const entryNumber = `JE-${Date.now()}`;

    return this.prisma.$transaction(async (tx) => {
      const journalEntry = await tx.journalEntry.create({
        data: {
          entryNumber,
          date: entryDate,
          description: dto.title,
          referenceType: JournalReferenceType.EXPENSE,
          lines: {
            create: [
              {
                accountId: expenseAccount.id,
                type: JournalLineType.DEBIT,
                amount: dto.amount,
                description: 'Expense recorded',
              },
              {
                accountId: cashAccount.id,
                type: JournalLineType.CREDIT,
                amount: dto.amount,
                description: 'Cash paid',
              },
            ],
          },
        },
      });

      return tx.expense.create({
        data: {
          title: dto.title,
          amount: dto.amount,
          vendorName: dto.vendorName,
          paymentMethod: dto.paymentMethod,
          category: dto.category,
          date: entryDate,
          description: dto.description,
          journalEntryId: journalEntry.id,
        },
        include: {
          journalEntry: {
            include: {
              lines: {
                include: {
                  account: true,
                },
              },
            },
          },
        },
      });
    });
  }

  findAll() {
    return this.prisma.expense.findMany({
      orderBy: { date: 'desc' },
      include: {
        journalEntry: true,
      },
    });
  }
}