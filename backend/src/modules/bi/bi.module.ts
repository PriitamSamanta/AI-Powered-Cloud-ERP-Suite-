import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { BiController } from './controllers/bi.controller';

import { BiService } from './services/bi.service';
import { HrAnalyticsService } from './services/hr-analytics.service';
import { AttendanceAnalyticsService } from './services/attendance-analytics.service';
import { PayrollAnalyticsService } from './services/payroll-analytics.service';

@Module({
  imports: [PrismaModule],
  controllers: [BiController],
  providers: [
    BiService,
    HrAnalyticsService,
    AttendanceAnalyticsService,
    PayrollAnalyticsService,
  ],
})
export class BiModule {}
