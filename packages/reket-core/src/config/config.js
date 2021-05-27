import { ReketClient } from '../client';
import { ReketRequestType } from '../request';

import { AVAILABLE_CONFIG_NAMES } from './constants';

/**
 * @class ReketConfig
 * @classdesc
 * This class manages the entire configuration of Reket.
 *
 * @constructor
 * @param {Object}                    options                   Options for creating an instance of
 *                                                              ReketConfig.
 * @param {ReketClient}               [options.client]          The client that will be used by the core.
 * @param {Array<ReketRequestType>}   [options.requestTypes=[]] A list of request types that can be
 *                                                              used to predifine some url prefix.
 * @param {string}                    [urlPrefix='']            A global/default url prefix that
 *                                                              will be used if none provided by
 *                                                              the request.
 */
export class ReketConfig {
  /**
   * Configuration used by ReketCore instance.
   * @name ReketConfig#config
   * @type {Map<string, *>}
   * @private
   */
  #config = new Map();

  /**
   * The ReketClient instance that will be used for making HTTP requests.
   * @name ReketConfig#client
   * @type {ReketClient}
   * @readonly
   */
  get client() {
    return this.#config.get('client');
  }

  /**
   * A list of available request types that can be used to predifine some url prefix.
   * @name ReketConfig#requestTypes
   * @type {Array<ReketRequestType>}
   * @readonly
   */
  get requestTypes() {
    return this.#config.get('requestTypes');
  }

  /**
   * A global/default url prefix that will be used if none provided by the request.
   * @name ReketConfig#urlPrefix
   * @type {string}
   * @readonly
   */
  get urlPrefix() {
    return this.#config.get('urlPrefix');
  }

  constructor({ client, requestTypes = [], urlPrefix = '' } = {}) {
    if (client) {
      this.setClient(client);
    }

    // create a requestTypes entry in config Map
    this.#config.set('requestTypes', new Map());
    this.addRequestTypes(requestTypes);

    // set default urlPrefix
    this.setUrlPrefix(urlPrefix);
  }

  /**
   * Define a configuration into the config Map.
   * @param {string} configName  The name of the configuration to set.
   * @param {*}      configValue The value of the config that will be setted.
   * @return this
   */
  setConfig(configName, configValue) {
    if (!AVAILABLE_CONFIG_NAMES.includes(configName)) {
      throw new Error(
        `[ReketConfig.setConfig]: ${configName} is not a valid configuration name.`,
      );
    }

    switch (configName) {
      case 'client':
        return this.setClient(configValue);
      case 'requestTypes':
        return this.addRequestTypes(configValue);
      default:
        this.#config.set(configName, configValue);
        return this;
    }
  }

  /*= ===================================================
  =            Requests types configuration            =
  ==================================================== */

  /**
   * Add a request type to the request types configuration list.
   * @param {ReketRequestTye|Object} requestType An instance of ReketRequestTye or the options for
   *                                             creating ReketRequestType instance.
   * @return this
   *
   * @see {@link ReketRequestType}  constructor for available options if `requestType` param is an
   *                                Object.
   */
  addRequestType(requestType) {
    let reqType = requestType;

    if (!(reqType instanceof ReketRequestType)) {
      reqType = new ReketRequestType(reqType);
    }

    this.requestTypes.set(reqType.type, reqType);
    return this;
  }

  /**
   * Add multiple request types into the configuration list.
   *
   * This method is a shortcut of:
   * ```
   * ReketConfig.setConfig('requestTypes', [ // some request types ]);
   * ```
   * @param {Array<ReketRequestType|Object>} requestTypes The list of request types to add.
   *                                                      The items of this list could be
   *                                                      instances of ReketRequestType of Objects
   *                                                      with the options for creating
   *                                                      ReketRequestType instances.
   * @return this
   *
   * @see {@link ReketRequestType}  constructor for available options for Object array items.
   */
  addRequestTypes(requestTypes) {
    requestTypes.forEach((requestType) => {
      this.addRequestType(requestType);
    });
    return this;
  }

  /**
   * Get a configured request type.
   * @param  {string} type      The type of the request to get.
   * @return {ReketRequestType} The configured request type if `type` is configured,
   *                            `undefined` otherwise.
   */
  getRequestType(type) {
    return this.requestTypes.get(type);
  }

  /*= ====  End of Requests types configuration  ====== */

  /*= ===============================================
  =            Url prefix configuration            =
  ================================================ */

  /**
   * Determine the url prefix of a request. This will be determined as follow:
   * - first check if the configuration of the request has an url prefix setted ;
   * - then if no predefined request types configured, check if the global urlPrefix
   * configuration is setted ;
   * - then check if a `serviceType` is present in the configuration of the request and
   * take the associated configured url prefix (from `requestTypes` confifuration list) ;
   * - otherwise take the first urlPrefix of the `requestTypes` configuration list.
   *
   * @param  {ReketRequest} reketRequest An instance of ReketRequest.
   * @return {string}                    The url prefix that will be prepend to the request url.
   */
  getRequestUrlPrefix(reketRequest) {
    // get the url prefix of the http request if defined
    if (reketRequest.urlPrefix) {
      return reketRequest.urlPrefix;
    }

    // return the global configured url prefix
    // if no requests types defined
    if (!this.requestTypes.size) {
      return this.#config.get('urlPrefix') || '';
    }

    // get the prefix from request request type
    if (reketRequest.serviceType) {
      return this.requestTypes.has(reketRequest.serviceType)
        ? this.requestTypes.get(reketRequest.serviceType).urlPrefix
        : this.#config.get('urlPrefix');
    }

    // return the url prefix from the default serviceType (the first one of the list)
    return this.requestTypes.values().next().value.urlPrefix || '';
  }

  /**
   * Set the global url prefix configuration.
   * @param {string} urlPrefix The global url prefix to set.
   * @return this
   */
  setUrlPrefix(urlPrefix) {
    this.#config.set('urlPrefix', urlPrefix);
    return this;
  }

  /*= ====  End of Url prefix configuration  ====== */

  /*= ===========================================
  =            Client configuration            =
  ============================================ */

  /**
   * Set the client configuration.
   * This is the client that will be used by Reket for making HTTP calls.
   * @param {ReketClient} client An instance of ReketClient.
   * @return this
   */
  setClient(client) {
    if (!(client instanceof ReketClient)) {
      throw new Error(
        '[ReketConfig.setClient]: client must be an instance of ReketClient.',
      );
    }

    this.#config.set('client', client);
    return this;
  }

  /*= ====  End of Client configuration  ====== */
}

export default {
  ReketConfig,
};
