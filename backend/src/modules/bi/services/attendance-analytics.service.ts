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
    const records = await this.prisma.attendance.findMany({
      select: {
        date: true,
        status: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    const grouped = records.reduce((acc, item) => {
      const date = item.date.toISOString().split('T')[0];

      if (!acc[date]) {
        acc[date] = 0;
      }

      if (item.status === 'present') {
        acc[date]++;
      }

      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(
      ([date, present]) => ({
        date,
        present,
      }),
    );
  }

  async getLeaveDistribution() {
    const data = await this.prisma.leave.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    return data.map((item) => ({
      type: item.status,
      count: item._count.status,
    }));
  }
}

