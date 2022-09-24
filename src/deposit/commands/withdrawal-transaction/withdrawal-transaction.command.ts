import { WithdrawalTransactionDto } from '../../dto/withdrawal-transaction.dto';
export class WithdrawalTransactionCommand {
  constructor(
    public readonly id: string,
    public readonly withdrawalTransactionDto: WithdrawalTransactionDto,
  ) {}
}
