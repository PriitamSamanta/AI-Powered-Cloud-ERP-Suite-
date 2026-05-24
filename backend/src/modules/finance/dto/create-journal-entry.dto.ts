import { JournalLineType, JournalReferenceType } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateJournalLineDto {
  @IsNumber()
  accountId: number;

  @IsEnum(JournalLineType)
  type: JournalLineType;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateJournalEntryDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(JournalReferenceType)
  @IsOptional()
  referenceType?: JournalReferenceType;

  @IsNumber()
  @IsOptional()
  referenceId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalLineDto)
  lines: CreateJournalLineDto[];
}