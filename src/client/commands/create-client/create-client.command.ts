import { CreateClientDto } from '../../dto';

export class CreateClientCommand {
  constructor(public readonly createClientDto: CreateClientDto) {
    // console.log('Comando cliente:');
    // console.log(createClientDto);
  }
}
