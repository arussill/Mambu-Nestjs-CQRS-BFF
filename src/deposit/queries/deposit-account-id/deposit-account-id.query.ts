import { PaginationDto } from '../../../shared/dto/pagination.dto';
export class DepositAccountIdQuery {
  constructor(public readonly id: string, public readonly details?: PaginationDto) {}
}
