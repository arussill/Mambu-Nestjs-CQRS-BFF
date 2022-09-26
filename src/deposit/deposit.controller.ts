import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationDto } from '../shared/dto/pagination.dto';
import {
  CreateDepositCommand,
  DepositTransactionCommand,
  TransferTransactionCommand,
  WithdrawalTransactionCommand,
} from './commands';
import {
  CreateDepositDto,
  DepositTransactionDto,
  TransferTransactionDto,
  WithdrawalTransactionDto,
} from './dto';
import { Deposit } from './models/deposit.models';
import { DepositAccountIdQuery } from './queries';

@Controller('deposits')
export class DepositController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
    return await this.queryBus.execute<DepositAccountIdQuery, any>(
      new DepositAccountIdQuery(id, details),
    );
  }

  /**Retiro de dinero en una cuenta */
  @Post(':id/withdrawal-transactions')
  async withdrawal(
    @Param('id') id: string,
    @Body() withdrawalTransactionDto: WithdrawalTransactionDto,
  ) {
    return await this.commandBus.execute<WithdrawalTransactionCommand, any>(
      new WithdrawalTransactionCommand(id, withdrawalTransactionDto),
    );
  }
  /**Transferencia entre cuentas */
  @Post(':id/transfer-transactions')
  async transfer(
    @Body() transferTransactionDto: TransferTransactionDto,
    @Param('id') id: string,
  ) {
    return await this.commandBus.execute<TransferTransactionCommand, any>(
      new TransferTransactionCommand(id, transferTransactionDto),
    );
  }
}
