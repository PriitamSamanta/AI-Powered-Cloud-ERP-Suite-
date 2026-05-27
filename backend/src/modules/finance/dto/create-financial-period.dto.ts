import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateFinancialPeriodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}