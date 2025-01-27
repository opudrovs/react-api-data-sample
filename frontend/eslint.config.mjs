import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: [
      'node_modules',
      '.next',
      'dist',
      'coverage',
      '*.min.js',
      '*.log',
      '*.tmp',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      prettier: prettier,
      import: pluginImport,
    },
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
      'eol-last': ['error', 'always'],
      'prettier/prettier': ['error'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js modules (fs, path)
            'external', // Installed packages (express, prisma)
            'internal', // Aliased modules (like "@/utils/")
            'parent', // ../ imports
            'sibling', // ./ imports
            'index', // ./index imports
            'object', // Destructuring
            'type', // Type imports
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];

export default eslintConfig;
