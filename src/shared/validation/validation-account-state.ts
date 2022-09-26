import { NotFoundException } from '@nestjs/common';

/**
 * Valida que el estado de la cuenta sea Aprobado
 */
export const validationStateApproved = (dataAccontState: string) => {
  if (dataAccontState === 'APPROVED')
    throw new NotFoundException('This account already is approved');
};

/**
 * Valida que el estado de la cuenta sea Activo
 */
export const validationStateActive = (dataAccountState: string) => {
  if (dataAccountState !== 'ACTIVE')
    throw new NotFoundException('The accountState must be ACTIVE');
};

/**
 * Valida que el estado de la cuenta sea o Activo o Aprobado
 */
export const validationStateActiveOrApproved = (dataAccountState: string) => {
  if (!(dataAccountState === 'APPROVED' || dataAccountState === 'ACTIVE')) {
    throw new NotFoundException('The accountState must be APPROVED or ACTIVE');
  }
};
