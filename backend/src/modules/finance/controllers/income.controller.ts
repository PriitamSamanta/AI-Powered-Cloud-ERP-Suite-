import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IncomeService } from '../services/income.service';
import { CreateIncomeDto } from '../dto/create-income.dto';
import { JwtAuthGuard } from '../../../auth/jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('finance/income')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateIncomeDto) {
    return this.incomeService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.incomeService.findAll();
  }
}