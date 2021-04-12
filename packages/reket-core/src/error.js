/**
 * @class ReketError
 * @extends Error
 * @classdesc
 * Class representing an error that will be returned when the HTTP call fail.
 *
 * @constructor
 * @param {string} message            The error message (the reason why the call failed).
 * @param {Object} details            The details of the error returned by the original client.
 * @param {Object} details.config     The original config of the request.
 * @param {Object} details.data       The data returned with the error.
 * @param {Object} details.headers    The response headers returned with the error.
 * @param {string} details.status     The error status (e.g. 404, 500, ...)
 * @param {string} details.statusText The status text of the error (e.g. "Not Found",
 *                                    "Internal Server Error", ...)
 */
export class ReketError extends Error {
  /**
   * The original config of the request.
   *
   * @name ReketError#config
   * @type {Object}
   */
  config;

  /**
   * The data returned with the error.
   *
   * @name ReketError#data
   * @type {Object}
   */
  data;

  /**
   * The response headers returned with the error.
   *
   * @name ReketError#headers
   * @type {Object}
   */
  headers;

  /**
   * The error status (e.g. 404, 500, ...)
   *
   * @name ReketError#status
   * @type {string}
   */
  status;

  /**
   * The status text of the error (e.g. "Not Found", "Internal Server Error", ...)
   *
   * @name ReketError#statusText
   * @type {string}
   */
  statusText;

  constructor(message, { config, data, headers, status, statusText } = {}) {
    super(message);

    Object.assign(this, {
      config,
      data,
      headers,
      status,
      statusText,
    });
  }
}

export default ReketError;
