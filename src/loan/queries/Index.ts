//Queries
export { GetLoanByIdQuery } from './get-loan/loan-by-id.query';

//Manejadores de queries
import { GetLoanByIdHandler } from './get-loan/loan-by-id.handler';
export const LoansQueriesHandlers = [GetLoanByIdHandler];
