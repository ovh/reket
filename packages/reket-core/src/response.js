/**
 * @class ReketResponse
 * @classdesc
 *
 * @constructor
 * @param {Object} clientResponse             The response returned by the client.
 * @param {Object} clientResponse.config      The original config of the request.
 * @param {*}      clientResponse.data        The data returned by the HTTP call.
 * @param {Object} clientResponse.headers     The response headers returned by the HTTP call.
 * @param {Object} clientResponse.request     The original request that has been send.
 * @param {string} clientResponse.status      The response status (e.g. 200, 304, ...)
 * @param {string} clientResponse.statusText  The status text of the response (e.g. "OK",
 *                                            "Not Modified", ...)
 */
export class ReketResponse {
  /**
   * The original config of the request.
   * @name ReketResponse#config
   * @type {Object}
   * @private
   */
  #config;

  /**
   * The response headers returned by the HTTP call.
   * @name ReketResponse#headers
   * @type {Object}
   * @private
   */
  #headers;

  /**
   * The original request that has been send.
   * @name ReketResponse#request
   * @type {Object}
   * @private
   */
  #request;

  /**
   * The response status (e.g. 200, 304, ...)
   * @name ReketResponse#status
   * @type {string}
   * @private
   */
  #status;

  /**
   * The status text of the response (e.g. "OK", "Not Modified", ...)
   * @name ReketResponse#statusText
   * @type {string}
   * @private
   */
  #statusText;

  constructor(clientResponse) {
    const { data } = clientResponse;

    if (data instanceof Object) {
      Object.assign(this, data);
    } else {
      this.data = data;
    }

    // set private members
    this.#config = clientResponse.config;
    this.#headers = clientResponse.headers;
    this.#request = clientResponse.request;
    this.#status = clientResponse.status;
    this.#statusText = clientResponse.statusText;
  }

  /**
   * Get the original configuration of the request.
   * @return {Object} The original config of the request.
   */
  getConfig() {
    return this.#config;
  }

  /**
   * Get the response headers returned by the HTTP call.
   * @return {Object} The response headers returned by the HTTP call.
   */
  getHeaders() {
    return this.#headers;
  }

  /**
   * Get the original request that has been send.
   * @return {Object} The original request that has been send.
   */
  getRequest() {
    return this.#request;
  }

  /**
   * Get the response status.
   * @return {string} The response status.
   */
  getStatus() {
    return this.#status;
  }

  /**
   * Get the status text of the response.
   * @return {string} The status text of the response.
   */
  getStatusText() {
    return this.#statusText;
  }
}

export default {
  ReketResponse,
};
