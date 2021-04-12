import { DEFAULT_SSO_AUTH_OPTIONS } from './constants';
import { ReketRequest } from '../request';

/**
 * @class  ReketConfigSsoAuth
 * @classdesc
 * This class manages all the sso auth configuration that can be used by Reket.
 *
 * @constructor
 * @param {Object}    urls                        The urls used by SSO auth configuration.
 * @param {string}    [urls.loginUrl]             The login url where to be redirected in case of
 *                                                non authenticated request.
 * @param {string}    [urls.logoutUrl]            The url where to be redirected when
 *                                                disconnecting.
 * @param {string}    [urls.userUrl]              The url used to log in.
 * @param {Object}    callbacks                   The callbacks functions that will be used after
 *                                                some SSO actions.
 * @param {Function}  [callbacks.onLoginSuccess]  A function called after log in success.
 */
export class ReketConfigSsoAuth {
  /**
   * A list of urls used by SSO auth for different redirections.
   * @name ReketConfigSsoAuth#urls
   * @type {Map<string, string>}
   * @private
   */
  #urls = new Map();

  /**
   * Shortcut for getting the configured login url.
   * @name ReketConfigSsoAuth#loginUrl
   * @type {string}
   * @readonly
   */
  get loginUrl() {
    return this.#urls.get('loginUrl');
  }

  /**
   * Shortcut for getting the configured logout url.
   * @name ReketConfigSsoAuth#logoutUrl
   * @type {string}
   * @readonly
   */
  get logoutUrl() {
    return this.#urls.get('logoutUrl');
  }

  /**
   * Shortcut for getting the configured user url.
   * @name ReketConfigSsoAuth#userUrl
   * @type {string}
   * @readonly
   */
  get userUrl() {
    return this.#urls.get('userUrl');
  }

  /**
   * A list of callbacks called by SSO auth after some actions.
   * @name ReketConfigSsoAuth#callbacks
   * @type {Map<string, Function>}
   * @private
   */
  #callbacks = new Map();

  /**
   * Shortcut for getting the configured onLoginSuccess callback.
   * @name ReketConfigSsoAuth#onLoginSuccessCallback
   * @type {string}
   * @readonly
   */
  get onLoginSuccessCallback() {
    return this.#callbacks.get('onLoginSuccess');
  }

  /**
   * Flag that store even the user is logged or not.
   * @name ReketConfigSsoAuth#isLogged
   * @type {Boolean}
   * @private
   */
  #isLogged = false;

  /**
   * The connected user. Will contain the result of the call to configured `userUrl`.
   * @name ReketConfigSsoAuth#user
   * @type {Object}
   * @private
   */
  #user;

  /**
   * A list of deferreds object that will be used during differents actions and redirections.
   * @name ReketConfigSsoAuth#deferreds
   * @type {Map<string, Object>}
   * @private
   */
  #deferreds = new Map();

  /**
   * Shortcut for getting the deferred used during login phase.
   *
   * This is the only one deferred publicly accessible and can be used in order to get information of
   * logged in user.
   * @name ReketConfigSsoAuth#loginDeferred
   * @type {string}
   * @readonly
   */
  get loginDeferred() {
    return this.#deferreds.get('login');
  }

  constructor({ loginUrl, logoutUrl, userUrl } = {}, { onLoginSuccess } = {}) {
    // set urls (set default if not specified)
    this.setLoginUrl(loginUrl || DEFAULT_SSO_AUTH_OPTIONS.loginUrl);
    this.setLogoutUrl(logoutUrl || DEFAULT_SSO_AUTH_OPTIONS.logoutUrl);
    this.setUserUrl(userUrl || DEFAULT_SSO_AUTH_OPTIONS.userUrl);

    // set callbacks
    if (onLoginSuccess) {
      this.setOnLoginSuccessCallback(onLoginSuccess);
    }

    // create login deferred
    this.#deferreds.set('login', ReketConfigSsoAuth.createDeferred());
  }

  /**
   * An helper for creating a deferred object.
   * @return {Object} An object representing a deferred object.
   * @static
   */
  static createDeferred() {
    const deferred = {};

    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    return deferred;
  }

  /*= =========================================
  =            URLS configuration            =
  ========================================== */

  /**
   * Set the login url. This url will be used when login request fail.
   * @param {string} loginUrl The login url to set.
   * @return this
   */
  setLoginUrl(loginUrl) {
    this.#urls.set('loginUrl', loginUrl);
    return this;
  }

  /**
   * Set the logout url. This url will be used when calling `logout` method.
   * @param {string} logoutUrl The logout url to set.
   * @return this
   */
  setLogoutUrl(logoutUrl) {
    this.#urls.set('logoutUrl', logoutUrl);
    return this;
  }

  /**
   * Set the user url that will be used for checking authentification by `login` method.
   * @param {string} userUrl The user url to set.
   * @return this
   */
  setUserUrl(userUrl) {
    this.#urls.set('userUrl', userUrl);
    return this;
  }

  /*= ====  End of URLS configuration  ====== */

