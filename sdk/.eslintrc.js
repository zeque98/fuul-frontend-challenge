const path = require('path');

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'airbnb-base', 'airbnb-typescript/base'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: [
      path.resolve(__dirname, 'tsconfig.json'),
      path.resolve(__dirname, 'tsconfig.test.json'),
    ],
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/no-deprecated': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['sibling', 'parent', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/extensions': 'error',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': ['error'],
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.js'],
      plugins: ['jest'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/dot-notation': 'off',
      },
    },
  ],

  ignorePatterns: [
    'babel.config.js',
    '**/.eslintrc.js',
    '**/jest.config.ts',
    '**/dist*/',
    'rollup.config.js',
  ],
};
