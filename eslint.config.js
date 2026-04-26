const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const playwright = require('eslint-plugin-playwright');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  {
    files: ['**/expectedTextResults/**/*.ts'],
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // Browser globals (for pages under test)
        document: 'readonly',
        window: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      playwright,
      prettier,
    },
    rules: {
      // Prettier rules
      'prettier/prettier': 'error',

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // General ESLint rules
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-debugger': 'error',
      'no-duplicate-imports': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      'no-irregular-whitespace': [
        'error',
        {
          skipStrings: true,
          skipComments: true,
          skipRegExps: true,
          skipTemplates: true,
        },
      ],

      // Playwright specific rules
      'playwright/missing-playwright-await': 'error',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-nested-step': 'warn',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-useless-await': 'off',
      'playwright/prefer-web-first-assertions': 'off',
      'playwright/prefer-to-have-length': 'error',
      'playwright/prefer-to-be': 'error',
    },
  },
  {
    files: ['*.config.*', '*.setup.*'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['tests/**/*'],
    rules: {
      'no-console': 'off',
    },
  },
  prettierConfig,
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.min.js',
      'playwright-report/',
      'test-results/',
    ],
  },
];
