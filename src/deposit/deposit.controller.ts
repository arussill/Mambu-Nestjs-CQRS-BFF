import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateDepositCommand } from './commands';

@Controller('deposit')
export class DepositController {
  constructor(private readonly commandBus:CommandBus) {}

  @Post()
  async create(@Body() createDepositDto: CreateDepositDto): Promise<any> {
    return await this.commandBus.execute<CreateDepositCommand, any>(new CreateDepositCommand(createDepositDto))
  }

  // @Get()
  // findAll() {
  //   return this.depositService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.depositService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDepositDto: UpdateDepositDto) {
  //   return this.depositService.update(+id, updateDepositDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.depositService.remove(+id);
  // }
}
