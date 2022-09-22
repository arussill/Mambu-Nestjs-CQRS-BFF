import { IsNumber, IsOptional } from 'class-validator';

export class Balances {
  @IsOptional()
  @IsNumber()
  availableBalance?: number;

  @IsOptional()
  @IsNumber()
  blockedBalance?: number;

  @IsOptional()
  @IsNumber()
  feesDue?: number;

  @IsOptional()
  @IsNumber()
  forwardAvailableBalance?: number;

  @IsOptional()
  @IsNumber()
  holdBalance?: number;

  @IsOptional()
  @IsNumber()
  lockedBalance?: number;

  @IsOptional()
  @IsNumber()
  overdraftAmount?: number;

  @IsOptional()
  @IsNumber()
  overdraftInterestDue?: number;

  @IsOptional()
  @IsNumber()
  technicalOverdraftAmount?: number;

  @IsOptional()
  @IsNumber()
  technicalOverdraftInterestDue?: number;

  @IsOptional()
  @IsNumber()
  totalBalance?: number;
}
