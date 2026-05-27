import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAccountDto } from '../dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAccountDto) {
    const existingAccount = await this.prisma.account.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (existingAccount) {
      throw new BadRequestException('Account code already exists');
    }

    return this.prisma.account.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.account.findMany({
      orderBy: {
        code: 'asc',
      },
    });
  }
}