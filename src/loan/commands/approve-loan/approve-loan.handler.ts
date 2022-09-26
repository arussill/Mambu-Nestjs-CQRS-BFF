import {
  CommandHandler,
  EventPublisher,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { ApproveLoanCommand } from './approve-loan.command';
import { NotFoundException } from '@nestjs/common';
import { GetLoanByIdQuery } from '../../queries/get-loan/loan-by-id.query';
import { Loan } from '../../../loan/models/loan.models';
/**
 * Manejador de comandos de aprovacion de creditos
 */
@CommandHandler(ApproveLoanCommand)
export class ApproveLoanHandler implements ICommandHandler<ApproveLoanCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly queryBus: QueryBus,
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
    const data = await this.queryBus.execute<GetLoanByIdQuery, Loan>(
      new GetLoanByIdQuery(id),
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
    loan.approvedLoan(id, approveLoanDto);

    //confirma el evento
    loan.commit();

    return loan;
  }
}
