import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from 'src/shared/shared.module';
import { DepositController } from './deposit.controller';
import { DepositsCommandsHandlers } from './commands/index';
import { DepositsQueriesHandlers } from './queries/index';

@Module({
  controllers: [DepositController],
  imports: [CqrsModule, SharedModule],
  providers: [...DepositsCommandsHandlers, ...DepositsQueriesHandlers],
})
export class DepositModule {}
