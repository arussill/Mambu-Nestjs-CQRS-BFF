import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

export const getHeaders = (config: ConfigService) => {
  return {
    apikey: config.get('apiKey'),
    Accept: config.get('Accept'),
    'Content-Type': config.get('ContentType'),
    'Idempotency-Key': uuid(),
  };
};
