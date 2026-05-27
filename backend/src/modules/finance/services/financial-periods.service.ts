import { BadRequestException, Injectable } from '@nestjs/common';
import { FinancialPeriodStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFinancialPeriodDto } from '../dto/create-financial-period.dto';

@Injectable()
export class FinancialPeriodsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFinancialPeriodDto) {
    return this.prisma.financialPeriod.create({
      data: {
        name: dto.name,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  findAll() {
    return this.prisma.financialPeriod.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async close(id: number) {
    const period = await this.prisma.financialPeriod.findUnique({
      where: { id },
    });

    if (!period) {
      throw new BadRequestException('Financial period not found');
    }

    if (period.status === FinancialPeriodStatus.CLOSED) {
      throw new BadRequestException('Financial period is already closed');
    }

    return this.prisma.financialPeriod.update({
      where: { id },
      data: {
        status: FinancialPeriodStatus.CLOSED,
        closedAt: new Date(),
      },
    });
  }

  async reopen(id: number) {
    const period = await this.prisma.financialPeriod.findUnique({
      where: { id },
    });

    if (!period) {
      throw new BadRequestException('Financial period not found');
    }

    if (period.status === FinancialPeriodStatus.OPEN) {
      throw new BadRequestException('Financial period is already open');
    }

    return this.prisma.financialPeriod.update({
      where: { id },
      data: {
        status: FinancialPeriodStatus.OPEN,
        closedAt: null,
      },
    });
  }
}