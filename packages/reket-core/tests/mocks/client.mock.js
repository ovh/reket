import { ReketClient } from '../../src/client';
import { buildReketResponse } from '../../src/response';
import { ReketError } from '../../src/error';

export class MockReketClient extends ReketClient {
  constructor(responseData, reject = false) {
    super({});
    this.responseData = responseData;
    this.reject = reject;
  }

  request() {
    return !this.reject
      ? Promise.resolve(buildReketResponse(this.responseData))
      : Promise.reject(new ReketError(this.responseData));
  }
}

export default {
  MockReketClient,
};
