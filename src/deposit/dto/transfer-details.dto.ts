import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { LinkedAccountType } from '../enums';

export class TransferDetailsDto {
  //Id del que recibe la transferencia
  @IsNotEmpty()
  linkedAccountId: string;

  @IsOptional()
  linkedAccountKey?: string;

  @IsEnum(LinkedAccountType)
  linkedAccountType: LinkedAccountType;
}
