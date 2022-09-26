import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { DepositTransactionCommand } from './deposit-transaction.command';
import { Deposit } from './../../models/deposit.models';
import { DepositAccountIdQuery } from './../../queries/deposit-account-id/deposit-account-id.query';
import { NotFoundException } from '@nestjs/common';

/**
 * Manejador de comando que deposita una cantidad de dinero en una cuenta de deposito creada
 */
@CommandHandler(DepositTransactionCommand)
export class DepositTransactionHandler
  implements ICommandHandler<DepositTransactionCommand>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: DepositTransactionCommand): Promise<any> {
    //Obtenemos el body dto o la data y el id de la cuenta de deposito al cual se le asignara
    const { depositTransactionDto, id } = command;

    //Obtrener headers
    const headers = getHeaders(this.configService);

    //Buscar que la cuenta exista
    const depositAccount = await this.queryBus.execute<
      DepositAccountIdQuery,
      Deposit
    >(new DepositAccountIdQuery(id));

    //Si cumple la condicion entonces  que su estado se apobado o activo
    if (
      depositAccount.accountState === 'APPROVED' ||
      depositAccount.accountState === 'ACTIVE'
    ) {
      //consumir la ruta de depositar una cantidad de dinero en la cuenta de deposito
      const data = await this.http.post<any>(
        this.configService.get('urlDeposits') + id + '/deposit-transactions', //ruta para poder ingresar una cantidad a la cuenta de deposito de id
        depositTransactionDto,
        {
          headers,
          baseURL: this.configService.get('baseUrl'),
        },
      );
      return data;
    }
    throw new NotFoundException('The accountState must be APPROVED or ACTIVE');
  }
}
