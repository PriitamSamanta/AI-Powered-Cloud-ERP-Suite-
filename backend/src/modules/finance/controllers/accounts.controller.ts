import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { JwtAuthGuard } from '../../../auth/jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('finance/accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateAccountDto) {
    return this.accountsService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.accountsService.findAll();
  }
}