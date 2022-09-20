import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateLoanCommand } from './commands/loan-create/loan-create.command';

/**Crear un credito */
@Controller('loans')
export class LoanController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto): Promise<any> {
    return await this.commandBus.execute<CreateLoanCommand, any>(
      new CreateLoanCommand(createLoanDto),
    );
  }
}
