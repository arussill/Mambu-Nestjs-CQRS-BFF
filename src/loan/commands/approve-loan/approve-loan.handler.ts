import {
  CommandHandler,
  EventPublisher,
  ICommandHandler,
  CommandBus,
} from '@nestjs/cqrs';

import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../../../shared/adapters/axios.adapter';
import { ApproveLoanCommand } from './approve-loan.command';

import { NotFoundException } from '@nestjs/common';
import { GetLoanByIdCommand } from '../get-loan/loan-by-id.command';
import { Loan } from 'src/loan/models/loan.models';
/**
 * Manejador de comandos de aprovacion de creditos
 */
@CommandHandler(ApproveLoanCommand)
export class ApproveLoanHandler implements ICommandHandler<ApproveLoanCommand> {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
    private readonly eventPublisher: EventPublisher,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ApproveLoanCommand): Promise<any> {
    /**
     * DTO /Data /Body
     * id pasado por path del loan que se va cambiar el estado
     */
    const { approveLoanDto, id } = command;

    /**
     * Busca en la bd de mambu si existe el loan
     * llamamos el comando que hace eso, dentro el comando verifica y lanza error si no lo encuentra
     */
    const data = await this.commandBus.execute<GetLoanByIdCommand, Loan>(
      new GetLoanByIdCommand(id),
    );

    //verificar si ya esta aprobado
    if (data.accountState === 'APPROVED')
      throw new NotFoundException('This Loan already is approved');

    //Publicado de enventos
    const loan = await this.eventPublisher.mergeObjectContext(
      new Loan(
        data.id,
        data.encodedKey,
        data.accountHolderKey,
        data.accountState,
        data.loanName,
        data.loanAmount,
      ),
    );

    //Metodo que esta en el la entidad loan aggergate root que aplica el evento
    loan.prestamoAprovado(id, approveLoanDto);

    //confirma el evento
    loan.commit();

    return loan;
  }
}
