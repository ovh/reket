# Reket

> Perform HTTP calls easily with your preferred client in an abstract way.

**Reket** provides a way to use your favorite HTTP client by simply configure it.

Today you use `fetch`, tomorrow you want to use `axios`?
You simply need to configure `Reket` without having to replace your code.

## Usage with axios client

The axios client is already existing and you can directly use it.
If you don't want to use `axios` client, you can use an other `Reket` client or also create your own (see section "How to use a non existing client?").

### Installation

```bash
$ yarn add @ovhcloud/reket-core
$ yarn add @ovhcloud/reket-axios-client
```

### Usage

```js
import { Reket } from '@ovhcloud/reket-core';
import { AxiosReketClient } from '@ovhcloud/reket-axios-client';

const reketInstance = new Reket();
reketInstance.config.client.set(new AxiosReketClient());

reketInstance.get('/shi/foo/me') // get method returns a Promise
  .then((response) => {
    console.log(response); // response is of type ReketResponse
  });
```

### Configuration

Whatever client you use, you can configure `Reket`.

#### hooks

You can configure (for the moment) a hook on the response that allows you to change the response before it is passed to then/catch.

```js
import { Reket } from '@ovhcloud/reket-core';
import { AxiosReketClient } from '@ovhcloud/reket-axios-client';

const reketInstance = new Reket();
reketInstance.config.hooks.response.set((response) => {
  // do what you want with the response
  return response;
}, (error) => {
  // do what you want with the error (i.e. check the status code in order to check authentification, etc...)
  return Promise.reject(error);
});
```

#### requestTypes

This configuration is useful to predefine some URL prefixes if you use different APIs or different API versions.
Consider you have `1.0` API and a `2.0` API, you can configure it like so:

```js
import { Reket } from '@ovhcloud/reket-core';
import { AxiosReketClient } from '@ovhcloud/reket-axios-client';

const reketInstance = new Reket();
reketInstance.config.client.set(new AxiosReketClient());

reketInstance.config.requestTypes.add([
  {
    type: '1.0',
    urlPrefix: '/1.0',
  },
  {
    type: '2.0',
    urlPrefix: '/2.0',
  },
]);

// make a call to API v1.0
Reket.get('/my/v1/route', {
  serviceType: '1.0',
});
// or, as by default Reket use the first request type of the list if serviceType option
// is not specified, you can simply call:
Reket.get('/my/v1/route');

// make a call to API v2.0
Reket.get('/my/v2/route', {
  serviceType: '2.0',
});
```

#### urlPrefix

You can configure a global prefix for your request URL. This prefix will be used if no `requestTypes` are defined or if the serviceType of your request is not found.

```js
import { Reket } from '@ovhcloud/reket-core';
import { AxiosReketClient } from '@ovhcloud/reket-axios-client';

const reketInstance = new Reket();
reketInstance.config.urlPrefix.set('/shi/foo/me');

```

## How to use a non existing client?

First you need to create a ReketClient by overriding the `ReketClient` class.
Then instantiate an instance of `Reket` class with your created client class.

```js
// import classes from reket-core
import {
  ReketClient,
  ReketError,
  ReketResponse,
  Reket,
} from '@ovhcloud/reket-core';
// import your client lib
import myHttpLib from 'my-http-lib';

export class MyHttpLibReketClient extends ReketClient {
  constructor() {
    super(myHttpLib);
  }

  // then override the request method of ReketClient
  request(config = {}) {
    // use the method of your lib that is used for making HTTP calls.
    // depending the library, the params for the methods and response/error classes are different
    // and therefore you have to adapt it to your case.
    return this.client
      .request(config)
      .then((response) => new ReketResponse(response))
      .catch((error) =>
        Promise.reject(new ReketError(error.message, error.response)),
      );
  }
}

export default {
  MyHttpLibReketClient,
};
```

That's it!
All your previous code stay the same, the only change that is made is that the HTTP client is not the same.

## What's next?

- Add more clients

## Related links

* Contribute: <https://github.com/ovh/reket/blob/main/CONTRIBUTING.md>
* Report bugs: <https://github.com/ovh/reket/issues>
* Get latest version: <https://github.com/ovh/reket/releases>
