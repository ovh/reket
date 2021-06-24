import { ReketHook } from '../src/hook';

describe('set method', () => {
  test('it should define onSuccess function', () => {
    const reketHook = new ReketHook();

    reketHook.set(() => {});

    expect(reketHook.onSuccess).not.toBe(undefined);
    expect(typeof reketHook.onSuccess === 'function').toBe(true);
    expect(reketHook.onError).toBe(undefined);
  });

  test('it should define onError function', () => {
    const reketHook = new ReketHook();

    reketHook.set(undefined, () => {});

    expect(reketHook.onSuccess).toBe(undefined);
    expect(reketHook.onError).not.toBe(undefined);
    expect(typeof reketHook.onError === 'function').toBe(true);
  });

  test('it should define onSuccess and onError functions', () => {
    const reketHook = new ReketHook();

    reketHook.set(
      () => {},
      () => {},
    );

    expect(reketHook.onSuccess).not.toBe(undefined);
    expect(typeof reketHook.onSuccess === 'function').toBe(true);
    expect(reketHook.onError).not.toBe(undefined);
    expect(typeof reketHook.onError === 'function').toBe(true);
  });

  test('it should throw an error if onSuccess if not a function', () => {
    const reketHook = new ReketHook();

    expect(() => {
      reketHook.set('not a function', () => {});
    }).toThrow(Error);
  });

  test('it should throw an error if onError if not a function', () => {
    const reketHook = new ReketHook();

    expect(() => {
      reketHook.set(() => {}, 'not a function');
    }).toThrow(Error);
  });
});
