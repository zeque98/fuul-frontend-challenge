module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    // TODO: Should be handle by airbnb-typescript but didn't have enough time to investigate
    'import/extensions': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx', '.ts'] }],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: false,
        shorthandFirst: false,
        shorthandLast: true,
        ignoreCase: true,
        noSortAlphabetically: false,
      },
    ],
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
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
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'node_modules/',
    'vite-env.d.ts',
    'vite.config.ts',
  ],
};
