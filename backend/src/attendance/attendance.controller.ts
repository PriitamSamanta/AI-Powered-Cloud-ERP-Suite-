import { Controller, Post, Get, Param, UseGuards, Req } from '@nestjs/common';

import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('checkin')
  @UseGuards(JwtAuthGuard)
  @Roles('employee')
  checkIn(@Req() req: any) {
    return this.attendanceService.checkIn(req.user);
  }

  @Post('checkout/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('employee')
  checkOut(@Param('id') id: string) {
    return this.attendanceService.checkOut(Number(id));
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @Roles('employee')
  getMyAttendance(@Req() req: any) {
    return this.attendanceService.getMyAttendance(req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  findAll() {
    return this.attendanceService.findAll();
  }
}
