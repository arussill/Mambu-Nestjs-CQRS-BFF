import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class WithdrawalTransactionDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @IsOptional()
  notes?: string;
}
