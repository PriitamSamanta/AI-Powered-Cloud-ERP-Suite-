import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { LeaveModule } from './leave/leave.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PayrollModule } from './payroll/payroll.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BiModule } from './modules/bi/bi.module';
import { FinanceModule } from './modules/finance/finance.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmployeesModule,
    LeaveModule,
    AttendanceModule,
    PayrollModule,
    DashboardModule,
    BiModule,
    FinanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
