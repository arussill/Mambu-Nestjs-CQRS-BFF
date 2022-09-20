import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLoanCommand } from './loan-create.command';
import { ConfigService } from '@nestjs/config';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
/**
 * Manejador de comandos de creditos
 */
@CommandHandler(CreateLoanCommand)
export class CreateLoanHandler implements ICommandHandler<CreateLoanCommand> {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}
  async execute(command: CreateLoanCommand): Promise<any> {
    
    //DTO /Body /Data
    const { createLoandDto } = command;
    console.log ("Handler loan dto:")
    console.log (createLoandDto)
    //Obtener los header
    const headers = getHeaders(this.configService);
    console.log ("Handler loan headers:")
    console.log (headers)
    
    console.log ("Handler loan url:")
    console.log (this.configService.get('urlLoans'))
    console.log (this.configService.get('baseUrl'))
    
    const data = await this.http.post<any>(
      this.configService.get('urlLoans'),
      createLoandDto,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
      },
    );
    return data;
  }
}
