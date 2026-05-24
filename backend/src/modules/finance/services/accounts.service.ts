import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAccountDto } from '../dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAccountDto) {
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