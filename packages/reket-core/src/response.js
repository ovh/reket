/**
 * Represent a Reket response structure base. Non readonly attributes depend of the HTTP call.
 * @typedef {Object<string, *>|Array}   ReketResponse
 *
 * @property {Object} getConfig         readonly property that expose the original config of
 *                                      the request.
 * @property {Object} getHeaders        readonly property that expose the response headers returned
 *                                      by the HTTP call.
 * @property {Object} getRequest        readonly property that expose the original request that
 *                                      has been send.
 * @property {string} getStatus         readonly property that expose the response status
 *                                      (e.g. 200, 304, ...).
 * @property {string} getStatusText     readonly property that expose the status text of
 *                                      the response (e.g. "OK", "Not Modified", ...).
 * @property {bool}   _isReketResponse  readonly and internal only property.
 */

/**
 * Creates a response with data exposed and other response attributes exposed as readonly.
 * This format will avoid having to access `response.data`` in order to get the data.
 * Imagine we have a HTTP with response promise as follow:
 * ```
 * "data": {
 *   "shi": "ming",
 *   "foo": "bar",
 *  "me": "zot"
 * },
 * "headers": {
 *   ...
 * }
 * ```
 * To access data in the promise you have to do something like:
 * ```
 * Reket.get('/my/url').then((response) => {
 *   const foo = response.data.foo;
 *   // or const { foo } = response.data;
 *   // and then access the headers
 *   const headers = response.headers;
 * });
 * ```
 *
 * With ReketResponse format it's possible to get directly foo from response like so:
 * ```
 * Reket.get('/my/url').then((response) => {
 *   const foo = response.foo;
 *   // or const { foo } = response;
 *   // and then access the headers
 *   const headers = response.getHeaders;
 * });
 * ```
 *
 * @param  {*}      options.data       The data returned by the HTTP call.
 * @param  {Object} options.config     The original config of the request.
 * @param  {Object} options.headers    The response headers returned by the HTTP call.
 * @param  {Object} options.request    The original request that has been send.
 * @param  {string} options.status     The response status (e.g. 200, 304, ...)
 * @param  {string} options.statusText The status text of the response (e.g. "OK",
 *                                     "Not Modified", ...)
 *
 * @return {ReketResponse}
 */



export const buildReketResponse = ({ data, config, headers, request, status, statusText }) => {
  let props = {};
  let responseData = data;
  let response = {};

  // detect type of response data
  if (!Array.isArray(responseData)) {
    // if not an array (Object, string, number, ...)
    if (typeof responseData !== 'object') {
      // and not an object (number, string, null, ...).
      // Treat it as an object and wrap data into an object with value as key.
      // If HTTP data response is `"response"` the reket response object will look like:
      //
      // ```
      // {
      //   value: 'response'
      // }
      // ```
      responseData = {
        value: responseData,
      };
    }

    // build an object with all properties of http call response.
    // Those propertiess are enumerable in the Object, meaning that `Object.keys(obj)`
    // will list that properties.
    Object.keys(responseData).forEach((attrName) => {
      props[attrName] = {
        value: responseData[attrName],
        writable: true,
        enumerable: true,
      };
    });

    Object.defineProperties(response, props);
  } else {
    // if response data is an array, do not modify it's prototype.
    response = data;
  }

  // define the readonly properties of the response.
  Object.defineProperties(response, {
    getConfig: {
      value: config,
      writable: false,
      enumerable: false,
    },
    getHeaders: {
      value: headers,
      writable: false,
      enumerable: false,
    },
    getRequest: {
      value: request,
      writable: false,
      enumerable: false,
    },
    getStatus: {
      value: status,
      writable: false,
      enumerable: false,
    },
    getStatusText: {
      value: statusText,
      writable: false,
      enumerable: false,
    },
    '_isReketResponse': {
      value: true,
      writable: false,
      enumerable: false,
    },
  });

  return response;
};

export default {
  buildReketResponse,
};
