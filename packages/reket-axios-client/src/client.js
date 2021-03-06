import { ReketClient, ReketError, buildReketResponse } from '@ovhcloud/reket-core';

import axios from 'axios/dist/axios';

export class AxiosReketClient extends ReketClient {
  constructor() {
    super(axios);
  }

  request(config = {}) {
    return this.client
      .request(config)
      .then((response) => buildReketResponse(response))
      .catch((error) =>
        Promise.reject(new ReketError(error.message, error.response)),
      );
  }
}

export default {
  AxiosReketClient,
};
