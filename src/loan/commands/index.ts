//Comandos
export { ApproveLoanCommand } from "./approve-loan/approve-loan.command"
export { CreateLoanCommand } from "./loan-create/loan-create.command"
export { GetLoanByIdCommand } from './get-loan/loan-by-id.command';

//Handlers
import { CreateLoanHandler } from "./loan-create/loan-create.handler"
import { ApproveLoanHandler } from "./approve-loan/approve-loan.handler"
import { GetLoanByIdHandler } from "./get-loan/loan-by-id.handler"
export const LoansCommandsHandlers = [CreateLoanHandler, ApproveLoanHandler, GetLoanByIdHandler]

