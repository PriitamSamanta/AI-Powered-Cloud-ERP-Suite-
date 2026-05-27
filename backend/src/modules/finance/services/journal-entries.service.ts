import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateJournalEntryDto } from '../dto/create-journal-entry.dto';
import { JournalLineType } from '@prisma/client';

@Injectable()
export class JournalEntriesService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateJournalEntryDto) {

    const entryDate = new Date(dto.date);

    const closedPeriod = await this.prisma.financialPeriod.findFirst({
      where: {
        status: 'CLOSED',
        startDate: {
          lte: entryDate,
        },
        endDate: {
          gte: entryDate,
        },
      },
    });

    if (closedPeriod) {
      throw new BadRequestException(
        `Cannot create journal entry. Financial period "${closedPeriod.name}" is closed.`,
      );
    }


    const totalDebit = dto.lines
      .filter((line) => line.type === JournalLineType.DEBIT)
      .reduce((sum, line) => sum + Number(line.amount), 0);

    const totalCredit = dto.lines
      .filter((line) => line.type === JournalLineType.CREDIT)
      .reduce((sum, line) => sum + Number(line.amount), 0);

    if (totalDebit !== totalCredit) {
      throw new BadRequestException('Journal entry is not balanced');
    }

    const entryNumber = `JE-${Date.now()}`;

    return this.prisma.journalEntry.create({
      data: {
        entryNumber,
        date: entryDate,
        description: dto.description,
        referenceType: dto.referenceType,
        referenceId: dto.referenceId,
        lines: {
          create: dto.lines.map((line) => ({
            accountId: line.accountId,
            type: line.type,
            amount: line.amount,
            description: line.description,
          })),
        },
      },
      include: {
        lines: {
          include: {
            account: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.journalEntry.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        lines: {
          include: {
            account: true,
          },
        },
      },
    });
  }
}