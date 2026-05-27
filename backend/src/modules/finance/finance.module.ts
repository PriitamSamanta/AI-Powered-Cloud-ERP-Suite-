import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JournalEntriesController } from './controllers/journal-entries.controller';
import { JournalEntriesService } from './services/journal-entries.service';
import { FinancialPeriodsController } from './controllers/financial-periods.controller';
import { FinancialPeriodsService } from './services/financial-periods.service';
import { IncomeController } from './controllers/income.controller';
import { IncomeService } from './services/income.service';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseService } from './services/expense.service';
import { SummaryController } from './controllers/summary.controller';
import { SummaryService } from './services/summary.service';

@Module({
  controllers: [AccountsController, JournalEntriesController, FinancialPeriodsController, IncomeController, ExpenseController, SummaryController],
  providers: [AccountsService, JournalEntriesService, FinancialPeriodsService, IncomeService, ExpenseService, SummaryService, PrismaService],
})
export class FinanceModule { }