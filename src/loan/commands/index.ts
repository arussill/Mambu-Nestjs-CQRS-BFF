//Comandos
export { ApproveLoanCommand } from './approve-loan/approve-loan.command';
export { CreateLoanCommand } from './loan-create/loan-create.command';

//Handlers
import { CreateLoanHandler } from './loan-create/loan-create.handler';
import { ApproveLoanHandler } from './approve-loan/approve-loan.handler';
export const LoansCommandsHandlers = [CreateLoanHandler, ApproveLoanHandler];
