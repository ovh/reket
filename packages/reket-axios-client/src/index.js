import { Reket } from '@ovhcloud/reket-core';
import { AxiosReketClient } from './client';

const useAxiosReket = () =>
  new Reket({
    client: new AxiosReketClient(),
  });

export default {
  AxiosReketClient,
  useAxiosReket,
};
