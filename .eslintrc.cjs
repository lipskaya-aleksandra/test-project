module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: [
    "react-refresh",
    "prettier",
    "react",
    "import",
    "react-hooks",
    "jsx-a11y",
  ],
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "eol-last": ["error", "always"],

    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
      },
    ],
    "import/newline-after-import": [2, { count: 1 }],

    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "/**",
            group: "internal",
          },
        ],
      },
    ],

    "import/prefer-default-export": 0,

    "linebreak-style": ["error", "unix"],
    "max-len": [
      "error",
      {
        code: 80,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],

    "newline-after-var": ["error", "always"],
    "newline-before-return": ["error"],

    "no-console": production ? "error" : "warn",
    "no-debugger": production ? "error" : "warn",

    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: allowedToReassignParams,
      },
    ],

    "require-await": "error",

    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelAttributes: ["label"],
        depth: 3,
      },
    ],

    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-indent": ["error", 2],
    "react/jsx-props-no-spreading": [1, { custom: "ignore" }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-fragments": [2, "element"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "prettier/prettier": ["error"],
  },
};
