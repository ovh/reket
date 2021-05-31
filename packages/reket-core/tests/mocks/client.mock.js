import { ReketClient, ReketResponse, ReketError } from '../../src';

export class MockReketClient extends ReketClient {
  constructor(responseData, reject = false) {
    super({});
    this.responseData = responseData;
    this.reject = reject;
  }

  request() {
    return !this.reject
      ? Promise.resolve(new ReketResponse(this.responseData))
      : Promise.reject(new ReketError(this.responseData));
  }
}

export default {
  MockReketClient,
};
