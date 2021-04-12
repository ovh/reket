import { ReketConfigSsoAuth } from '../../src/config/sso-auth';

import { MockReketClient } from '../mocks';
import { DEFAULT_SSO_AUTH_OPTIONS } from '../../src/config/constants';

/*= ===========================================
=            window.location mock            =
============================================ */

/**
 * Mock window.location to avoid Error: Not implemented: navigation (except hash changes).
 * See https://remarkablemark.org/blog/2018/11/17/mock-window-location/ for workaround.
 */
const { location } = window;

beforeAll(() => {
  delete window.location;
  window.location = { assign: jest.fn() };
});

afterAll(() => {
  window.location = location;
});

/*= ====  End of window.location mock  ====== */

describe('ReketConfigSsoAuth instanciation', () => {
  test('it should instanciate with default urls', () => {
    const setLoginUrlSpy = jest.spyOn(
      ReketConfigSsoAuth.prototype,
      'setLoginUrl',
    );
    const setLogoutUrlSpy = jest.spyOn(
      ReketConfigSsoAuth.prototype,
      'setLogoutUrl',
    );
    const setUserUrlSpy = jest.spyOn(
      ReketConfigSsoAuth.prototype,
      'setUserUrl',
    );
    const reketSsoAuth = new ReketConfigSsoAuth();

    expect(setLoginUrlSpy).toHaveBeenCalledWith(
      DEFAULT_SSO_AUTH_OPTIONS.loginUrl,
    );
    expect(reketSsoAuth.loginUrl).toBe(DEFAULT_SSO_AUTH_OPTIONS.loginUrl);
    expect(setLogoutUrlSpy).toHaveBeenCalledWith(
      DEFAULT_SSO_AUTH_OPTIONS.logoutUrl,
    );
    expect(reketSsoAuth.logoutUrl).toBe(DEFAULT_SSO_AUTH_OPTIONS.logoutUrl);
    expect(setUserUrlSpy).toHaveBeenCalledWith(
      DEFAULT_SSO_AUTH_OPTIONS.userUrl,
    );
    expect(reketSsoAuth.userUrl).toBe(DEFAULT_SSO_AUTH_OPTIONS.userUrl);
  });

  test('it should instanciate and create a login deferred', () => {
    const reketSsoAuth = new ReketConfigSsoAuth();

    expect(reketSsoAuth.loginDeferred).not.toBe(undefined);
  });

  test('it should not have an onLoginSuccessCallback setted', () => {
    const reketSsoAuth = new ReketConfigSsoAuth();

    expect(reketSsoAuth.onLoginSuccessCallback).toBe(undefined);
  });

  test('it should instanciate with custom options', () => {
    const urls = {
      loginUrl: 'https://login.url',
      logoutUrl: 'https://logout.url',
      userUrl: '/chi/foo/me',
    };
    const callbacks = {
      onLoginSuccess: (userInfos) => {
        if (userInfos.needUpdates) {
          // make a redirection or what you want
        }
      },
    };

    const reketSsoAuth = new ReketConfigSsoAuth(urls, callbacks);

    expect(reketSsoAuth.loginUrl).toBe(urls.loginUrl);
    expect(reketSsoAuth.logoutUrl).toBe(urls.logoutUrl);
    expect(reketSsoAuth.userUrl).toBe(urls.userUrl);
    expect(reketSsoAuth.onLoginSuccessCallback).toBe(callbacks.onLoginSuccess);
  });
});

describe('URLs configuration', () => {
  test('it should set login url', () => {
    const reketSsoAuth = new ReketConfigSsoAuth();
    const loginUrl = '/auth/login';
    reketSsoAuth.setLoginUrl(loginUrl);

    expect(reketSsoAuth.loginUrl).toBe(loginUrl);
  });

  test('it should set logout url', () => {
    const reketSsoAuth = new ReketConfigSsoAuth();
    const logoutUrl = '/auth/logout';
    reketSsoAuth.setLogoutUrl(logoutUrl);

    expect(reketSsoAuth.logoutUrl).toBe(logoutUrl);
  });

  test('it should set user url', () => {
    const reketSsoAuth = new ReketConfigSsoAuth();
    const userUrl = '/chi/fou/me';
    reketSsoAuth.setUserUrl(userUrl);

    expect(reketSsoAuth.userUrl).toBe(userUrl);
  });
});

describe('Callbacks configuration', () => {
  test('it should set onLoginSuccessCallback', () => {
    const onLoginSuccessCallback = (userInfos) => {
      if (userInfos.needUpdates) {
        // make a redirection or what you want
      }
    };
    const reketSsoAuth = new ReketConfigSsoAuth();
    reketSsoAuth.setOnLoginSuccessCallback(onLoginSuccessCallback);

    expect(reketSsoAuth.onLoginSuccessCallback).toBe(onLoginSuccessCallback);
  });

  test('it should throw an error in case of invalid callback', () => {
    const onLoginSuccessCallback = {};
    const reketSsoAuth = new ReketConfigSsoAuth();

    expect(() => {
      reketSsoAuth.setOnLoginSuccessCallback(onLoginSuccessCallback);
    }).toThrow(Error);
  });
});

describe('Login management', () => {
  test('it should consider a logged in user', () => {
    const reketSsoAuth = new ReketConfigSsoAuth();
    const reketClient = new MockReketClient({
      id: 666,
      name: 'The Beast',
    });

    return reketSsoAuth
      .login(reketClient)
      .then((userData) => {
        expect(userData.id).toBe(666);
        return reketSsoAuth.isLogged();
      })
      .then((isLogged) => expect(isLogged).toBe(true));
  });

  test('it should consider an non logged in user', () => {
    const reketSsoAuth = new ReketConfigSsoAuth();
    const reketClient = new MockReketClient({}, true);
    const redirectToLoginSpy = jest.spyOn(
      ReketConfigSsoAuth.prototype,
      'redirectToLogin',
    );

    // expect.assertions(1);
    return reketSsoAuth
      .login(reketClient)
      .then(() => {
        expect(redirectToLoginSpy).toHaveBeenCalled();
        return reketSsoAuth.isLogged();
      })
      .then((isLogged) => expect(isLogged).toBe(false));
  });
});
