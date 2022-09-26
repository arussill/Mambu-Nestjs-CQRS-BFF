import { PaginationDto } from '../../../shared/dto/pagination.dto';
export class GetLoanByIdQuery {
  constructor(public readonly id: string, public readonly details?: PaginationDto) {}
}
