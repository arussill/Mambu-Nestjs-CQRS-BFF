import { ApproveLoanDto } from '../dto/approve-loan.dto';
export class LoanApprovedEvent {
  constructor(
    public readonly id: string,
    public readonly approveLoanDto: ApproveLoanDto,
  ) {
    // console.log("Dentor del Evento:")
    // console.log(approvedLoanDto)
  }
}
