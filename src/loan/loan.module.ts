import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../shared/shared.module';
import { LoanController } from './loan.controller';
import { LoansCommandsHandlers } from './commands';
import { LoanApprovedHandler } from './events/loan-approved.handler';
import { LoansQueriesHandlers } from './queries';
@Module({
  controllers: [LoanController],
  imports: [CqrsModule, SharedModule],
  providers: [
    ...LoansCommandsHandlers,
    ...LoansQueriesHandlers,
    LoanApprovedHandler,
  ], //LoanApprovedHandler es el manejador de eventos
})
export class LoanModule {}
