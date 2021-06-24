import { ReketConfigRequestTypes } from '../../src/config/request-types';

describe('add method', () => {
  test('it should add a request type with its value', () => {
    const requestTypesConfig = new ReketConfigRequestTypes();

    requestTypesConfig.add('myType', '/my/type');

    expect(requestTypesConfig.size).toBe(1);
    expect(requestTypesConfig.getUrlPrefix('myType')).toBe('/my/type');
    expect(requestTypesConfig.getDefaultUrlPrefix()).toBe('/my/type');
  });

  test('it should add mutiple request types with their values', () => {
    const requestTypesConfig = new ReketConfigRequestTypes();

    requestTypesConfig.add([
      {
        type: 'myFirstType',
        urlPrefix: '/my/first/type',
      },
      {
        type: 'mySecondType',
        urlPrefix: '/my/second/type',
      },
      {
        type: 'myThirdType',
        urlPrefix: '/my/third/type',
      },
    ]);

    expect(requestTypesConfig.size).toBe(3);
    expect(requestTypesConfig.getUrlPrefix('myThirdType')).toBe(
      '/my/third/type',
    );
    expect(requestTypesConfig.getDefaultUrlPrefix()).toBe('/my/first/type');
  });
});
