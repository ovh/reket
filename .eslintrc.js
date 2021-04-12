module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['jest', 'prettier'],
  extends: ['airbnb-base', 'prettier', 'plugin:markdown/recommended'],
  env: {
    browser: true,
    'jest/globals': true,
  },
  globals: {
    fixture: false,
    test: false,
  },
  rules: {
    'no-bitwise': ['error', { allow: ['~'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 0,
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.md'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
};
