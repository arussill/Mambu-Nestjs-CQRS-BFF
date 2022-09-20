import { PaginationDto } from '../../../shared/dto/pagination.dto';
export class GetClientsQuery {
  constructor(public readonly paginationDto: PaginationDto) {
    // console.log("consulta")
    // console.log(paginationDto)
  }
}
