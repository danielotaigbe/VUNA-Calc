import globals from "globals";

export default [
  {
    ignores: ["assets/js/bootstrap.min.js"],
  },
  {
    files: ["assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      "no-undef": "warn",
      "no-unused-vars": ["warn", { args: "none" }],
      "no-extra-semi": "warn",
      "no-irregular-whitespace": "error",
      "no-redeclare": "error",
      "no-constant-condition": "warn",
      "no-unreachable": "warn",
      "valid-typeof": "error",
      "no-cond-assign": "warn",
      "no-dupe-args": "error",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-empty": "warn",
      "no-extra-boolean-cast": "warn",
      "no-func-assign": "error",
      "no-inner-declarations": "warn",
      "no-obj-calls": "error",
      "no-sparse-arrays": "warn",
      "no-unexpected-multiline": "warn",
      "no-unsafe-finally": "warn",
      "no-unsafe-optional-chaining": "error",
      "use-isnan": "error",
    },
  },
];
