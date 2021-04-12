/**
 * @class  ReketClient
 * @classdesc
 * Class that will host an HTTP client. A client must be configured in order to make
 * HTTP requests with Reket class.
 *
 * @abstract
 * @constructor
 * @param {Object} client   An HTTP client that will handle HTTP calls (e.g. axios, ky, etc...).
 */
export class ReketClient {
  /**
   * The HTTP client that will be used for making HTTP requests.
   *
   * @name ReketClient#client
   * @type {Object}
   */
  client;

  constructor(client) {
    this.client = client;
  }

  /**
   * Method that needs to be implemented by classes that extend ReketClient.
   *
   * When implementing the method, the extended class has to use the defined client to send the
   * HTTP requests.
   *
   * This method will be called by `Reket.request` method in order to make HTTP calls.
   *
   * @abstract
   * @throws {Error} If extended class does not implement the method.
   */
  request() {
    throw new Error(
      `[ReketClient]: request method must be implemented by ${this.constructor.name} class.`,
    );
  }
}

export default {
  ReketClient,
};
