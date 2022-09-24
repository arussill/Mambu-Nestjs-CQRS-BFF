import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { AccountType, AccountState } from '../enums';
import { BalancesDto } from './balance.dto';

export class CreateDepositDto {
  @IsNotEmpty()
  accountHolderKey: string;

  @IsNotEmpty()
  accountHolderType: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  productTypeKey: string;

  @IsOptional()
  notes?: string;

  @IsOptional()
  @IsObject()
  @Type(() => BalancesDto)
  @ValidateNested()
  balances?: BalancesDto;

  @IsOptional()
  @IsEnum(AccountType)
  accountType?: AccountType;

  @IsOptional()
  currencyCode?: string;

  @IsOptional()
  @IsEnum(AccountState)
  accountState?: AccountState;
}
