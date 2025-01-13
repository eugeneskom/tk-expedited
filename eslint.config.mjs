// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";


// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021, // Adjust based on your project requirements
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enables JSX parsing
        },
      },
    },
    plugins: {
      react: pluginReact,
      reactHooks: pluginReactHooks,
      jsxA11y: pluginJsxA11y,
      import: pluginImport,
    },
    rules: {
      // JavaScript/TypeScript rules
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      // React specific rules
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off", // Disable if using React 17+ with the new JSX transform
      "react/prop-types": "off", // Disable prop-types checks if using TypeScript

      // React Hooks specific rules
      "react-hooks/rules-of-hooks": "error", // Checks rules of hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies

      // Accessibility rules
      ...pluginJsxA11y.configs.recommended.rules,

      // Import/export syntax rules
      "import/order": [
        "error",
        {
          "groups": [["builtin", "external", "internal"]],
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        },
      ],
      "import/no-unresolved": "error",
      "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    },
  },
];
