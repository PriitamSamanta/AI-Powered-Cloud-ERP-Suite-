import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JournalEntriesController } from './controllers/journal-entries.controller';
import { JournalEntriesService } from './services/journal-entries.service';

@Module({
  controllers: [AccountsController, JournalEntriesController],
  providers: [AccountsService, JournalEntriesService, PrismaService],
})
export class FinanceModule {}