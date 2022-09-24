import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { WithdrawalTransactionCommand } from './withdrawal-transaction.command';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { DepositAccountIdCommand } from '../deposit-account-id/deposit-account-id.command';
import { Deposit } from '../../../deposit/models/deposit.models';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(WithdrawalTransactionCommand)
export class WithdrawalTransactionHandler
  implements ICommandHandler<WithdrawalTransactionCommand>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: WithdrawalTransactionCommand): Promise<any> {
    //Obtenemos los headers
    const headers = getHeaders(this.configService);

    //Obtenemos la data o el body del DTO con el id de la cuenta de retiro
    const { id, withdrawalTransactionDto } = command;

    //se comprueba la existencia de la cuenta
    const depositAccount = await this.commandBus.execute<
      DepositAccountIdCommand,
      Deposit
    >(new DepositAccountIdCommand(id));

    console.log("RETIROS")
    console.log(depositAccount)
    //se comprueba que la cuenta este activa
    if (depositAccount.accountState !== 'ACTIVE')
      throw new NotFoundException(
        'This Deposit Account must be ACTIVE for to do this transaction.',
      );

    //se comprueba que el monto disponible sea mayor o igual al retiro (que la cuenta tenga dinero)
    if (
      depositAccount.balances.availableBalance >=
      withdrawalTransactionDto.amount
    ) {
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
    throw new NotFoundException(
      'This Deposit Account has an insufficient balance or balance is equal to zero. ¡Please Check your balance!*',
    );
  }
}
