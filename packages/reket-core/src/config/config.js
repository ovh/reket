import { ReketConfigHooks } from './hooks';
import { ReketConfigItem } from './item';
import { ReketConfigRequestTypes } from './request-types';

/**
 * @class ReketConfig
 * @classdesc
 * This class manages the entire configuration of Reket.
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
   * The ReketConfigItem that store the client instance that will be used for making HTTP requests.
   * @name ReketConfig#client
   * @type {ReketConfigItem}
   * @readonly
   */
  get client() {
    return this.#config.get('client');
  }

  /**
   * A list of available hooks that can be used
   * @name ReketConfig#hooks
   * @type {ReketConfigHooks}
   * @readonly
   */
  get hooks() {
    return this.#config.get('hooks');
  }

  /**
   * A list of available request types that can be used to predifine some url prefix.
   * @name ReketConfig#requestTypes
   * @type {ReketConfigRequestTypes}
   * @readonly
   */
  get requestTypes() {
    return this.#config.get('requestTypes');
  }

  /**
   * A global/default url prefix that will be used if none provided by the request.
   * @name ReketConfig#urlPrefix
   * @type {ReketConfigItem}
   * @readonly
   */
  get urlPrefix() {
    return this.#config.get('urlPrefix');
  }

  constructor() {
    this.#config.set('client', new ReketConfigItem());
    this.#config.set('hooks', new ReketConfigHooks());
    this.#config.set('requestTypes', new ReketConfigRequestTypes());
    this.#config.set('urlPrefix', new ReketConfigItem());
  }
}

export default {
  ReketConfig,
};
