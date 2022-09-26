//Queries
export { DepositAccountIdQuery } from '../queries/deposit-account-id/deposit-account-id.query';

//Manejador de queries
import { DepositAccountIdHandler } from './deposit-account-id/deposit-account-id.handler';
export const DepositsQueriesHandlers = [DepositAccountIdHandler];
