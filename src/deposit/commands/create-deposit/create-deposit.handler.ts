import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDepositCommand } from './create-deposit.command';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { Deposit } from '../../models/deposit.models';
import { getHeaders } from '../../../shared/helpers/getHeaders';

@CommandHandler(CreateDepositCommand)
export class CreateDepositHandler
  implements ICommandHandler<CreateDepositCommand>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}

  async execute(command: CreateDepositCommand): Promise<Deposit> {
    //Obtener los headers
    const headers = getHeaders(this.configService);

    //Obtener los DTO, data, body
    const { createDepositDto } = command;
    const data = await this.http.post<Deposit>(
      this.configService.get('urlDeposits'),
      createDepositDto,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
      },
    );

    return data;
  }
}
