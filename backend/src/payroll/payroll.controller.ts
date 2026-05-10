import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Param,
  Res,
} from '@nestjs/common';

import { PayrollService } from './payroll.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import type { Response } from 'express';

@Controller('payroll')
export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  generate(@Body() body: any) {
    return this.payrollService.generatePayroll(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  findAll() {
    return this.payrollService.findAll();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employee')
  getMyPayroll(@Req() req: any) {
    return this.payrollService.getMyPayroll(req.user);
  }

  @Get('payslip/:id')
  @UseGuards(JwtAuthGuard)
  getPayslip(@Param('id') id: string, @Res() res: Response) {
    return this.payrollService.generatePayslip(Number(id), res);
  }
}
