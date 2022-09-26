import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Deposit } from '../../../deposit/models/deposit.models';
import { DepositAccountIdQuery } from '../../../deposit/queries/deposit-account-id/deposit-account-id.query';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { TransferTransactionCommand } from './transfer-transaction.command';

/**
 * Manejador de comando que realiza trasferencia entre dos cuentas
 */
@CommandHandler(TransferTransactionCommand)
export class TransferTransactionHandler
  implements ICommandHandler<TransferTransactionCommand>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: TransferTransactionCommand): Promise<any> {
    //Obtener los Headers
    const headers = getHeaders(this.configService);

    //Obtener la data o body del Dto y id de la cuenta que envia el dinero viene en el path
    //en el DTO O Body llega el id de la cuenta que recibe el dinero
    const { id, transferTransactionDto } = command;

    //Verificar que ambas cuentas existan
    //cuenta que envia el dinero
    const accountSend = await this.queryBus.execute<
      DepositAccountIdQuery,
      Deposit
    >(new DepositAccountIdQuery(id));
    //cuenta que recibe el dinero
    const accountArrive = await this.queryBus.execute<
      DepositAccountIdQuery,
      Deposit
    >(
      new DepositAccountIdQuery(
        transferTransactionDto.transferDetails.linkedAccountId, //id de la cuenta que recibe el dinero
      ),
    );

    //verificar que la cuenta que envia la plata tenga estado activo
    if (accountSend.accountState !== 'ACTIVE')
      throw new NotFoundException(
        'This account must have accountState ACTIVE to be able to make a transfer',
      );

    //verifacar que la cuenta que envia la plata tenga saldo suficiente
    if (accountSend.balances.availableBalance <= transferTransactionDto.amount)
      throw new NotFoundException(
        'This Deposit Account has an insufficient balance or balance is equal to zero. ¡Please Check your balance!',
      );

    //verificar que la cuenta que recibe la plata tenga estado activo o aprobado
    if (
      accountArrive.accountState === 'APPROVED' ||
      accountArrive.accountState === 'ACTIVE'
    ) {
      //mandar la transferencia
      const data = await this.http.post(
        this.configService.get('urlDeposits') + id + '/transfer-transactions',
        transferTransactionDto,
        {
          headers,
          baseURL: this.configService.get('baseUrl'),
        },
      );
      //retornar
      return data;
    }
    throw new NotFoundException(
      'This account must have accountState ACTIVE or APPROVED to be able to make a transfer',
    );
  }
}
