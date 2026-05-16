import { Controller, Get } from '@nestjs/common';
import { BiService } from '../services/bi.service';
import { HrAnalyticsService } from '../services/hr-analytics.service';
import { AttendanceAnalyticsService } from '../services/attendance-analytics.service';

@Controller('bi')
export class BiController {
  constructor(
    private readonly biService: BiService,
    private readonly hrAnalyticsService: HrAnalyticsService,
    private readonly attendanceAnalyticsService: AttendanceAnalyticsService,
  ) { }
  @Get('kpis')
  getKPIs() {
    return this.biService.getDashboardKPIs();
  }

  @Get('charts/employees-by-department')
  getEmployeesByDepartment() {
    return this.hrAnalyticsService.getEmployeesByDepartment();
  }

   @Get('charts/attendance-trend')
  getAttendanceTrend() {
    return this.attendanceAnalyticsService.getAttendanceTrend();
  }

  @Get('charts/leave-distribution')
  getLeaveDistribution() {
    return this.attendanceAnalyticsService.getLeaveDistribution();
  }
}
