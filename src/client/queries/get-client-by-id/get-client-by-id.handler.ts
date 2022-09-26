import { ConfigService } from '@nestjs/config';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { GetClientByIdQuery } from '..';

/**
 * Consultas de cliente por Id
 */
@QueryHandler(GetClientByIdQuery)
export class GetClientByIdHandler implements IQueryHandler<GetClientByIdQuery> {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}

  async execute(query: GetClientByIdQuery): Promise<any> {
    //Obtener los headers
    const headers = getHeaders(this.configService);
    //Obtener los parametros cde detalles
    const { id, details } = query;

    const data = await this.http.get<any>(
      this.configService.get('urlClients') + id,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
        params: details,
      },
    );
    return data;
  }
}
