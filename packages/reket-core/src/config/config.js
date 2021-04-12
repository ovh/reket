import { ReketClient } from '../client';
import { ReketConfigSsoAuth } from './sso-auth';
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
 * @param {ReketConfigSsoAuth|Object} [options.ssoAuth]         The sso auth configuration if
 *                                                              needed.
 * @param {ReketClient}               [options.client]          The client that will be used by the core.
 * @param {Array<ReketRequestType>}   [options.requestTypes=[]] A list of request types that can be
 *                                                              used to predifine some url prefix.
 * @param {string}                    [urlPrefix='']            A global/default url prefix that
 *                                                              will be used if none provided by
 *                                                              the request.
 *
 * @see {@link ReketConfigSsoAuth} constructor for available options in case of `ssoAuth`
 *                                 parameter is an Object.
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
   * The SSO Auth config that will be used by the core.
   * @name ReketConfig#ssoAuth
   * @type {ReketConfigSsoAuth}
   * @readonly
   */
  get ssoAuth() {
    return this.#config.get('ssoAuth');
  }

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

  constructor({ ssoAuth, client, requestTypes = [], urlPrefix = '' } = {}) {
    if (client) {
      this.setClient(client);
    }

    if (ssoAuth) {
      this.enableSsoAuth(ssoAuth);
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

    // special case of ssoAuth
    if (configName === 'ssoAuth') {
      return this.enableSsoAuth(configValue);
    }

    if (configName === 'client') {
      return this.setClient(configValue);
    }

    if (configName === 'requestTypes') {
      return this.addRequestTypes(configValue);
    }

    this.#config.set(configName, configValue);
    return this;
  }

  /*= =============================================
  =            SSO Auth configuration            =
  ============================================== */

  /**
   * Enable SSO Auth for Reket with its configuration.
   *
   * As this method is calling `login` method, client configuration must be setted before calling
   * this method.
   *
   * This method is a shortcut of:
   * ```
   * ReketConfig.setConfig('ssoAuth', { // add ssoAuth options });
   * ```
   * @param  {ReketConfigSsoAuth|Object} ssoAuthConfig The sso auth configuration.
   * @return this
   *
   * @see {@link ReketConfigSsoAuth}  constructor for available options in case of `ssoAuthConfig`
   *                                  parameter is an Object.
   */
  enableSsoAuth(ssoAuthConfig = {}) {
    if (!this.client) {
      throw new Error(
        '[ReketConfig.enableSsoAuth]: Please set client before enabling SSO auth in order to use it to check login',
      );
    }

    if (
      !(ssoAuthConfig instanceof ReketConfigSsoAuth) &&
      typeof ssoAuthConfig !== 'object'
    ) {
      throw new Error(
        `[ReketConfig.enableSsoAuth]: ssoAuthConfig must be an Object or an instance of ReketConfigSsoAuth. ${typeof ssoAuthConfig} given.`,
      );
    }

    let config = ssoAuthConfig;

    if (
      !(ssoAuthConfig instanceof ReketConfigSsoAuth) &&
      typeof ssoAuthConfig === 'object'
    ) {
      config = new ReketConfigSsoAuth(ssoAuthConfig);
    }

    this.#config.set('ssoAuth', config);
    this.ssoAuth.login(this.client);
    return this;
  }

  /**
   * Disable Sso Auth configuration by reseting it.
   * @return this
   */
  disableSsoAuth() {
    this.#config.delete('ssoAuth');
    return this;
  }

  /**
   * Helpers to easily knowing if sso auth is enabled or not.
   * @return {Boolean} `true` if sso auth has been configured, `false` otherwise.
   */
  isSsoAuthEnabled() {
    return this.#config.has('ssoAuth');
  }

  /*= ====  End of SSO Auth configuration  ====== */

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
