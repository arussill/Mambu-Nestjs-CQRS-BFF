//Commands
export { CreateClientCommand } from './create-client/create-client.command';

//Manejadores de comandos
import { CreateClientHandler } from './create-client/create-client.handler';
export const ClientsCommandsHandlers = [CreateClientHandler];
