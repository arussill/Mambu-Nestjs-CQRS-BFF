import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { TransferDetailsDto } from './transfer-details.dto';

export class TransferTransactionDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  notes?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TransferDetailsDto)
  transferDetails: TransferDetailsDto;
}
