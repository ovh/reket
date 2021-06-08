import { ReketConfig } from './config';
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
    return this.#config.client.value;
  }

  get hooks() {
    return this.#config.hooks;
  }

  get requestTypes() {
    return this.#config.requestTypes;
  }

  get urlPrefix() {
    return this.#config.urlPrefix.value;
  }

  getRequestUrlPrefix(reketRequest) {
    // get the url prefix of the http request if defined
    if (reketRequest.urlPrefix) {
      return reketRequest.urlPrefix;
    }

    // return the global configured url prefix
    // if no requests types defined
    if (!this.requestTypes.size) {
      return this.urlPrefix || '';
    }

    // get the prefix from request request type
    if (reketRequest.requestType) {
      return (
        this.requestTypes.getUrlPrefix(reketRequest.requestType) ||
        this.urlPrefix
      );
    }

    // return the url prefix from the default requestType (the first one of the list)
    return this.requestTypes.getDefaultUrlPrefix() || '';
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
      url: `${this.getRequestUrlPrefix(reketRequest)}${reketRequest.url}`,
    });

    return this.client
      .request(reketRequest)
      .then((reketResponse) => {
        if (!reketResponse._isReketResponse) {
          throw new Error(
            'Your client request must return a ReketResponse type by using buildReketResponse method.',
          );
        }

        return this.hooks.response.onSuccess
          ? this.hooks.response.onSuccess(reketResponse)
          : reketResponse;
      })
      .catch((reketError) =>
        Promise.reject(
          this.hooks.response.onError
            ? this.hooks.response.onError(reketError)
            : reketError,
        ),
      );
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
