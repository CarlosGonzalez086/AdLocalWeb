import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist/**', '.astro/**', '.vercel/**', 'node_modules/**']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'sweetalert2',
              message: 'Usa src/utils/sweetalert para mantener el tema y comportamiento AdLocal.',
            },
            {
              name: '@mui/material',
              importNames: ['Box', 'Stack', 'Grid', 'Card', 'Paper', 'Typography'],
              message:
                'Prohibido por Sistema de Diseño AdLocal: Use HTML semántico, Bootstrap grid (container, row, col-*) y clases AdLocal.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/utils/sweetalert.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
]);
