import { ConfigService } from '@nestjs/config';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AxiosAdapter } from 'src/shared/adapters/axios.adapter';
import { getHeaders } from 'src/shared/helpers/getHeaders';
import { LoanApprovedEvent } from './loan-approved.event';

/**
 * Este es el manejador de eventos de loans approved
 */
@EventsHandler(LoanApprovedEvent)
export class LoanApprovedHandler implements IEventHandler<LoanApprovedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
  ) {}

  async handle(event: LoanApprovedEvent) {
    //Obtenemos los headers
    const headers = getHeaders(this.configService);

    //DTO /Data /Body y el id del loan que se va ha modificar
    const { approveLoanDto, id } = event;

    // Se aprueba un loan
    const approved = await this.http.post<any>(
      this.configService.get('urlLoans') + id + ':changeState', //esta es la ruta de para aprovacion de credito
      approveLoanDto,
      {
        headers,
        baseURL: this.configService.get('baseUrl'),
      },
    );

    return approved;
  }
}
