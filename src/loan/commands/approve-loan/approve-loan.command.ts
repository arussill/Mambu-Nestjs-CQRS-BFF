import { ApproveLoanDto } from '../../dto';
export class ApproveLoanCommand {
  constructor(
    public readonly approveLoanDto: ApproveLoanDto,
    public readonly id: string,
  ) {}
}
