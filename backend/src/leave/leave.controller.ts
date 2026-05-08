import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateLeaveDto } from './dto/create-leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  // Apply leave (Employee)
  @Post()
  @UseGuards(JwtAuthGuard)
  apply(@Body() body: CreateLeaveDto, @Req() req: any) {
    return this.leaveService.apply(body, req.user);
  }

  // View all leaves (HR/Admin)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  findAll() {
    return this.leaveService.findAll();
  }

  // Approve/Reject leave
  @Put(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.leaveService.updateStatus(Number(id), status);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  getMyLeaves(@Req() req: any) {
    return this.leaveService.getMyLeaves(req.user);
  }
}
