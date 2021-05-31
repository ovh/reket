/**
 * @class  ReketRequest
 * @classdesc
 * Class representing a Request.
 *
 * @constructor
 * @param {string} [url]              Absolute or relative URL of the resource that is being requested.
 * @param {Object} options            The options of the request object to create. Refer to your
 *                                    client lib for available options. Some of the options are
 *                                    abstracted by this class to have something generic.
 * @param {string} [options.method]   HTTP method (e.g. 'GET', 'POST', etc).
 * @param {Object} [options.headers]  Map of strings representing HTTP headers to send to the
 *                                    server.
 *
 * @todo: manage other Iceberg headers.
 */
export class ReketRequest {
  /**
   * The url of the HTTP request.
   * @name ReketRequest#url
   * @type {string}
   */
  url;

  /**
   * Abstracted object representing HTTP headers to send to the server.
   * @name ReketRequest#headers
   * @type {Object}
   */
  headers = {};

  constructor(url, options) {
    this.url = url;
    Object.assign(this, options);
  }

  /**
   * Add a header to be send.
   * @param {string} name  The name of the header to add
   * @param {string} value The value of the header.
   * @return this
   */
  addHeader(name, value) {
    this.headers[name] = value;
    return this;
  }

  /**
   * Set the data to be sent as the request message data.
   * @param {object} requestData The data to send in request message data.
   * @return this
   */
  setData(requestData = {}) {
    this.data = requestData;
    return this;
  }

  /**
   * Set the HTTP method used by the request.
   * @param {string} requestMethod The HTTP method (e.g. 'GET', 'POST', etc).
   * @return this
   */
  setMethod(requestMethod = {}) {
    this.method = requestMethod;
    return this;
  }
}

export default {
  ReketRequest,
};
