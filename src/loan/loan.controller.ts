import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { ApproveLoanCommand, CreateLoanCommand } from './commands';
import { ApproveLoanDto, CreateLoanDto } from './dto';
import { Loan } from './models/loan.models';
import { GetLoanByIdQuery } from './queries/get-loan/loan-by-id.query';

/**Crear un credito */
@Controller('loans')
export class LoanController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    return await this.commandBus.execute<CreateLoanCommand, Loan>(
      new CreateLoanCommand(createLoanDto),
    );
  }

  /**Aprovar credito */
  @Post(':id')
  async approveLoan(
    @Body() approveLoanDto: ApproveLoanDto,
    @Param('id') id: string,
  ): Promise<any> {
    return await this.commandBus.execute<ApproveLoanCommand, any>(
      new ApproveLoanCommand(approveLoanDto, id),
    );
  }

  /**Obtener por id de loan */
  @Get(':id')
  async getLoanById(
    @Param('id') id: string,
    @Query() details?: PaginationDto,
  ): Promise<any> {
    return await this.queryBus.execute<GetLoanByIdQuery, any>(
      new GetLoanByIdQuery(id, details),
    );
  }
}
