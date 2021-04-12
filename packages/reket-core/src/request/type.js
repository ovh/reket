/**
 * @class ReketRequestType
 * @classdesc
 * Represent a type of request used by Reket core in order to predefine url prefix.
 *
 * @constructor
 * @param {Object} options            Options for creating a request type.
 * @param {string} options.type       The name of the request type.
 * @param {string} options.urlPrefix  The url prefix linked to the request type.
 */
export class ReketRequestType {
  /**
   * The name of the request type.
   * @name ReketRequestType#type
   * @type {string}
   * @readonly
   */
  #type;

  get type() {
    return this.#type;
  }

  /**
   * The url prefix linked to the request type.
   * @name ReketRequestType#urlPrefix
   * @type {string}
   * @readonly
   */
  #urlPrefix;

  get urlPrefix() {
    return this.#urlPrefix;
  }

  constructor({ type, urlPrefix } = {}) {
    this.#type = type;
    this.#urlPrefix = urlPrefix;
  }
}

export default {
  ReketRequestType,
};
