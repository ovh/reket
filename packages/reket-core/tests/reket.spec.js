import { Reket } from '../src/reket';
import { ReketConfig } from '../src/config/config';

import { MockReketClient } from './mocks';

describe('Reket instanciation', () => {
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

  test('it should instanciate Reket without configuration', () => {
    const reketInstance = new Reket();
    expect(reketInstance instanceof Reket).toBe(true);
    expect(reketInstance.ssoAuth).toBe(undefined);
    expect(reketInstance.client).toBe(undefined);
    expect(reketInstance.config.isSsoAuthEnabled()).toBe(false);
  });

  test('it should instanciate Reket with configuration as an object', () => {
    const setConfigSpy = jest.spyOn(Reket.prototype, 'setConfig');
    const reketInstance = new Reket(configOptions);

    expect(reketInstance instanceof Reket).toBe(true);
    expect(setConfigSpy).toHaveBeenCalled();
    expect(reketInstance.ssoAuth).not.toBe(undefined);
    expect(reketInstance.client).not.toBe(undefined);
    expect(reketInstance.config.isSsoAuthEnabled()).toBe(true);
    expect(reketInstance.config instanceof ReketConfig).toBe(true);

    setConfigSpy.mockRestore();
  });

  test('it shoould instanciate Reket with configuration as a ReketConfig instance', () => {
    const setConfigSpy = jest.spyOn(Reket.prototype, 'setConfig');
    const reketConfigInstance = new ReketConfig(configOptions);
    const reketInstance = new Reket(reketConfigInstance);

    expect(reketInstance instanceof Reket).toBe(true);
    expect(setConfigSpy).toHaveBeenCalled();
    expect(reketInstance.ssoAuth).not.toBe(undefined);
    expect(reketInstance.client).not.toBe(undefined);
    expect(reketInstance.config.isSsoAuthEnabled()).toBe(true);
    expect(reketInstance.config instanceof ReketConfig).toBe(true);

    setConfigSpy.mockRestore();
  });

  test('it should configure a Reket instance after instanciation', () => {
    const reketInstance = new Reket();
    reketInstance.setConfig(configOptions);
    reketInstance.setConfig('urlPrefix', '/foo/bar');

    expect(reketInstance instanceof Reket).toBe(true);
    expect(reketInstance.ssoAuth).not.toBe(undefined);
    expect(reketInstance.client).not.toBe(undefined);
    expect(reketInstance.config.isSsoAuthEnabled()).toBe(true);
    expect(reketInstance.config instanceof ReketConfig).toBe(true);
    expect(reketInstance.config.urlPrefix).toBe('/foo/bar');
  });
});
