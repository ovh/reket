import { ReketConfig } from '../../src/config/config';
import { ReketConfigSsoAuth } from '../../src/config/sso-auth';
import { ReketRequestType } from '../../src/request/type';
import { ReketClient } from '../../src/client';

import { MockReketClient } from '../mocks';

describe('ReketConfig instanciation', () => {
  const configOptions = {
    client: new MockReketClient(),
    requestTypes: [
      {
        type: 'foo',
        urlPrefix: '/foo',
      },
      {
        type: 'pey',
        urlPrefix: '/pey',
      },
    ],
    ssoAuth: {},
  };

  test('it should instanciate ReketConfig without configuration', () => {
    const reketConfig = new ReketConfig();

    expect(reketConfig instanceof ReketConfig).toBe(true);
    expect(reketConfig.ssoAuth).toBe(undefined);
    expect(reketConfig.client).toBe(undefined);
    expect(reketConfig.isSsoAuthEnabled()).toBe(false);
  });

  test('it should instanciate ReketConfig with configuration', () => {
    const setClientSpy = jest.spyOn(ReketConfig.prototype, 'setClient');
    const enableSsoAuthSpy = jest.spyOn(ReketConfig.prototype, 'enableSsoAuth');
    const addRequestTypesSpy = jest.spyOn(
      ReketConfig.prototype,
      'addRequestTypes',
    );

    const reketConfig = new ReketConfig(configOptions);

    expect(reketConfig instanceof ReketConfig).toBe(true);
    expect(setClientSpy).toHaveBeenCalledWith(configOptions.client);
    expect(enableSsoAuthSpy).toHaveBeenCalledWith(configOptions.ssoAuth);
    expect(addRequestTypesSpy).toHaveBeenCalledWith(configOptions.requestTypes);
    expect(reketConfig.ssoAuth).not.toBe(undefined);
    expect(reketConfig.client).not.toBe(undefined);
    expect(reketConfig.isSsoAuthEnabled()).toBe(true);
  });

  test('it should throw an error when enabling ssoAuth and no client is set', () => {
    const reketConfig = new ReketConfig();

    expect(() => {
      reketConfig.enableSsoAuth({});
    }).toThrow(Error);
  });
});

describe('ReketConfig.setConfig method', () => {
  test('it should set ssoAuth configuration with an empty Object as configValue param', () => {
    const enableSsoAuthSpy = jest.spyOn(ReketConfig.prototype, 'enableSsoAuth');
    const reketConfig = new ReketConfig({
      client: new MockReketClient(),
    });
    const ssoAuthConfig = {};

    reketConfig.setConfig('ssoAuth', ssoAuthConfig);

    expect(reketConfig.isSsoAuthEnabled()).toBe(true);
    expect(enableSsoAuthSpy).toHaveBeenCalledWith(ssoAuthConfig);
  });

  test('it should set ssoAuth configuration with an instance of ReketConfigSsoAuth as configValue param', () => {
    const enableSsoAuthSpy = jest.spyOn(ReketConfig.prototype, 'enableSsoAuth');
    const reketConfig = new ReketConfig({
      client: new MockReketClient(),
    });
    const ssoAuthConfig = new ReketConfigSsoAuth();

    reketConfig.setConfig('ssoAuth', ssoAuthConfig);

    expect(reketConfig.isSsoAuthEnabled()).toBe(true);
    expect(enableSsoAuthSpy).toHaveBeenCalledWith(ssoAuthConfig);
  });

  test('it should set requestTypes configuration', () => {
    const addRequestTypesSpy = jest.spyOn(
      ReketConfig.prototype,
      'addRequestTypes',
    );
    const reketConfig = new ReketConfig();
    const requestTypes = [
      {
        type: 'foo',
        urlPrefix: '/foo',
      },
    ];

    reketConfig.setConfig('requestTypes', requestTypes);

    expect(reketConfig.requestTypes.size).toBe(1);
    expect(addRequestTypesSpy).toHaveBeenCalledWith(requestTypes);
  });

  test('it should set client configuration', () => {
    const setClientSpy = jest.spyOn(ReketConfig.prototype, 'setClient');
    const reketConfig = new ReketConfig();
    const reketClient = new MockReketClient();

    reketConfig.setConfig('client', reketClient);

    expect(reketConfig.client).not.toBe(undefined);
    expect(setClientSpy).toHaveBeenCalledWith(reketClient);
  });

  test('it should set urlPrefix configuration', () => {
    const reketConfig = new ReketConfig();

    reketConfig.setConfig('urlPrefix', '/kel/klet');

    expect(reketConfig.urlPrefix).not.toBe('');
  });
});

