import { BadRequestException, Injectable } from '@nestjs/common';
import { JournalLineType, JournalReferenceType } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateIncomeDto } from '../dto/create-income.dto';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateIncomeDto) {
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
        `Cannot create income. Financial period "${closedPeriod.name}" is closed.`,
      );
    }

    const cashAccount = await this.prisma.account.findFirst({
      where: { name: 'Cash' },
    });

    const revenueAccount = await this.prisma.account.findFirst({
      where: { type: 'INCOME' },
    });

    if (!cashAccount || !revenueAccount) {
      throw new BadRequestException(
        'Cash account or income account not found. Please create accounts first.',
      );
    }

    const entryNumber = `JE-${Date.now()}`;

    return this.prisma.$transaction(async (tx) => {
      const journalEntry = await tx.journalEntry.create({
        data: {
          entryNumber,
          date: entryDate,
          description: dto.title,
          referenceType: JournalReferenceType.INCOME,
          lines: {
            create: [
              {
                accountId: cashAccount.id,
                type: JournalLineType.DEBIT,
                amount: dto.amount,
                description: 'Income received',
              },
              {
                accountId: revenueAccount.id,
                type: JournalLineType.CREDIT,
                amount: dto.amount,
                description: 'Revenue earned',
              },
            ],
          },
        },
      });

      return tx.income.create({
        data: {
          title: dto.title,
          amount: dto.amount,
          customerName: dto.customerName,
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
    return this.prisma.income.findMany({
      orderBy: { date: 'desc' },
      include: {
        journalEntry: true,
      },
    });
  }
}