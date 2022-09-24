import { PaginationDto } from '../../../shared/dto/pagination.dto';
export class DepositAccountIdCommand {
  constructor(public readonly id: string, public readonly details?: PaginationDto) {}
}
