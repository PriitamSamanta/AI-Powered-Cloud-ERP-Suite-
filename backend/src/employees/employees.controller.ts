import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { OnboardEmployeeDto } from './dto/onboard-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  create(@Body() body: CreateEmployeeDto) {
    return this.employeesService.create(body);
  }

  @Post('onboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  onboard(@Body() body: OnboardEmployeeDto) {
    return this.employeesService.onboardEmployee(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  update(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
    return this.employeesService.update(Number(id), body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(Number(id));
  }
}
