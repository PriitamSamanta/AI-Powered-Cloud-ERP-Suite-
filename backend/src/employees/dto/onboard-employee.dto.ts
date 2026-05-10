import { IsString, IsEmail, IsNumber } from 'class-validator';

export class OnboardEmployeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  department: string;

  @IsString()
  position: string;

  @IsNumber()
  salary: number;
}
