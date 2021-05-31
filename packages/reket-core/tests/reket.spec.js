import { Reket } from '../src/reket';
import { ReketConfig } from '../src/config/config';

import { MockReketClient } from './mocks';

describe('Reket instanciation', () => {
  test('it should instanciate Reket without configuration', () => {
    const reketInstance = new Reket();

    expect(reketInstance instanceof Reket).toBe(true);
    expect(reketInstance.config instanceof ReketConfig).toBe(true);
    expect(reketInstance.client).toBe(undefined);
  });

  // test('it should instanciate Reket and configure a client', () => {
  //   const reketInstance = new Reket();
  //   reketInstance.client.set(new MockReketClient());

  //   expect(reketInstance.client.get()).not.toBe(undefined);
  // });

  // test('it should instanciate Reket and configure response hook', () => {
  //   const reketInstance = new Reket();
  //   reketInstance.hooks.response.set(() => {}, () => {});

  //   expect(reketInstance.hooks.response.onSuccess).not.toBe(undefined);
  //   expect(reketInstance.hooks.response.onError).not.toBe(undefined);
  // });

  // test('it should instanciate Reket and configure requestTypes', () => {
  //   const reketInstance = new Reket();
  //   reketInstance.requestTypes.add();

  //   expect(reketInstance.hooks.response.onSuccess).not.toBe(undefined);
  //   expect(reketInstance.hooks.response.onError).not.toBe(undefined);
  // });
});

describe('Reket response hook configuration', () => {
  test('it should launch a request and call response onSuccess hook', () => {
    const reketInstance = new Reket();
    reketInstance.config.client.set(new MockReketClient({ data: null }));
    reketInstance.config.hooks.response.set(() => {});

    const onResponseSuccessHookSpy = jest.spyOn(
      reketInstance.config.hooks.response,
      'onSuccess',
    );

    return reketInstance.get('/shi/foo/me').then(() => {
      expect(onResponseSuccessHookSpy).toHaveBeenCalled();
    });
  });

  test('it should launch a request and call response onError hook', () => {
    const reketInstance = new Reket();
    reketInstance.config.client.set(new MockReketClient(null, true));
    reketInstance.config.hooks.response.set(
      () => {},
      () => {},
    );

    const onResponseErrorHookSpy = jest.spyOn(
      reketInstance.config.hooks.response,
      'onError',
    );

    return reketInstance.get('/shi/foo/me').catch(() => {
      expect(onResponseErrorHookSpy).toHaveBeenCalled();
    });
  });
});

describe('Reket getRequestUrlPrefix method', () => {
  test('it should return global urlPrefix', () => {
    const reketInstance = new Reket();
    reketInstance.config.urlPrefix.set('/v1.0');

    expect(reketInstance.getRequestUrlPrefix({})).toBe('/v1.0');
  });

  test('it should return the request urlPrefix', () => {
    const reketInstance = new Reket();

    expect(
      reketInstance.getRequestUrlPrefix({
        urlPrefix: '/my/request/prefix',
      }),
    ).toBe('/my/request/prefix');
  });

  test('it should return the first requestTypes as default urlPrefix', () => {
    const reketInstance = new Reket();
    reketInstance.config.requestTypes.add('1.0', '/v1.0');
    reketInstance.config.requestTypes.add('2.0', '/v2.0');

    expect(reketInstance.getRequestUrlPrefix({})).toBe('/v1.0');
  });
});
