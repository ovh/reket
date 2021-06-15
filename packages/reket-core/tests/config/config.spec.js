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

// import { ReketConfig } from '../../src/config/config';
// import { ReketRequestType } from '../../src/request/type';
// import { ReketClient } from '../../src/client';

// import { MockReketClient } from '../mocks';

// describe('ReketConfig instanciation', () => {
//   const configOptions = {
//     client: new MockReketClient(),
//     requestTypes: [
//       {
//         type: 'foo',
//         urlPrefix: '/foo',
//       },
//       {
//         type: 'pey',
//         urlPrefix: '/pey',
//       },
//     ],
//   };

//   test('it should instanciate ReketConfig without configuration', () => {
//     const reketConfig = new ReketConfig();

//     expect(reketConfig instanceof ReketConfig).toBe(true);
//     expect(reketConfig.client).toBe(undefined);
//   });

//   test('it should instanciate ReketConfig with configuration', () => {
//     const setClientSpy = jest.spyOn(ReketConfig.prototype, 'setClient');
//     const addRequestTypesSpy = jest.spyOn(
//       ReketConfig.prototype,
//       'addRequestTypes',
//     );

//     const reketConfig = new ReketConfig(configOptions);

//     expect(reketConfig instanceof ReketConfig).toBe(true);
//     expect(setClientSpy).toHaveBeenCalledWith(configOptions.client);
//     expect(addRequestTypesSpy).toHaveBeenCalledWith(configOptions.requestTypes);
//     expect(reketConfig.client).not.toBe(undefined);
//   });
// });

// describe('ReketConfig.setConfig method', () => {
//   test('it should set requestTypes configuration', () => {
//     const addRequestTypesSpy = jest.spyOn(
//       ReketConfig.prototype,
//       'addRequestTypes',
//     );
//     const reketConfig = new ReketConfig();
//     const requestTypes = [
//       {
//         type: 'foo',
//         urlPrefix: '/foo',
//       },
//     ];

//     reketConfig.setConfig('requestTypes', requestTypes);

//     expect(reketConfig.requestTypes.size).toBe(1);
//     expect(addRequestTypesSpy).toHaveBeenCalledWith(requestTypes);
//   });

//   test('it should set client configuration', () => {
//     const setClientSpy = jest.spyOn(ReketConfig.prototype, 'setClient');
//     const reketConfig = new ReketConfig();
//     const reketClient = new MockReketClient();

//     reketConfig.setConfig('client', reketClient);

//     expect(reketConfig.client).not.toBe(undefined);
//     expect(setClientSpy).toHaveBeenCalledWith(reketClient);
//   });

//   test('it should set urlPrefix configuration', () => {
//     const reketConfig = new ReketConfig();

//     reketConfig.setConfig('urlPrefix', '/kel/klet');

//     expect(reketConfig.urlPrefix).not.toBe('');
//   });
// });

// describe('requestTypes configuration', () => {
//   test('it should add requet types using addRequestType method', () => {
//     const reketConfig = new ReketConfig();

//     reketConfig.addRequestType({
//       type: 'foo',
//       urlPrefix: '/foo',
//     });
//     reketConfig.addRequestType(
//       new ReketRequestType({
//         type: 'fooBar',
//         urlPrefix: '/foo/bar',
//       }),
//     );

//     expect(reketConfig.requestTypes.size).toBe(2);
//     expect(reketConfig.getRequestType('fooBar')).not.toBe(undefined);
//   });

//   test('it should add request types using addRequestTypes method', () => {
//     const reketConfig = new ReketConfig();
//     const addRequestTypeSpy = jest.spyOn(
//       ReketConfig.prototype,
//       'addRequestType',
//     );
//     const requestTypes = [
//       {
//         type: 'foo',
//         urlPrefix: '/foo',
//       },
//       {
//         type: 'bar',
//         urlPrefix: '/bar',
//       },
//       new ReketRequestType({
//         type: 'fooBar',
//         urlPrefix: '/foo/bar',
//       }),
//     ];

//     reketConfig.addRequestTypes(requestTypes);

//     expect(addRequestTypeSpy).toHaveBeenCalledTimes(requestTypes.length);
//     expect(reketConfig.requestTypes.size).toBe(requestTypes.length);
//     expect(reketConfig.getRequestType('bar')).not.toBe(undefined);
//   });
// });

// describe('urlPrefix configuration', () => {
//   test('it should set the urlPrefix', () => {
//     const reketConfig = new ReketConfig();
//     const urlPrefix = '/kel/klet';

//     reketConfig.setUrlPrefix(urlPrefix);

//     expect(reketConfig.urlPrefix).toBe(urlPrefix);
//   });
// });

// describe('client configuration', () => {
//   test('it should set the client', () => {
//     const reketConfig = new ReketConfig();

//     reketConfig.setClient(new MockReketClient());

//     expect(reketConfig.client).not.toBe(undefined);
//     expect(reketConfig.client instanceof ReketClient).toBe(true);
//   });

//   test('it should throw an error if client param is not an instance of ReketClient', () => {
//     const reketConfig = new ReketConfig();

//     expect(() => {
//       reketConfig.setClient({});
//     }).toThrow(Error);
//   });
// });
