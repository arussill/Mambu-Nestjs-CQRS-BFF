import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../shared/shared.module';
import { LoanController } from './loan.controller';
import { CreateLoanHandler } from './commands/loan-create/loan-create.handler';

@Module({
  controllers: [LoanController],
  imports:[CqrsModule, SharedModule],
  providers: [CreateLoanHandler]
})
export class LoanModule {}
