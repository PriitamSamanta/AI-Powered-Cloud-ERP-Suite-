import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  position: string;

  @IsString()
  department: string;

  @IsNumber()
  salary: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNumber()
  userId: number;
}
