import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'hr'])
  role: string;
}