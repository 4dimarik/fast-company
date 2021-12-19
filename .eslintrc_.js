module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'import'],
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['any'],
        checkChildContextTypes: false,
        checkContextTypes: false,
      },
    ],
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    indent: 'off',
    // 'react/jsx-first-prop-new-line': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'crlf',
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
};
