import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Deposit } from '../../../deposit/models/deposit.models';
import { DepositAccountIdQuery } from '../../../deposit/queries/deposit-account-id/deposit-account-id.query';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { WithdrawalTransactionCommand } from './withdrawal-transaction.command';
import { validationStateActive } from '../../../shared/validation/validation-account-state';
import { validationBalanceWithdrawal } from '../../../shared/validation/validation-account-balance';

/**Manejador de comando que permite realizar una retiro */
@CommandHandler(WithdrawalTransactionCommand)
export class WithdrawalTransactionHandler
  implements ICommandHandler<WithdrawalTransactionCommand>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: WithdrawalTransactionCommand): Promise<any> {
    //Obtenemos los headers
    const headers = getHeaders(this.configService);

    //Obtenemos la data o el body del DTO con el id de la cuenta de retiro
    const { id, withdrawalTransactionDto } = command;

    //se comprueba la existencia de la cuenta
    const depositAccount = await this.queryBus.execute<
      DepositAccountIdQuery,
      Deposit
    >(new DepositAccountIdQuery(id));

    //se comprueba que la cuenta este activa
    // if (depositAccount.accountState !== 'ACTIVE')
    //   throw new NotFoundException(
    //     'This Deposit Account must be ACTIVE for to do this transaction.',
    //   );
    validationStateActive(depositAccount.accountState);

    //se comprueba que el monto disponible sea mayor o igual al retiro (que la cuenta tenga dinero)
    // if (
    //   depositAccount.balances.availableBalance >=
    //   withdrawalTransactionDto.amount
    // ) {
    validationBalanceWithdrawal(
      depositAccount.balances.availableBalance,
      withdrawalTransactionDto.amount,
    );
    //se puede retirar
    const data = await this.http.post(
      this.configService.get('urlDeposits') + id + '/withdrawal-transactions',
      withdrawalTransactionDto,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
      },
    );
    return data;
  }
  //si el monto disponible es menor
  // throw new NotFoundException(
  //   'This Deposit Account has an insufficient balance or balance is equal to zero. ¡Please Check your balance!*',
  // );
  // }
}
