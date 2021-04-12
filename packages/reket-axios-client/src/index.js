import { Reket } from '@ovhcloud/reket-core';
import { AxiosReketClient } from './client';

export default new Reket({
  client: new AxiosReketClient(),
});
