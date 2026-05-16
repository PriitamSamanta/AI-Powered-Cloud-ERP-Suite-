import { Controller, Get } from '@nestjs/common';
import { BiService } from '../services/bi.service';

@Controller('bi')
export class BiController {
  constructor(private readonly biService: BiService) {}

  @Get('kpis')
  getKPIs() {
    return this.biService.getDashboardKPIs();
  }
}
