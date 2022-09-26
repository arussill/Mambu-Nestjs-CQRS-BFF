// Comandos
export { CreateDepositCommand } from './create-deposit/create-deposit.command';
export { DepositTransactionCommand } from './deposit-transaction/deposit-transaction.command';
export { WithdrawalTransactionCommand } from './withdrawal-transaction/withdrawal-transaction.command';
export { TransferTransactionCommand } from './transfer-transaction/transfer-transaction.command';

// Manejadores de Comandos
import { CreateDepositHandler } from './create-deposit/create-deposit.handler';
import { DepositTransactionHandler } from './deposit-transaction/deposit-transaction.handdler';
import { TransferTransactionHandler } from './transfer-transaction/transfer-transaction.handler';
import { WithdrawalTransactionHandler } from './withdrawal-transaction/withdrawal-transaction.handler';
export const DepositsCommandsHandlers = [
  CreateDepositHandler,
  DepositTransactionHandler,
  WithdrawalTransactionHandler,
  TransferTransactionHandler,
];
