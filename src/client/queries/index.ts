//Querys
export { GetClientByIdQuery } from './get-client-by-id/get-client-by-id.query';
export { GetClientsQuery } from './get-clients/get-clients.query';

//Manejadores de Querys
import { GetClientByIdHandler } from './get-client-by-id/get-client-by-id.handler';
import { GetClientHandler } from './get-clients/get-clients.handler';
export const ClientsQueriesHandlers = [GetClientHandler, GetClientByIdHandler];
