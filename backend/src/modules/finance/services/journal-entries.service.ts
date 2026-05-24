import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateJournalEntryDto } from '../dto/create-journal-entry.dto';
import { JournalLineType } from '@prisma/client';

@Injectable()
export class JournalEntriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateJournalEntryDto) {
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
        date: new Date(dto.date),
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