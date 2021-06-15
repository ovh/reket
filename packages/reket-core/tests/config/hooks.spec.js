import { ReketConfigHooks } from '../../src/config/hooks';
import { ReketHook } from '../../src/hook';

describe('ReketConfigHooks implementation', () => {
  test('it should instanciate a ReketConfigHooks instance', () => {
    const hooksConfig = new ReketConfigHooks();

    expect(hooksConfig.response).not.toBe(undefined);
    expect(hooksConfig.response instanceof ReketHook).toBe(true);
  });
});
