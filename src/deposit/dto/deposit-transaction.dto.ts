import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class DepositTransactionDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  notes?: string;
}
