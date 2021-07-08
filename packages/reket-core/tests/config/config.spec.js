import { ReketConfig } from '../../src/config/config';
import { ReketConfigClient } from '../../src/config/client';
import { ReketConfigHooks } from '../../src/config/hooks';
import { ReketConfigItem } from '../../src/config/item';
import { ReketConfigRequestTypes } from '../../src/config/request-types';

describe('ReketConfig instanciation', () => {
  test('it should instanciate a ReketConfig instance', () => {
    const config = new ReketConfig();

    expect(config.client instanceof ReketConfigClient).toBe(true);
    expect(config.hooks instanceof ReketConfigHooks).toBe(true);
    expect(config.urlPrefix instanceof ReketConfigItem).toBe(true);
    expect(config.requestTypes instanceof ReketConfigRequestTypes).toBe(true);
  });
});
