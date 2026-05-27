import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FinancialPeriodsService } from '../services/financial-periods.service';
import { CreateFinancialPeriodDto } from '../dto/create-financial-period.dto';
import { JwtAuthGuard } from '../../../auth/jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('finance/periods')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FinancialPeriodsController {
  constructor(
    private readonly financialPeriodsService: FinancialPeriodsService,
  ) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateFinancialPeriodDto) {
    return this.financialPeriodsService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.financialPeriodsService.findAll();
  }

  @Post(':id/close')
  @Roles('admin')
  close(@Param('id', ParseIntPipe) id: number) {
    return this.financialPeriodsService.close(id);
  }

  @Post(':id/reopen')
  @Roles('admin')
  reopen(@Param('id', ParseIntPipe) id: number) {
    return this.financialPeriodsService.reopen(id);
  }
}