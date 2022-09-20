import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { v4 as uuid } from 'uuid';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientCommand } from './commands/create-client/create-client.command';
import { GetClientsQuery } from './queries/get-clients/get-clients.query';
import { PaginationDto } from '../shared/dto/pagination.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**Crear un cliente */
  @Post()
  async createClient(@Body() createClientDto: CreateClientDto): Promise<any> {
    createClientDto._personalizados = { External_ID: uuid() };
    return await this.commandBus.execute<CreateClientCommand, any>(
      new CreateClientCommand(createClientDto),
    );
  }

  /**Obtener todos los clientes */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<any> {
    // console.log('Controlador cliente:');
    // console.log(paginationDto);
    return await this.queryBus.execute<GetClientsQuery, any>(
      new GetClientsQuery(paginationDto),
    );
  }
}
