import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { JwtAuthGuard } from '../../../auth/jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('finance/expense')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateExpenseDto) {
    return this.expenseService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.expenseService.findAll();
  }
}