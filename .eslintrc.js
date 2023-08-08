module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['@typescript-eslint', 'unicorn'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    indent: ['error', 2],
    'react/function-component-definition': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/extensions': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/no-unresolved': 'off',
    'no-restricted-exports': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    '@typescript-eslint/no-empty-function': ['error', { 'allow': ['arrowFunctions'] }],
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
};
