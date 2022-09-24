import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Deposit } from 'src/deposit/models/deposit.models';
import { AxiosAdapter } from 'src/shared/adapters/axios.adapter';
import { getHeaders } from 'src/shared/helpers/getHeaders';
import { DepositAccountIdCommand } from '../deposit-account-id/deposit-account-id.command';
import { DepositTransactionCommand } from './deposit-transaction.command';
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
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: DepositTransactionCommand): Promise<any> {
    //Obtenemos el body dto o la data y el id de la cuenta de deposito al cual se le asignara
    const { depositTransactionDto, id } = command;

    const headers = getHeaders(this.configService);
    //Buscar que la cuenta exista y que su estado se apobado
    const depositAccount = await this.commandBus.execute<
      DepositAccountIdCommand,
      Deposit
    >(new DepositAccountIdCommand(id));
    //Si cumple la condicion entonces si realiza un deposito en la cuenta
    if (
      depositAccount.accountState === 'APPROVED' ||
      depositAccount.accountState === 'ACTIVE'
    ) {
      //consumir la ruta de depositar una cantidad en la cuenta de deposito
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
