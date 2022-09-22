import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { AccountType } from "../enums/accountType.enum";
import { Balances } from './balance.dto';

export class CreateDepositDto {
    
        @IsNotEmpty()
        accountHolderKey: string;

        @IsNotEmpty()
        accountHolderType: string

        @IsNotEmpty()
        name:string

        @IsNotEmpty()
        productTypeKey: string

        @IsOptional()
        notes?: string

        @IsOptional()
        @Type(() => Balances)
        balances?:Balances
        
        @IsOptional()
        @IsEnum(AccountType)
        accountType?:AccountType

        @IsOptional()
        currencyCode?: string
      }

