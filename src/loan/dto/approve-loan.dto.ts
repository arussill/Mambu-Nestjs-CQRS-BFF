import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUppercase } from "class-validator";
import { Action } from "../enums/action.enum";

export class ApproveLoanDto {

    @IsNotEmpty()
    @IsString()
    @IsEnum(Action)
    @IsUppercase()
    action: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    notes?: string;
}
