import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateLoanCommand } from './loan-create.command';
import { ConfigService } from '@nestjs/config';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { Loan } from 'src/loan/models/loan.models';
/**
 * Manejador de comandos de creditos
 */
@CommandHandler(CreateLoanCommand)
export class CreateLoanHandler implements ICommandHandler<CreateLoanCommand> {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
    private readonly eventPublisher: EventPublisher
  ) {}
  async execute(command: CreateLoanCommand): Promise<Loan> {
    
    //DTO /Body /Data
    const { createLoandDto } = command;

    //Obtener los header
    const headers = getHeaders(this.configService);
    
    const data = await this.http.post<Loan>(
      this.configService.get('urlLoans'),
      createLoandDto,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
      },
    );
    
   return data
  }
}
