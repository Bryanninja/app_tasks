import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
// 1. IMPORTAR O NOVO PLUGIN
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

// O 'defineConfig' e 'globalIgnores' não são exportações
// padrões do 'eslint/config', então usamos o array direto
export default [
  // Configuração de "ignores" globais
  {
    ignores: ['dist/'],
  },

  // Configuração principal para seus arquivos JS/JSX
  {
    files: ['**/*.{js,jsx}'],

    // Suas opções de linguagem (estavam corretas)
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    // 2. REGISTRAR TODOS OS PLUGINS
    // É aqui que você "ativa" os plugins que importou
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort, // <-- NOVO PLUGIN AQUI
    },

    // 3. ADICIONAR AS REGRAS
    rules: {
      // Regras do 'js.configs.recommended'
      ...js.configs.recommended.rules,

      // Regras do 'reactHooks.configs.recommended'
      ...reactHooks.configs.recommended.rules,

      // Regras do 'reactRefresh' (a config 'vite' não existe)
      'react-refresh/only-export-components': 'warn',

      // Sua regra customizada (mantida)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // REGRAS NOVAS DO SIMPLE-IMPORT-SORT
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
];
