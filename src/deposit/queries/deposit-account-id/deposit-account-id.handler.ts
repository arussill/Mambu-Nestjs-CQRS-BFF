import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AxiosAdapter } from 'src/shared/adapters/axios.adapter';
import { getHeaders } from 'src/shared/helpers/getHeaders';
import { DepositAccountIdQuery } from './deposit-account-id.query';

/**
 * Manejador del Query que retorna la cuenta de desposito por ID
 */
@QueryHandler(DepositAccountIdQuery)
export class DepositAccountIdHandler
  implements IQueryHandler<DepositAccountIdQuery>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}

  async execute(query: DepositAccountIdQuery): Promise<any> {
    //Obtener id y detalles
    const { id, details } = query;

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
