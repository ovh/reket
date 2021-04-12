export const AVAILABLE_CONFIG_NAMES = [
  'client',
  'requestTypes',
  'ssoAuth',
  'urlPrefix',
];

export const DEFAULT_SSO_AUTH_OPTIONS = {
  loginUrl: '/auth',
  logoutUrl: '/auth?action=disconnect',
  userUrl: '/engine/api/me',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json',
  },
};

export default {
  AVAILABLE_CONFIG_NAMES,
  DEFAULT_SSO_AUTH_OPTIONS,
};
