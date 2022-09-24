import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateDepositDto, DepositTransactionDto } from './dto';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateDepositCommand,
  DepositAccountIdCommand,
  DepositTransactionCommand,
} from './commands';
import { Deposit } from './models/deposit.models';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { WithdrawalTransactionDto } from './dto/withdrawal-transaction.dto';
import { WithdrawalTransactionCommand } from './commands/withdrawal-transaction/withdrawal-transaction.command';

@Controller('deposits')
export class DepositController {
  constructor(private readonly commandBus: CommandBus) {}

  /**Ruta para la creacion de un deposito */
  @Post()
  async create(@Body() createDepositDto: CreateDepositDto): Promise<Deposit> {
    return await this.commandBus.execute<CreateDepositCommand, Deposit>(
      new CreateDepositCommand(createDepositDto),
    );
  }

  /**Deposita dinero a la cuenta creada */
  @Post(':id/deposit-transactions')
  async depositTransaction(
    @Body() depositTransactionDto: DepositTransactionDto,
    @Param('id') id: string,
  ): Promise<any> {
    return await this.commandBus.execute<DepositTransactionCommand, any>(
      new DepositTransactionCommand(depositTransactionDto, id),
    );
  }

  /**Obtiene una cuenta de deposito por id*/
  @Get(':id')
  async findOne(@Param('id') id: string, @Query() details?: PaginationDto) {
    return await this.commandBus.execute<DepositAccountIdCommand, any>(
      new DepositAccountIdCommand(id, details),
    );
  }

  @Post(':id/withdrawal-transactions')
  async withdrawal(
    @Param('id') id: string,
    @Body() withdrawalTransactionDto: WithdrawalTransactionDto,
  ) {
    return await this.commandBus.execute<WithdrawalTransactionCommand, any>(
      new WithdrawalTransactionCommand(id, withdrawalTransactionDto),
    );
  }
}
