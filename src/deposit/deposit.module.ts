import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from 'src/shared/shared.module';
import { DepositController } from './deposit.controller';

@Module({
  controllers: [DepositController],
  imports: [CqrsModule, SharedModule],
  providers: []
})
export class DepositModule {}
