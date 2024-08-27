// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   // parser: '@typescript-eslint/parser',

//   extends: [
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended',
//     'airbnb',
//     'airbnb-typescript',
//     'airbnb/hooks',
//     'plugin:import/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   // parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
//   // settings: { react: { version: '18.2' } },
//   plugins: ['react-refresh', 'react', 'import' /* , 'prettier' */],
//   rules: {
//     'react/jsx-no-target-blank': 'off',
//     'react/prop-types': 'off',
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//   },
// };

const production = process.env.NODE_ENV === 'production';

const allowedToReassignParams = [
  'result', // reduce accumulator value
  'state', // react toolkit reducer
  'draft', // react toolkit query cache data update utils
];

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },

  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },

  plugins: ['@babel', 'react', 'import', 'react-hooks', 'jsx-a11y'],

  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],

  // settings: {
  //   'import/resolver': {
  //     node: {
  //       paths: ['src'],
  //       extensions: ['.js', '.jsx'],
  //     },
  //   },
  // },

  rules: {
    'arrow-parens': ['error', 'as-needed'],

    /**
     * ! Disabled since prettier has its own trailing comma rule
     * leading to auto fix with double comma
     */
    // 'comma-dangle': [
    //   'error',
    //   {
    //     arrays: 'always-multiline',
    //     objects: 'always-multiline',
    //     imports: 'always-multiline',
    //     exports: 'always-multiline',
    //     functions: 'always-multiline',
    //   },
    // ],
    'eol-last': ['error', 'always'],

    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/newline-after-import': [2, { count: 1 }],

    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '/**',
            group: 'internal',
          },
        ],
      },
    ],
    // indent: ['error', 2, { SwitchCase: 1 }],
    'import/prefer-default-export': 0,

    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],

    'newline-after-var': ['error', 'always'],
    'newline-before-return': ['error'],

    'no-console': production ? 'error' : 'warn',
    'no-continue': 'off',
    'no-debugger': production ? 'error' : 'warn',

    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: allowedToReassignParams,
      },
    ],

    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],

    'require-await': 'error',

    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['label'],
        depth: 3,
      },
    ],

    'react/jsx-uses-react': 'off', // #1
    'react/react-in-jsx-scope': 'off', // #1
    'react/jsx-indent': ['error', 2],
    // 'react/jsx-indent-props': ['error', 2],
    'react/jsx-props-no-spreading': [1, { custom: 'ignore' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-fragments': [2, 'element'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',

    // 'prettier/prettier': ['error'],
  },
};
