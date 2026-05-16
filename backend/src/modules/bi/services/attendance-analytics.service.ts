import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAttendanceKPIs() {
    const today = new Date();

    const presentToday = await this.prisma.attendance.count({
      where: {
        date: today,
        status: 'PRESENT',
      },
    });

    const onLeaveToday = await this.prisma.leave.count({
      where: {
        status: 'APPROVED',
      },
    });

    return {
      presentToday,
      onLeaveToday,
    };
  }
}
