import { NotFoundException } from '@nestjs/common';

/**
 * Valida que la cuenta que trasfiere dinero tenga un saldo disponible menor o igual al del la transacion
 */
export const validationBalance = (
  currentAccountBalance: number,
  transferAmount: number,
) => {
  if (currentAccountBalance <= transferAmount)
    throw new NotFoundException(
      'This Deposit Account has an insufficient balance or balance is equal to zero. ¡Please Check your balance!',
    );
};

/**
 * Valida que la cuenta que retira dinero tenga un saldo disponible menor o igual al del retiro
 */
export const validationBalanceWithdrawal = (
  currentAccountBalance: number,
  withdrawalAmount: number,
) => {
  if (currentAccountBalance < withdrawalAmount)
    throw new NotFoundException(
      'This Deposit Account has an insufficient balance or balance is equal to zero. ¡Please Check your balance!',
    );
};
