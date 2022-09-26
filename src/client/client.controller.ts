import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { v4 as uuid } from 'uuid';
import { CreateClientDto } from './dto';
import { CreateClientCommand } from './commands';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { GetClientsQuery, GetClientByIdQuery } from './queries';

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
    return await this.queryBus.execute<GetClientsQuery, any>(
      new GetClientsQuery(paginationDto),
    );
  }

  /**Obtener por el id del cliente
   * el id puede ser el id del cliente o el encodekey del cliente
   */
  @Get(':id')
  async findOne(
    @Query() details: PaginationDto,
    @Param('id') id: string,
  ): Promise<any> {
    return await this.queryBus.execute<GetClientByIdQuery, any>(
      new GetClientByIdQuery(id, details),
    );
  }
}
