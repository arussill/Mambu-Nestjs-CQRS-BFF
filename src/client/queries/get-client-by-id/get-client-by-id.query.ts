import { PaginationDto } from '../../../shared/dto/pagination.dto';

export class GetClientByIdQuery {
  constructor(
    public readonly id: string,
    public readonly details?: PaginationDto,
  ) {}
}
