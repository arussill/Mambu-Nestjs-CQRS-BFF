import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositAccountIdCommand } from './deposit-account-id.command';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { NotFoundException } from '@nestjs/common';
/**
 * Manejador del comando que retorna la cuenta de desposito por ID
 */
@CommandHandler(DepositAccountIdCommand)
export class DepositAccountIdHandler
  implements ICommandHandler<DepositAccountIdCommand>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}

  async execute(command: DepositAccountIdCommand): Promise<any> {
    //Obtener id y detalles
    const { id, details } = command;

    //Obtener headers
    const headers = getHeaders(this.configService);

    //busca data
    const data = await this.http.getById<any>(
      this.configService.get('urlDeposits') + id,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
        params: details,
      },
    );

    // Si la data no existe retorna null
    if (data === null)
      throw new NotFoundException("This Deposit Account doesn't exist");

    return data;
  }
}
