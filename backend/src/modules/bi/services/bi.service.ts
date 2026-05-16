import { Injectable } from '@nestjs/common';

import { HrAnalyticsService } from './hr-analytics.service';
import { AttendanceAnalyticsService } from './attendance-analytics.service';
import { PayrollAnalyticsService } from './payroll-analytics.service';

@Injectable()
export class BiService {
  constructor(
    private readonly hrAnalyticsService: HrAnalyticsService,
    private readonly attendanceAnalyticsService: AttendanceAnalyticsService,
    private readonly payrollAnalyticsService: PayrollAnalyticsService,
  ) {}

  async getDashboardKPIs() {
    const [employeeMetrics, attendanceMetrics, payrollMetrics] =
      await Promise.all([
        this.hrAnalyticsService.getEmployeeKPIs(),
        this.attendanceAnalyticsService.getAttendanceKPIs(),
        this.payrollAnalyticsService.getPayrollKPIs(),
      ]);

    return {
      ...employeeMetrics,
      ...attendanceMetrics,
      ...payrollMetrics,
    };
  }
}
