import { DepositTransactionDto } from '../../dto/deposit-transaction.dto';
export class DepositTransactionCommand {
  constructor(
    public readonly depositTransactionDto: DepositTransactionDto,
    public readonly id: string,
  ) {}
}
