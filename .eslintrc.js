module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'arrow-parens': 0,
    'no-shadow': 0,
  },
};
