import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from './create-client.command';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { CreateClientDto } from '../../dto/create-client.dto';

/**
 * Manejador de comandos de clientes
 */
@CommandHandler(CreateClientCommand)
export class CreateClientHandler
  implements ICommandHandler<CreateClientCommand>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}

  async execute(createClientCommand: CreateClientCommand): Promise<any> {
    //DTO / Data / Body
    const { createClientDto } = createClientCommand;

    //obtenemos los headers
    const headers = getHeaders(this.configService);

    //Consumo de appi mambu
    const data = await this.http.post<CreateClientDto>(
      this.configService.get('urlClients'),
      createClientDto,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
      },
    );

    return data;
  }
}
