import {
  Controller,
  Post,
  Body,
  Param,
  Get,
} from '@nestjs/common';

import { CommandBus } from '@nestjs/cqrs';
import { ApproveLoanDto, CreateLoanDto } from './dto';
import { CreateLoanCommand, ApproveLoanCommand, GetLoanByIdCommand } from './commands';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { Loan } from './models/loan.models';


/**Crear un credito */
@Controller('loans')
export class LoanController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    return await this.commandBus.execute<CreateLoanCommand, Loan>(
      new CreateLoanCommand(createLoanDto),
    );
  }

  /**Aprovar credito */
  @Post(':id')
  async approveLoan(@Body() approveLoanDto: ApproveLoanDto, @Param('id') id:string): Promise<any> {
    return await this.commandBus.execute<ApproveLoanCommand, any>(
      new ApproveLoanCommand(approveLoanDto, id),
    );
  }

  /**Obtener por id de loan */
  @Get(':id')
  async getLoanById(@Param('id') id:string, @Query() details?:PaginationDto):Promise<any>{
    return await this.commandBus.execute<GetLoanByIdCommand, any>(
      new GetLoanByIdCommand(id, details)
    )
  }
}
