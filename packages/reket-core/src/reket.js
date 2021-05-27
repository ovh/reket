import { ReketConfig } from './config';
import { ReketResponse } from './response';
import { ReketRequest } from './request';

/**
 * @class  Reket
 * @classdesc
 * Main class of the component. This class implements all CRUD methods (get, post, put, delete).
 *
 * Simply configure a client (at least) and you will be able to make HTTP calls.
 *
 * @constructor
 * @param {ReketConfig|Object} config An instance of ReketConfig instance or an object with the
 *                                    options for creating a ReketConfig instance.
 * @see {@link ReketConfig} constructor for available options in case of `config`
 *                          parameter is an Object.
 */
export class Reket {
  /**
   * Configuration used by Reket instance.
   *
   * @name Reket#config
   * @type {ReketConfig}
   * @readonly
   */
  #config = new ReketConfig();

  get config() {
    return this.#config;
  }

  /**
   * Shortcut to get the configured client from config.
   *
   * @name Reket#client
   * @type {ReketClient}
   * @readonly
   */
  get client() {
    return this.#config.client;
  }

  constructor(config = {}) {
    this.setConfig(config);
  }

  /**
   * Set a configuration item.
   *
   * @param {ReketConfig|Object|string} config  A ReketConfig instance, an object with the options
   *                                            to create a ReketConfig instance or a string that
   *                                            will set or update a single configuration item.
   * @param {*} [value]                         The value to set to specific configuration item.
   * @return this
   */
  setConfig(config, value) {
    if (!value) {
      if (config instanceof ReketConfig) {
        this.#config = config;
      } else if (typeof config === 'object') {
        this.#config = new ReketConfig(config);
      }
    } else {
      this.#config.setConfig(config, value);
    }

    return this;
  }

  /**
   * Send an HTTP request with the configured client.
   * @param  {ReketRequest} reketRequest An instance of ReketRequest as options.
   * @return {Promise}  That returns an instance of ReketResponse in case of success,
   *                    an instance ReketError in case of error.
   */
  request(reketRequest) {
    // determine url from request options
    Object.assign(reketRequest, {
      url: `${this.#config.getRequestUrlPrefix(reketRequest)}${
        reketRequest.url
      }`,
    });

    return this.client.request(reketRequest).then((reketResponse) => {
      if (!(reketResponse instanceof ReketResponse)) {
        throw new Error(
          'Your client request must return an instance of ReketResponse',
        );
      }

      return reketResponse;
    });
  }

  /**
   * Send a GET request.
   * @param  {string|ReketRequest} urlOrReketRequest  An url to GET or an instance of ReketRequest
   *                                                  that will be passed to request method.
   * @param  {Object}              [options={}]       Options for creating an instance of
   *                                                  ReketRequest in case of urlOrReketRequest
   *                                                  parameter is a string.
   * @return {Promise}  Promise returned by request method.
   */
  get(urlOrReketRequest, options = {}) {
    let reketRequest = urlOrReketRequest;

    if (typeof reketRequest === 'string') {
      reketRequest = new ReketRequest(reketRequest, options);
    }

    // set HTTP method to GET
    reketRequest.setMethod('GET');

    return this.request(reketRequest);
  }

  /**
   * Send a POST request.
   * @param  {string|ReketRequest} urlOrReketRequest  An url where to POST or an instance of
   *                                                  ReketRequest that will be passed to
   *                                                  request method.
   * @param  {Object}              [data={}]          Data to be sent as the request message data.
   * @param  {Object}              [options={}]       Options for creating an instance of
   *                                                  ReketRequest in case of urlOrReketRequest
   *                                                  parameter is a string.
   * @return {Promise}  Promise returned by request method.
   */
  post(urlOrReketRequest, data = {}, options = {}) {
    let reketRequest = urlOrReketRequest;

    if (typeof reketRequest === 'string') {
      reketRequest = new ReketRequest(reketRequest, options);
    }

    // set HTTP method to POST
    reketRequest.setMethod('POST');

    // set data to be sent as the request message data
    if (!reketRequest.data) {
      reketRequest.setData(data);
    }

    return this.request(reketRequest);
  }

  /**
   * Send a PUT request.
   * @param  {string|ReketRequest} urlOrReketRequest  An url where to PUT or an instance of
   *                                                  ReketRequest that will be passed to
   *                                                  request method.
   * @param  {Object}              [data={}]          Data to be sent as the request message data.
   * @param  {Object}              [options={}]       Options for creating an instance of
   *                                                  ReketRequest in case of urlOrReketRequest
   *                                                  parameter is a string.
   * @return {Promise}  Promise returned by request method.
   */
  put(urlOrReketRequest, data = {}, options = {}) {
    let reketRequest = urlOrReketRequest;

    if (typeof reketRequest === 'string') {
      reketRequest = new ReketRequest(reketRequest, options);
    }

    // set HTTP method to PUT
    reketRequest.setMethod('PUT');

    // set data to be sent as the request message data
    if (!reketRequest.data) {
      reketRequest.setData(data);
    }

    return this.request(reketRequest);
  }

  /**
   * Send a DELETE request.
   * @param  {string|ReketRequest} urlOrReketRequest  An url where to DELETE or an instance of
   *                                                  ReketRequest that will be passed to
   *                                                  request method.
   * @param  {Object}              [options={}]       Options for creating an instance of
   *                                                  ReketRequest in case of urlOrReketRequest
   *                                                  parameter is a string.
   * @return {Promise}  Promise returned by request method.
   */
  delete(urlOrReketRequest, options = {}) {
    let reketRequest = urlOrReketRequest;

    if (typeof reketRequest === 'string') {
      reketRequest = new ReketRequest(reketRequest, options);
    }

    // set HTTP method to DELETE
    reketRequest.setMethod('DELETE');

    return this.request(reketRequest);
  }
}

export default {
  Reket,
};
