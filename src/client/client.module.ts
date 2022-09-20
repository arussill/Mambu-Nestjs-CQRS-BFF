import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { SharedModule } from '../shared/shared.module';
import { ClientController } from './client.controller';
import { CreateClientHandler } from './commands/create-client/create-client.handler';
import { GetClientHandler } from './queries/get-clients/get-clients.handler';

@Module({
  controllers: [ClientController],
  imports:[CqrsModule, SharedModule],
  providers: [CreateClientHandler, GetClientHandler]
})
export class ClientModule {}
