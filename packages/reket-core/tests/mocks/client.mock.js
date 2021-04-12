import { ReketClient } from '../../src';

export class MockReketClient extends ReketClient {
  constructor(responseData, reject = false) {
    super({});
    this.responseData = responseData;
    this.reject = reject;
  }

  request() {
    return !this.reject
      ? Promise.resolve(this.responseData)
      : Promise.reject(this.responseData);
  }
}

export default {
  MockReketClient,
};
