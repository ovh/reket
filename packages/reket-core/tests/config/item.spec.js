import { ReketConfigItem } from '../../src/config/item';

describe('ReketConfigItem implementation', () => {
  test('it should instanciate a ReketConfigItem instance', () => {
    const itemConfig = new ReketConfigItem();

    expect(itemConfig.value).toBe(undefined);
  });

  test('it should set a value to the config item', () => {
    const itemConfig = new ReketConfigItem();
    itemConfig.set('a value');

    expect(itemConfig.value).toBe('a value');
  });
});
