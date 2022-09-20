import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClientsQuery } from './get-clients.query';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';
/**
 * Consultas de cliente
 */
@QueryHandler(GetClientsQuery)
export class GetClientHandler implements IQueryHandler<GetClientsQuery> {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}

  async execute(getClientsQuery: GetClientsQuery): Promise<any> {
    //Obtener los headers
    const headers = getHeaders(this.configService);
    //Obtener los parametros como el limite y la paginacion
    const params = getClientsQuery.paginationDto;

    const data = await this.http.get<any>(
      this.configService.get('urlClients'),
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
        params,
      },
    );
    return data;
  }
}
