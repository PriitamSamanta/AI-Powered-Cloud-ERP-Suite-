import { Controller, Get, UseGuards } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('hr')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  getHRDashboard() {
    return this.dashboardService.getHRDashboard();
  }
}
