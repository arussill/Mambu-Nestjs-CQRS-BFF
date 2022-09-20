import { CreateLoanDto } from '../../dto';
export class CreateLoanCommand {
  constructor(public readonly createLoandDto: CreateLoanDto) {}
}