describe('ssoAuth configuration', () => {
  test('it should enable ssoAuth and call ReketConfigSsoAuth.login method', () => {
    const ssoAuthLoginSpy = jest.spyOn(ReketConfigSsoAuth.prototype, 'login');
    const client = new MockReketClient();
    const reketConfig = new ReketConfig({
      client,
    });

    reketConfig.enableSsoAuth(new ReketConfigSsoAuth());

    expect(reketConfig.isSsoAuthEnabled()).toBe(true);
    expect(ssoAuthLoginSpy).toHaveBeenCalledWith(client);
  });

  it('should disable ssoAuth', () => {
    const client = new MockReketClient();
    const ssoAuht = new ReketConfigSsoAuth();
    const reketConfig = new ReketConfig({
      client,
      ssoAuht,
    });

    reketConfig.disableSsoAuth();

    expect(reketConfig.isSsoAuthEnabled()).toBe(false);
  });
});

describe('requestTypes configuration', () => {
  test('it should add requet types using addRequestType method', () => {
    const reketConfig = new ReketConfig();

    reketConfig.addRequestType({
      type: 'foo',
      urlPrefix: '/foo',
    });
    reketConfig.addRequestType(
      new ReketRequestType({
        type: 'fooBar',
        urlPrefix: '/foo/bar',
      }),
    );

    expect(reketConfig.requestTypes.size).toBe(2);
    expect(reketConfig.getRequestType('fooBar')).not.toBe(undefined);
  });

  test('it should add request types using addRequestTypes method', () => {
    const reketConfig = new ReketConfig();
    const addRequestTypeSpy = jest.spyOn(
      ReketConfig.prototype,
      'addRequestType',
    );
    const requestTypes = [
      {
        type: 'foo',
        urlPrefix: '/foo',
      },
      {
        type: 'bar',
        urlPrefix: '/bar',
      },
      new ReketRequestType({
        type: 'fooBar',
        urlPrefix: '/foo/bar',
      }),
    ];

    reketConfig.addRequestTypes(requestTypes);

    expect(addRequestTypeSpy).toHaveBeenCalledTimes(requestTypes.length);
    expect(reketConfig.requestTypes.size).toBe(requestTypes.length);
    expect(reketConfig.getRequestType('bar')).not.toBe(undefined);
  });
});

describe('urlPrefix configuration', () => {
  test('it should set the urlPrefix', () => {
    const reketConfig = new ReketConfig();
    const urlPrefix = '/kel/klet';

    reketConfig.setUrlPrefix(urlPrefix);

    expect(reketConfig.urlPrefix).toBe(urlPrefix);
  });
});

describe('client configuration', () => {
  test('it should set the client', () => {
    const reketConfig = new ReketConfig();

    reketConfig.setClient(new MockReketClient());

    expect(reketConfig.client).not.toBe(undefined);
    expect(reketConfig.client instanceof ReketClient).toBe(true);
  });

  test('it should throw an error if client param is not an instance of ReketClient', () => {
    const reketConfig = new ReketConfig();

    expect(() => {
      reketConfig.setClient({});
    }).toThrow(Error);
  });
});
