import { IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateLoanDto {

    @IsString()
    @IsNotEmpty()
    accountHolderKey: string;

    @IsString()
    @IsNotEmpty()
    accountHolderType: string;

    @IsInt()
    @IsNumber()
    @IsPositive()
    loanAmount: number;

    @IsString()
    @IsNotEmpty()
    productTypeKey: string;

    @IsOptional()
    // @IsObject()
    interestSettings?: string;

    @IsOptional()
    // @IsObject()
    scheduleSettings?: string;

    @IsOptional()
    // @IsObject()
    disbursementDetails?: string
    
    @IsOptional()
    // @IsObject()
    _Informacion_Adicional?: string
}
