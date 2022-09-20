import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from './create-client.command';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';

/**
 * Manejador de comandos de clientes
 */
@CommandHandler(CreateClientCommand)
export class CreateClientHandler implements ICommandHandler<CreateClientCommand>  {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(createClientCommand: CreateClientCommand): Promise<any> {
    //DTO / Data / Body
    const { createClientDto } = createClientCommand;

    //obtenemos los headers
    const headers = getHeaders(this.configService);

    //Consumo de appi mambu
    const data = await this.http.post<any>(
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
