import { ReketConfigClient } from '../../src/config/client';
import { ReketConfigItem } from '../../src/config/item';

import { MockReketClient } from '../mocks';

describe('ReketConfigClient implementation', () => {
  test('it should instanciate a ReketConfigClient instance', () => {
    const clientConfig = new ReketConfigClient();

    // check if clientConfig is well inherited
    expect(clientConfig instanceof ReketConfigItem).toBe(true);
    expect(clientConfig.value).toBe(undefined);
  });

  test('it should set correctly the configuration value', () => {
    const clientConfig = new ReketConfigClient();
    clientConfig.set(new MockReketClient());

    expect(clientConfig.value).not.toBe(undefined);
  });

  test('it should throw an error when setted attribute is not ReketClient', () => {
    const clientConfig = new ReketConfigClient();

    expect(() => {
      clientConfig.set({});
    }).toThrow(Error);
  });
});
