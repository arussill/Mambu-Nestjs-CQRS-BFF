import { TransferTransactionDto } from '../../dto';
export class TransferTransactionCommand {
  constructor(
    public readonly id: string,
    public readonly transferTransactionDto: TransferTransactionDto,
  ) {}
}
