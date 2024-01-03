module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "react-refresh"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "max-len": "off",
    "no-param-reassign": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/function-component-definition": "off",
    "react/react-in-jsx-scope": "off",
    "import/extensions": "off",
    "react/prop-types": "off",
    "linebreak-style": "off",
    "react/state-in-constructor": "off",
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", "only-multiline"],
    "react/jsx-wrap-multilines": ["error", { declaration: "parens-new-line" }],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_d", "_dh", "_h", "_id", "_m", "_n", "_t", "_text"],
      },
    ],
    "object-curly-newline": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/alt-text": "off",
    "no-unused-vars": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/no-array-index-key": "off",
    "react/jsx-props-no-spreading": "off",
    "no-confusing-arrow": ["error", { allowParens: true }],
    "arrow-body-style": ["error", "always"],
    quotes: ["error", "double"],
    "no-shadow": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "operator-linebreak": [
      "error",
      "after",
      {
        overrides: {
          ":": "before",
          "?": "before",
        },
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to", "hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],
    "react/require-default-props": "off",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
