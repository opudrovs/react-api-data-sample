import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'dist', 'coverage', '*.min.js', '*.log', '*.tmp'],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
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
