import { Controller, Get, UseGuards } from '@nestjs/common';
import { SummaryService } from '../services/summary.service';
import { JwtAuthGuard } from '../../../auth/jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('finance/summary')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  @Roles('admin', 'hr')
  getSummary() {
    return this.summaryService.getSummary();
  }
}