  /*= ==============================================
  =            Callbacks configuration            =
  =============================================== */

  /**
   * Set the onLogged callback function. A callback used after a successful login (a successful
   * call to `userUrl`).
   * @param {Function} onLoginSuccessCallback The function that will be called onLogged success.
   * @return this
   */
  setOnLoginSuccessCallback(onLoginSuccessCallback) {
    if (!(onLoginSuccessCallback instanceof Function)) {
      throw new Error(
        '[ReketConfigSsoAuth.setOnLoginSuccessCallback]: onLoginSuccessCallback param must be a Function.',
      );
    }

    this.#callbacks.set('onLoginSuccess', onLoginSuccessCallback);
    return this;
  }

  /*= ====  End of Callbacks configuration  ====== */

  /*= ==============================================
  =            Redirections management            =
  =============================================== */

  /**
   * Redirect to given url.
   * @param  {string} url The url where to redirect.
   * @static
   */
  static redirectTo(url) {
    return window.location.assign(url);
  }

  /**
   * Build an url with given params.
   * @param  {string}         url     The base url to build.
   * @param  {Array<string>}  params  The params that needs to be added to the url
   *                                  (e.g. status=ok, foo=bar, ...).
   * @return {string}                 The result of the concatenation of the url and differents
   *                                  url params.
   * @static
   */
  static buildUrl(url, params) {
    return `${url}${url.indexOf('?') > -1 ? '&' : '?'}${params.join('&')}`;
  }

  /*= ====  End of Redirections management  ====== */

  /*= =======================================
  =            Login management            =
  ======================================== */

  /**
   * Check if user is logged or not.
   * @return {Promise<Boolean>} The value stored into `isLogged` member.
   */
  isLogged() {
    return this.#deferreds.get('login').promise.then(() => this.#isLogged);
  }

  /**
   * Send an XHR request to the configured user url in order to determine if user is logged or not.
   * @param  {ReketClient} client An instance of ReketClient in order to send an XHR request.
   * @return {Promise}
   */
  login(client) {
    const loginRequest = new ReketRequest(this.userUrl, {
      method: 'GET',
      headers: DEFAULT_SSO_AUTH_OPTIONS.headers,
    });

    client
      .request(loginRequest)
      .then((data) => {
        // set user attribute with nic informations
        this.#user = data;
        this.#isLogged = true;

        // call to onLoginSuccess callback
        if (this.onLoginSuccessCallback) {
          return this.onLoginSuccessCallback(this.#user);
        }

        return true;
      })
      .catch(() => {
        this.#isLogged = false;

        // let's redirect to login page in order to be logged in
        this.redirectToLogin();
      })
      .finally(() => {
        // resolve login defer
        this.loginDeferred.resolve(this.#user);
      });

    return this.#deferreds.get('login').promise;
  }

  /**
   * Redirect the browser to login page.
   * @param  {string} [onsuccessUrl] The url to set as onsuccess param to the login url.
   * @return {Promise}
   */
  redirectToLogin(onsuccessUrl) {
    if (!this.#deferreds.has('loginPage')) {
      this.#deferreds.set('loginPage', ReketConfigSsoAuth.createDeferred());

      const params = [];

      if (this.loginUrl.indexOf('onsuccess') === -1) {
        params.push(
          `onsuccess=${encodeURIComponent(
            onsuccessUrl || window.location.href,
          )}`,
        );
      }

      // redirect to login url
      ReketConfigSsoAuth.redirectTo(
        ReketConfigSsoAuth.buildUrl(this.loginUrl, params),
      );
    }

    return this.#deferreds.get('loginPage').promise;
  }

  /*= ====  End of Login management  ====== */

  /*= ========================================
  =            Logout management            =
  ========================================= */

  logout(onsuccessUrl) {
    return this.redirectToLogoutPage(onsuccessUrl);
  }

  /**
   * Logout the connected user and redirect him to the logout page.
   * @param  {string} onsuccessUrl The url to set as onsuccess param to the logout url.
   * @return {Promise}
   * @alias ReketConfigSsoAuth.logout
   */
  redirectToLogoutPage(onsuccessUrl) {
    if (
      !this.#deferreds.has('logoutPage') &&
      !this.#deferreds.has('loginPage')
    ) {
      this.#deferreds.set('logoutPage', ReketConfigSsoAuth.createDeferred());
      this.#isLogged = false;

      const params = [];

      if (this.logoutUrl.indexOf('onsuccess') === -1) {
        params.push(
          `onsuccess=${encodeURIComponent(
            onsuccessUrl || window.location.href,
          )}`,
        );
      }

      if (this.logoutUrl.indexOf('from') === -1 && document.referrer) {
        params.push(`from=${encodeURIComponent(document.referrer)}`);
      }

      // redirect to login url
      ReketConfigSsoAuth.redirectTo(
        ReketConfigSsoAuth.buildUrl(this.logoutUrl, params),
      );
    }

    return this.#deferreds.get('logoutPage').promise;
  }

  /*= ====  End of Logout management  ====== */
}

export default {
  ReketConfigSsoAuth,
};
