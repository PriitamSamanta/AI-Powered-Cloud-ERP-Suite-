import { IsOptional, IsString } from 'class-validator';

export class DashboardFilterDto {
  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  month?: string;
}
