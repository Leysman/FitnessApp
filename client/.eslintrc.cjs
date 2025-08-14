// файл: .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021:  true,
    node:    true,
  },
  extends: [
    'eslint:recommended',          // базовые правила ESLint
    'plugin:react/recommended',    // React-специфичные проверки
    'plugin:react-hooks/recommended', // проверки хуков
    'prettier',                    // отключает конфликтующие с Prettier правила
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType:  'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier',
  ],
  rules: {
    // ошибки форматирования Prettier будут считаться ошибками ESLint
    'prettier/prettier': 'error',
  },
  settings: {
    // чтобы плагин React мог определять вашу версию React автоматически
    react: { version: 'detect' },
  },
};

