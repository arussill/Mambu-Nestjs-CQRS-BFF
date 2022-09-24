import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Loan } from 'src/loan/models/loan.models';
import { AxiosAdapter } from 'src/shared/adapters/axios.adapter';
import { getHeaders } from '../../../shared/helpers/getHeaders';
import { GetLoanByIdCommand } from './loan-by-id.command';
/**
 * Manejador del comando que recupera obtiene loan por el id
 */
@CommandHandler(GetLoanByIdCommand)
export class GetLoanByIdHandler implements ICommandHandler<GetLoanByIdCommand> {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}

  async execute(command: GetLoanByIdCommand): Promise<any> {
    //Obtenemos los headers
    const headers = getHeaders(this.configService);

    //id que de loan que va buascar
    const { id, details } = command;

    // Busca en mambu si existe esta data
    const data = await this.http.getById<Loan>(
      this.configService.get(`urlLoans`) + id,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
        params: details,
      },
    );

    // Si la data no existe retorna null
    if (data === null) throw new NotFoundException("This Loan doesn't exist");

    return data;
  }
}
