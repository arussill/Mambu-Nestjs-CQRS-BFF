import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { SharedModule } from '../shared/shared.module';
import { ClientController } from './client.controller';
import { ClientsCommandsHandlers } from './commands/index';
import { ClientsQueriesHandlers } from './queries/index';

@Module({
  controllers: [ClientController],
  imports: [CqrsModule, SharedModule],
  providers: [...ClientsCommandsHandlers, ...ClientsQueriesHandlers],
})
export class ClientModule {}
