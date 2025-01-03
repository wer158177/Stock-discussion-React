import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier
    },
    rules: {
      "prettier/prettier": "error"
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended
];