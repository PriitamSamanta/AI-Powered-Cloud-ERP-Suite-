import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceAnalyticsService {
  constructor(private readonly prisma: PrismaService) { }

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

  async getAttendanceTrend() {
    return [
      { date: 'Mon', present: 90 },
      { date: 'Tue', present: 95 },
      { date: 'Wed', present: 88 },
      { date: 'Thu', present: 92 },
      { date: 'Fri', present: 97 },
    ];
  }

  async getLeaveDistribution() {
    const leaves = await this.prisma.leave.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    return leaves.map((item) => ({
      status: item.status,
      count: item._count.status,
    }));
  }
}
