// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'eol-last': 'error',
      'no-multiple-empty-lines': 'error',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'no-dupe-class-members': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'array-bracket-spacing': ['error', 'never'],
      'array-callback-return': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      indent: [
        'error',
        2,
        {
          MemberExpression: 1,
          SwitchCase: 1,
          ignoredNodes: ['PropertyDefinition'],
        },
      ],
      'arrow-spacing': 'error',
      'block-spacing': 'error',
      'brace-style': 'error',
      camelcase: 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'dot-notation': 'error',
      eqeqeq: 'error',
      'func-call-spacing': ['error', 'never'],
      'func-style': ['error', 'expression'],
      'function-paren-newline': ['error', 'multiline-arguments'],
      'id-length': [
        'error',
        {
          properties: 'never',
          exceptions: ['a', 'b', 'i', 'j', 'k', 'n', 'm', 'v'],
        },
      ],
      'implicit-arrow-linebreak': ['error', 'beside'],
      'key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true,
          mode: 'strict',
        },
      ],
      'keyword-spacing': ['error', { before: true, after: true }],
      'max-len': [
        'error',
        {
          code: 150,
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
        },
      ],
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      'no-array-constructor': 'error',
      'no-case-declarations': 'error',
      'no-confusing-arrow': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-eval': 'error',
      'no-iterator': 'error',
      'no-loop-func': 'error',
      'no-mixed-operators': ['off', { allowSamePrecedence: true }],
      'no-multi-assign': 'error',
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-object': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': ['off', { props: false }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-prototype-builtins': 'warn',
      // 'no-restricted-properties': [
      //   'error',
      //   {
      //     object: 'Object',
      //     property: 'assign',
      //     message:
      //       'Используйте оператор расширения вместо Object.assign для поверхностного копирования объектов. Используйте синтаксис оставшихся свойств, чтобы получить новый объект с некоторыми опущенными свойствами.',
      //   },
      //   {
      //     object: 'Math',
      //     property: 'pow',
      //     message: 'Используйте оператор ** для возведения в степень.',
      //   },
      // ],
      'no-restricted-globals': [
        'error',
        {
          name: 'isNaN',
          message: 'Используйте Number.isNaN вместо глобального isNaN.',
        },
        {
          name: 'isFinite',
          message:
            'Используйте Number.isFinite вместо глобального isFinite. ',
        },
      ],
      'no-trailing-spaces': 'error',
      'no-underscore-dangle': ['error', { allowFunctionParams: true }],
      'no-unneeded-ternary': 'error',
      'no-useless-escape': 'error',
      'no-var': 'error',
      'no-whitespace-before-property': 'error',
      'nonblock-statement-body-position': ['error', 'beside'],
      'object-curly-spacing': ['error', 'always'],
      'object-shorthand': 'off',
      'one-var': ['error', 'never'],
      'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
      'padded-blocks': ['error', 'never'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': [
        'off',
        {
          array: false,
          object: false,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      quotes: ['error', 'single', { allowTemplateLiterals: false }],
      radix: 'error',
      semi: ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'spaced-comment': [
        'error',
        'always',
        { block: { exceptions: ['*'] } },
      ],
      'template-curly-spacing': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
